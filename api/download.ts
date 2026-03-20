import type { VercelRequest, VercelResponse } from "@vercel/node";

import { getLatestDesktopReleaseCatalog } from "../lib/server/github-release";

const normalizeQueryValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0]?.toLowerCase() ?? "";
  }

  return value?.toLowerCase() ?? "";
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const platform = normalizeQueryValue(req.query.platform);
  const arch = normalizeQueryValue(req.query.arch);

  if (platform !== "windows" && platform !== "mac") {
    return res.status(400).json({
      error: "platform parametresi windows veya mac olmalıdır."
    });
  }

  const catalog = await getLatestDesktopReleaseCatalog();

  if (!catalog.available || !catalog.release) {
    return res.status(404).json({
      error: catalog.error ?? "İndirilebilir bir masaüstü sürümü bulunamadı."
    });
  }

  const selectedAsset =
    platform === "windows"
      ? catalog.assets.windows
      : arch === "x64"
        ? catalog.assets.macX64
        : catalog.assets.macArm64;

  if (!selectedAsset) {
    return res.status(404).json({
      error: "Seçilen platform için uygun kurulum paketi bulunamadı."
    });
  }

  res.setHeader("Cache-Control", "no-store");
  return res.redirect(307, selectedAsset.browserDownloadUrl);
}
