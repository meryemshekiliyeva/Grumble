import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">İstifadə Şərtləri</h1>
          <p className="text-lg text-gray-600">
            Son yenilənmə tarixi: {new Date().toLocaleDateString('az-AZ')}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Ümumi Müddəalar</h2>
            <p className="text-gray-700 mb-6">
              Bu İstifadə Şərtləri ("Şərtlər") Grumble platformasının ("Platform", "Xidmət", "biz", "bizim")
              istifadəsini tənzimləyir. Platformadan istifadə etməklə siz bu şərtləri qəbul etmiş olursunuz.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Platformanın Təsviri</h2>
            <p className="text-gray-700 mb-6">
              Grumble, istehlakçıların şirkətlər haqqında şikayət və rəylərini paylaşa biləcəkləri
              onlayn platformadır. Platform həmçinin şirkətlərə öz müştəriləri ilə əlaqə qurmaq
              imkanı təqdim edir.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. İstifadəçi Hesabları</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Hesab yaratmaq üçün doğru və tam məlumat təqdim etməlisiniz</li>
              <li>Hesabınızın təhlükəsizliyindən siz məsulsiniz</li>
              <li>Şifrənizi başqaları ilə paylaşmamalısınız</li>
              <li>Hesabınızda baş verən hər hansı fəaliyyətdən siz məsulsiniz</li>
              <li>Şübhəli fəaliyyət halında dərhal bizə məlumat verməlisiniz</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. İstifadə Qaydaları</h2>
            <p className="text-gray-700 mb-4">Platformadan istifadə edərkən aşağıdakıları etməməlisiniz:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Yalan və ya yanıltıcı məlumat paylaşmaq</li>
              <li>Başqalarının hüquqlarını pozacaq məzmun yerləşdirmək</li>
              <li>Spam və ya reklam məzmunu göndərmək</li>
              <li>Platformanın təhlükəsizliyini pozacaq hərəkətlər etmək</li>
              <li>Digər istifadəçiləri təhqir etmək və ya hədələmək</li>
              <li>Müəllif hüquqlarını pozan məzmun paylaşmaq</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Məzmun və Şikayətlər</h2>
            <p className="text-gray-700 mb-4">
              Platformada paylaşdığınız bütün məzmunun doğruluğundan siz məsulsiniz. Şikayətləriniz:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Faktlara əsaslanmalıdır</li>
              <li>Şəxsi təcrübənizə əsaslanmalıdır</li>
              <li>Konstruktiv və hörmətli olmalıdır</li>
              <li>Qanuni çərçivədə olmalıdır</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Məxfilik</h2>
            <p className="text-gray-700 mb-6">
              Şəxsi məlumatlarınızın qorunması bizim üçün vacibdir. Məxfilik Siyasətimiz
              məlumatlarınızın necə toplandığını, istifadə edildiyini və qorunduğunu izah edir.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Entelektual Mülkiyyət</h2>
            <p className="text-gray-700 mb-6">
              Platformanın bütün məzmunu, dizaynı və funksionallığı bizim entelektual mülkiyyətimizdir.
              İcazəsiz istifadə qadağandır.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Xidmətin Dayandırılması</h2>
            <p className="text-gray-700 mb-6">
              Bu şərtləri pozduğunuz halda hesabınızı xəbərdarlıq etmədən dayandıra bilərik.
              Həmçinin xidməti istənilən vaxt dəyişdirmək və ya dayandırmaq hüququmuzu saxlayırıq.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Məsuliyyətin Məhdudlaşdırılması</h2>
            <p className="text-gray-700 mb-6">
              Platform "olduğu kimi" təqdim edilir. Xidmətin fasilələrindən, məlumat itkisindən
              və ya digər zərərlərdən məsuliyyət daşımırıq.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Şərtlərin Dəyişdirilməsi</h2>
            <p className="text-gray-700 mb-6">
              Bu şərtləri istənilən vaxt dəyişdirmək hüququmuzu saxlayırıq. Dəyişikliklər
              platformada dərc edildikdən sonra qüvvəyə minir.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Mübahisələrin Həlli</h2>
            <p className="text-gray-700 mb-6">
              Bu şərtlərlə bağlı mübahisələr Azərbaycan Respublikasının qanunvericiliyinə
              uyğun olaraq həll edilir.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Əlaqə Məlumatları</h2>
            <p className="text-gray-700 mb-4">
              Bu şərtlərlə bağlı suallarınız varsa, bizimlə əlaqə saxlayın:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700"><strong>E-poçt:</strong> legal@grumble.az</p>
              <p className="text-gray-700"><strong>Telefon:</strong> +994 12 XXX XX XX</p>
              <p className="text-gray-700"><strong>Ünvan:</strong> Bakı şəhəri, Nəsimi rayonu</p>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Qeyd:</strong> Bu İstifadə Şərtləri Azərbaycan dilində yazılmışdır və
                Azərbaycan Respublikasının qanunvericiliyinə uyğundur. Tərcümə versiyaları
                arasında uyğunsuzluq olduğu halda, Azərbaycan dilindəki versiya üstünlük təşkil edir.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;