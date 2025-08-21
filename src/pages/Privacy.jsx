import React from 'react';

const Privacy = () => {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-8">
          Məxfilik Siyasəti
        </h1>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">1. Məlumatların Toplanması</h2>
          <p className="mb-4">
            Grumble platformasında qeydiyyatdan keçərkən aşağıdakı məlumatları toplayırıq:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Ad və soyad</li>
            <li>E-poçt ünvanı</li>
            <li>Telefon nömrəsi (ixtiyari)</li>
            <li>Şikayət məzmunu və əlaqəli məlumatlar</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">2. Məlumatların İstifadəsi</h2>
          <p className="mb-4">
            Topladığımız məlumatları aşağıdakı məqsədlər üçün istifadə edirik:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Şikayətlərinizi şirkətlərə çatdırmaq</li>
            <li>Hesabınızı idarə etmək</li>
            <li>Sizinlə əlaqə saxlamaq</li>
            <li>Platformanın təhlükəsizliyini təmin etmək</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">3. Məlumatların Paylaşılması</h2>
          <p className="mb-6">
            Şəxsi məlumatlarınızı üçüncü tərəflərlə paylaşmırıq. Yalnız şikayət etdiyiniz şirkətlə
            əlaqəli məlumatlar həmin şirkətə çatdırılır.
          </p>

          <h2 className="text-xl font-semibold mb-4">4. Məlumatların Təhlükəsizliyi</h2>
          <p className="mb-6">
            Məlumatlarınızın təhlükəsizliyini təmin etmək üçün müasir şifrələmə və təhlükəsizlik
            tədbirləri tətbiq edirik.
          </p>

          <h2 className="text-xl font-semibold mb-4">5. Əlaqə</h2>
          <p className="mb-4">
            Məxfilik siyasəti ilə bağlı suallarınız varsa, bizimlə əlaqə saxlaya bilərsiniz:
          </p>
          <p className="mb-2">E-poçt: info@grumble.az</p>
          <p className="mb-6">Telefon: +994 12 345 67 89</p>

          <p className="text-sm text-gray-600">
            Bu məxfilik siyasəti son dəfə 15 Avqust 2025 tarixində yenilənmişdir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;