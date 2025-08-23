# Grumble - Şikayət Platforması

Grumble, müştərilərin şirkətlərə qarşı şikayətlərini bildirə biləcəkləri və şirkətlərin bu şikayətləri idarə edə biləcəkləri bir platformadır.

## 🚀 Xüsusiyyətlər

- **İstifadəçi Qeydiyyatı və Girişi**: Müştərilər hesab yarada və giriş edə bilərlər
- **Şirkət Qeydiyyatı və Bank Dashboard**: Şirkətlər qeydiyyatdan keçə və şikayətləri idarə edə bilərlər
- **Şikayət Sistemi**: Müştərilər şikayətlərini bildirib izləyə bilərlər
- **Kateqoriya Sistemi**: Şikayətlər kateqoriyalara ayrılır
- **AI Chat Köməkçisi**: Müştərilərə kömək üçün AI köməkçisi

## 🏦 Bank Dashboard Sistemi

### Test Hesabları (Bank Girişi):
- **Kapital Bank**: `kapital@bank.az` / `Kapital123!`
- **Pasha Bank**: `pasha@bank.az` / `Pasha123!`
- **BirBank**: `bir@bank.az` / `BirBank123!`

### Şirkət Qeydiyyatı:
1. `/register` səhifəsində "Şirkət Qeydiyyatı" tabını seçin
2. Şirkət məlumatlarını doldurun
3. Qeydiyyatdan sonra giriş şifrəsi: `Company123!`
4. `/login` səhifəsində "Şirkət Girişi" tabı ilə daxil olun

### Bank Dashboard Xüsusiyyətləri:
- **Şikayət İdarəetməsi**: Bütün şikayətləri görün və statusunu dəyişin
- **Statistikalar**: Ümumi, gözləyən, həll edilmiş şikayətlər
- **Cavab Nisbəti**: Şirkətin performans göstəricisi
- **Real-time Yenilənmə**: Statuslar dərhal yenilənir
- **Rəy Cavablandırma**: Müştəri rəylərinə cavab verin
- **Avtomatik Status Dəyişikliyi**: Cavab verildikdə status avtomatik "cavablandırıldı"ya çevrilir

### Şirkət Profil Sistemi:
- **Şirkət Profil Dropdown**: Giriş edən şirkətlər üçün xüsusi profil menyusu
- **Şirkət Profil Səhifəsi**: Tam funksional şirkət profil idarəetməsi
- **Rəy İdarəetməsi**: Gözləyən, cavablandırılmış rəyləri görün və idarə edin
- **Statistika Dashboard**: Rəy statistikaları və performans göstəriciləri
- **Müştəri Rəylərinə Cavab**: Rəylərə cavab verib müştəri məmnuniyyətini artırın

## 🛠️ Quraşdırma

```bash
# Layihəni klonlayın
git clone <repository-url>

# Asılılıqları quraşdırın
npm install

# Development serveri başladın
npm run dev

# Production build
npm run build
```

## 📱 İstifadə

1. **Ana səhifə**: http://localhost:5177/
2. **İstifadəçi qeydiyyatı**: http://localhost:5177/register
3. **Şirkət qeydiyyatı**: http://localhost:5177/register?type=company
4. **Giriş**: http://localhost:5177/login
5. **Bank Dashboard**: http://localhost:5177/bank-dashboard (giriş sonrası)
6. **Şirkət Profili**: http://localhost:5177/company-profile (şirkət girişi sonrası)
7. **Şirkət Səhifəsi**: http://localhost:5177/companies/kapital-bank (rəy və cavab sistemi)

## 🔧 Texnologiyalar

- **Frontend**: React 18, Vite, Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Context API
- **Icons**: Heroicons, Font Awesome
- **Styling**: Tailwind CSS

## 📝 Qeydlər

- Bu demo versiyasıdır və məlumatlar localStorage-də saxlanılır
- Production üçün backend API inteqrasiyası lazımdır
- Bütün şifrələr demo məqsədləri üçündür

## 🆕 Yeni Xüsusiyyətlər

### Şirkət Giriş Sistemi:
- Şirkət kimi giriş edəndə header-də "Profilim" yerinə şirkət profili görünür
- Şirkət dropdown menyusunda xüsusi seçimlər: Şirkət Profili, Şikayətlər, Rəylər, Statistikalar
- "Yeni Şikayət" düyməsi yerinə "Dashboard" düyməsi görünür

### Rəy və Cavab Sistemi:
- Müştərilər şirkət səhifələrində rəy yaza bilərlər
- Şirkətlər bank dashboard-dan rəylərə cavab verə bilərlər
- Cavab verildikdə rəyin statusu avtomatik "gözləyir"dən "cavablandırıldı"ya çevrilir
- Şirkət profil səhifəsində rəyləri kateqoriyalara ayıraraq görə bilərlər

### Avtomatik Status İdarəetməsi:
- Şirkət rəyə cavab verdikdə həm dashboard-da həm də şirkət səhifəsində status yenilənir
- Real-time statistika hesablamaları
- Müştəri məmnuniyyəti izləmə sistemi

## 🔧 Həll Edilmiş Problemlər

### Logout/Login Problemləri:
- **Problem**: Şirkət hesabından çıxış edəndə ikinci dəfə giriş zamanı fərqli səhifə açılırdı
- **Həll**: AuthContext-də düzgün logout idarəetməsi əlavə edildi
- **Nəticə**: İndi şirkət logout/login dövrü düzgün işləyir

### Authentication State Problemləri:
- **Problem**: Logout sonrası authentication state düzgün təmizlənmirdi
- **Həll**: Bütün localStorage məlumatları və state düzgün təmizlənir
- **Nəticə**: Logout sonrası təmiz giriş təcrübəsi

### Navigation Problemləri:
- **Problem**: Şirkət girişi sonrası yanlış səhifəyə yönləndirmə
- **Həll**: Login.jsx-də düzgün yönləndirmə məntiqı əlavə edildi
- **Nəticə**: Şirkətlər avtomatik bank dashboard-a yönləndirilir

### Loading State Problemləri:
- **Problem**: Authentication yüklənməsi zamanı vaxtından əvvəl yönləndirmə
- **Həll**: Loading state-lər düzgün idarə edilir
- **Nəticə**: Səhifələr düzgün yüklənir və yönləndirmə edilir
