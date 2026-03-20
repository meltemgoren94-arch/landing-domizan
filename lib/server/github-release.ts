const DEFAULT_RELEASE_OWNER = process.env.GITHUB_RELEASE_OWNER ?? "okanacer332";
const DEFAULT_RELEASE_REPO = process.env.GITHUB_RELEASE_REPO ?? "domi-ass";
const GITHUB_API_BASE_URL = "https://api.github.com";

type SupportedPlatform = "windows" | "mac";
type MacArchitecture = "arm64" | "x64";

interface GitHubReleaseAsset {
  name: string;
  size: number;
  updated_at: string;
  browser_download_url: string;
  content_type: string;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string | null;
  html_url: string;
  published_at: string;
  prerelease: boolean;
  draft: boolean;
  assets: GitHubReleaseAsset[];
}

export interface DesktopDownloadAsset {
  name: string;
  size: number;
  updatedAt: string;
  fileType: string;
  browserDownloadUrl: string;
  platform: SupportedPlatform;
  architecture: MacArchitecture | "x64" | null;
}

export interface DesktopReleaseCatalog {
  available: boolean;
  owner: string;
  repo: string;
  error: string | null;
  release: null | {
    tagName: string;
    version: string;
    name: string;
    publishedAt: string;
    prerelease: boolean;
    htmlUrl: string;
    notes: string[];
  };
  assets: {
    windows: DesktopDownloadAsset | null;
    macArm64: DesktopDownloadAsset | null;
    macX64: DesktopDownloadAsset | null;
  };
}

const buildGitHubHeaders = () => {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "domizan-landing"
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
};

const normalizeVersion = (tagName: string) => tagName.replace(/^v/i, "");

const isFileType = (assetName: string, extension: string) =>
  assetName.toLowerCase().endsWith(extension.toLowerCase());

const parseReleaseNotes = (
  body: string | null,
  assets: DesktopReleaseCatalog["assets"]
) => {
  const lines =
    body
      ?.split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean) ?? [];

  const bulletNotes = lines
    .filter((line) => /^[-*•]\s+/.test(line))
    .map((line) => line.replace(/^[-*•]\s+/, ""))
    .slice(0, 6);

  if (bulletNotes.length > 0) {
    return bulletNotes;
  }

  const plainNotes = lines
    .filter((line) => !line.startsWith("#"))
    .slice(0, 4);

  if (plainNotes.length > 0) {
    return plainNotes;
  }

  const fallbackNotes: string[] = [];

  if (assets.windows) {
    fallbackNotes.push("Windows 64-bit kurulum paketi hazır.");
  }

  if (assets.macArm64) {
    fallbackNotes.push("macOS Apple Silicon kurulumu hazır.");
  }

  if (assets.macX64) {
    fallbackNotes.push("macOS Intel kurulumu hazır.");
  }

  fallbackNotes.push("Kurulum paketi yayınlandığında indirme akışı doğrudan bu sayfadan başlar.");

  return fallbackNotes.slice(0, 4);
};

const selectPreferredAsset = (
  assets: GitHubReleaseAsset[],
  matcher: (asset: GitHubReleaseAsset) => boolean
) => {
  const matchingAssets = assets.filter(matcher);

  if (matchingAssets.length === 0) {
    return null;
  }

  const dmgAsset = matchingAssets.find((asset) => isFileType(asset.name, ".dmg"));
  if (dmgAsset) {
    return dmgAsset;
  }

  const zipAsset = matchingAssets.find((asset) => isFileType(asset.name, ".zip"));
  if (zipAsset) {
    return zipAsset;
  }

  return matchingAssets[0];
};

const toDesktopAsset = (
  asset: GitHubReleaseAsset,
  platform: SupportedPlatform,
  architecture: DesktopDownloadAsset["architecture"]
): DesktopDownloadAsset => ({
  name: asset.name,
  size: asset.size,
  updatedAt: asset.updated_at,
  fileType: asset.name.split(".").pop()?.toLowerCase() ?? "bin",
  browserDownloadUrl: asset.browser_download_url,
  platform,
  architecture
});

const buildEmptyCatalog = (error: string | null): DesktopReleaseCatalog => ({
  available: false,
  owner: DEFAULT_RELEASE_OWNER,
  repo: DEFAULT_RELEASE_REPO,
  error,
  release: null,
  assets: {
    windows: null,
    macArm64: null,
    macX64: null
  }
});

const fetchLatestRelease = async () => {
  const response = await fetch(
    `${GITHUB_API_BASE_URL}/repos/${DEFAULT_RELEASE_OWNER}/${DEFAULT_RELEASE_REPO}/releases?per_page=10`,
    {
      headers: buildGitHubHeaders()
    }
  );

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `GitHub release bilgisi alınamadı (${response.status}). ${body || "Bilinmeyen hata."}`
    );
  }

  const releases = (await response.json()) as GitHubRelease[];

  return releases
    .filter((release) => !release.draft)
    .sort((left, right) => {
      const leftDate = new Date(left.published_at).getTime();
      const rightDate = new Date(right.published_at).getTime();
      return rightDate - leftDate;
    });
};

export const getLatestDesktopReleaseCatalog = async (): Promise<DesktopReleaseCatalog> => {
  try {
    const releases = await fetchLatestRelease();
    const latestRelease = releases[0];

    if (!latestRelease) {
      return buildEmptyCatalog(
        "Henüz yayınlanmış bir Domizan masaüstü sürümü bulunmuyor. İlk GitHub release yayınlandığında indirme burada aktif olacak."
      );
    }

    const windowsAsset = selectPreferredAsset(
      latestRelease.assets,
      (asset) => asset.name.toLowerCase().includes("-win-") && isFileType(asset.name, ".exe")
    );

    const macArm64Asset = selectPreferredAsset(
      latestRelease.assets,
      (asset) =>
        asset.name.toLowerCase().includes("-mac-arm64.") &&
        (isFileType(asset.name, ".dmg") || isFileType(asset.name, ".zip"))
    );

    const macX64Asset = selectPreferredAsset(
      latestRelease.assets,
      (asset) =>
        asset.name.toLowerCase().includes("-mac-x64.") &&
        (isFileType(asset.name, ".dmg") || isFileType(asset.name, ".zip"))
    );

    const assets: DesktopReleaseCatalog["assets"] = {
      windows: windowsAsset ? toDesktopAsset(windowsAsset, "windows", "x64") : null,
      macArm64: macArm64Asset ? toDesktopAsset(macArm64Asset, "mac", "arm64") : null,
      macX64: macX64Asset ? toDesktopAsset(macX64Asset, "mac", "x64") : null
    };

    return {
      available: Boolean(assets.windows || assets.macArm64 || assets.macX64),
      owner: DEFAULT_RELEASE_OWNER,
      repo: DEFAULT_RELEASE_REPO,
      error:
        assets.windows || assets.macArm64 || assets.macX64
          ? null
          : "Yayın bulundu ancak Windows veya macOS kurulum paketi bulunamadı.",
      release: {
        tagName: latestRelease.tag_name,
        version: normalizeVersion(latestRelease.tag_name),
        name: latestRelease.name || normalizeVersion(latestRelease.tag_name),
        publishedAt: latestRelease.published_at,
        prerelease: latestRelease.prerelease,
        htmlUrl: latestRelease.html_url,
        notes: parseReleaseNotes(latestRelease.body, assets)
      },
      assets
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Release bilgisi alınırken beklenmeyen bir hata oluştu.";

    return buildEmptyCatalog(message);
  }
};
