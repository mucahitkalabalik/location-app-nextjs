# 🗺️ Konum Yönetim ve Rota Oluşturma Uygulaması

🔗 [Canlı Demo](https://location-next-app.netlify.app/)

Bu proje, kullanıcıların harita üzerinden konum seçip kaydedebileceği, bu konumları düzenleyip listeleyebileceği ve konumlar arasında rota oluşturabileceği bir web uygulamasıdır. Uygulama **Next.js**, **Chakra UI**, **OpenStreetMap (OSM)** ve **Redux** kullanılarak geliştirilmiştir. Backend ihtiyacı olmadan, tüm veriler tarayıcıda `localStorage` kullanılarak saklanmaktadır.

## 🚀 Özellikler

### 📍 Konum Ekleme Sayfası
- OSM tabanlı harita üzerinden konum seçimi
- Konum adı girişi
- Marker renk seçimi
- Enlem, boylam ve diğer bilgilerin localStorage'da tutulması

### 📋 Konumları Listeleme Sayfası
- Kaydedilmiş konumların listelenmesi
- Marker rengiyle uyumlu ikonlar
- Marker'a tıklandığında enlem ve boylam bilgisinin gösterimi
- Konum düzenleme sayfasına yönlendiren buton
- Listenin üst kısmında "Rota Göster" butonu

### ✏️ Konum Düzenleme Sayfası
- Kaydedilen konum adı, marker rengi ve koordinat bilgilerinin güncellenmesi

### 🧭 Rota Oluşturma Sayfası
- Kaydedilmiş konumların harita üzerinde marker ile gösterimi
- Marker'a tıklandığında konum adı ve koordinat gösterimi
- Kullanıcının mevcut konumuna en yakın noktadan başlayarak rota oluşturulması

## 🛠️ Kullanılan Teknolojiler

- **Next.js** – Uygulamanın temel framework'ü
- **Chakra UI** – UI bileşenleri ve tasarım sistemi
- **OpenStreetMap (OSM)** – Harita altyapısı
- **Redux** – Global state yönetimi
- **localStorage** – Verilerin tarayıcıda saklanması

## 📦 Kurulum

```bash
git clone https://github.com/kullanici-adi/proje-adi.git
cd proje-adi
npm install
npm run dev
