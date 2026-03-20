# Domizan Masaüstü İndirme ve Update Akışı

Bu doküman, `domizan.com/#/download` sayfasından Windows ve macOS kurulum paketlerinin nasıl servis edildiğini ve gerçek cihazlarda update testinin nasıl yapılacağını özetler.

## Mimari

- Landing sayfası kurulum paketlerini artık sabit linkten değil GitHub release verisinden alır.
- Vercel API katmanı şu endpoint'leri sağlar:
  - `/api/downloads`: En son yayınlanan release bilgisini ve uygun asset'leri döner.
  - `/api/download?platform=windows`
  - `/api/download?platform=mac&arch=arm64`
  - `/api/download?platform=mac&arch=x64`
- Release kaynağı varsayılan olarak `okanacer332/domi-ass` reposudur.
- API, yayınlanmış ilk release gelmeden önce kırılmaz; kullanıcıya kurulum paketinin henüz hazır olmadığı bilgisini gösterir.

## Vercel Ortam Değişkenleri

- `RESEND_API_KEY`
- `GITHUB_TOKEN` (önerilir, public repo olsa da rate limit için iyidir)
- `GITHUB_RELEASE_OWNER` (opsiyonel, varsayılan: `okanacer332`)
- `GITHUB_RELEASE_REPO` (opsiyonel, varsayılan: `domi-ass`)

## İlk Kurulum Testi

1. `domi-ass` reposunda yayınlanabilir kurulum paketlerini üret.
2. `v0.1.0` gibi bir tag ile gerçek GitHub Release yayınla.
3. Release içinde en az şu asset'ler olsun:
   - `Domizan-<version>-win-x64.exe`
   - `Domizan-<version>-mac-arm64.dmg`
   - `Domizan-<version>-mac-x64.dmg`
4. Landing deploy olduktan sonra `domizan.com/#/download` sayfasını aç.
5. Sağdaki kartta en son release sürümü görünmeli.
6. Windows veya macOS seçip formu doldur.
7. Form başarılı olunca sayfa uygun `/api/download` endpoint'ine gider ve GitHub asset'ine yönlendirir.
8. Başka bilgisayarda kurulum tamamlanır.

## Update Testi

1. Test bilgisayarında önce eski sürümü kur.
2. `domi-ass` reposunda sürümü artır:
   - örnek: `0.1.0` -> `0.1.1`
3. Yeni Windows ve macOS paketlerini üret.
4. `v0.1.1` GitHub Release yayınla.
5. Kurulu uygulamada `Güncellemeyi denetle` çalıştır.
6. Electron updater GitHub release akışından yeni sürümü bulmalı.
7. İndirme tamamlanınca uygulama `Kur ve yeniden başlat` davranışına geçmeli.

## Beklenen Davranışlar

- GitHub'da hiç release yoksa:
  - download sayfası kırılmaz
  - buton pasif kalır
  - kullanıcıya kurulum paketinin henüz yayınlanmadığı bilgisi gösterilir
- Release var ama belirli asset yoksa:
  - ilgili platform veya mimari "Hazır" görünmez
  - kullanıcı yanlış pakete gitmez
- macOS tarafında kullanıcı açıkça seçim yapar:
  - `Apple Silicon`
  - `Intel`

## Notlar

- Landing sayfası indirme öncesi lead bilgisini hâlâ Resend ile yollar.
- E-posta içine artık seçilen platform, mimari ve sürüm bilgisi de eklenir.
- Gerçek update testi için yalnızca repo public olması yetmez; mutlaka yayınlanmış GitHub Release gerekir.
