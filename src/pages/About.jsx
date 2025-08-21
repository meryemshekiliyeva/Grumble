import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Haqqımızda</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Grumble - Azərbaycanın ən böyük və etibarlı şikayət 
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Missiyamız</h2>
            <p className="text-gray-700 mb-6">
              Grumble, Azərbaycanda istehlakçı hüquqlarının qorunması və şirkətlərlə müştərilər arasında
              şəffaf əlaqənin qurulması məqsədilə yaradılmış platformadır. Biz istehlakçıların səsini
              eşitdirmək və onların problemlərinin həllinə kömək etmək üçün fəaliyyət göstəririk.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Məqsədimiz</h2>
            <p className="text-gray-700 mb-6">
              Platformamızın əsas məqsədi istehlakçıların şikayətlərini şirkətlərə çatdırmaq və
              problemlərin həllinə nail olmaqdir. Biz şirkətlərin müştəri xidmətlərini təkmilləşdirməsinə
              və istehlakçıların hüquqlarının daha yaxşı qorunmasına töhfə veririk.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Necə işləyirik</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Şikayət Bildirin</h3>
                <p className="text-sm text-gray-600">
                  Yaşadığınız problemi detaylı şəkildə bizə bildirin
                </p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Şirkətə Çatdırırıq</h3>
                <p className="text-sm text-gray-600">
                  Şikayətinizi müvafiq şirkətə çatdırırıq
                </p>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Həll Tapırıq</h3>
                <p className="text-sm text-gray-600">
                  Problemin həllinə nail olana qədər izləyirik
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Niyə Grumble?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Azərbaycanda ən böyük şikayət bazası</li>
              <li>Şirkətlərlə birbaşa əlaqə</li>
              <li>Şəffaf və açıq proseslər</li>
              <li>Pulsuz və asan istifadə</li>
              <li>Məxfilik və təhlükəsizlik</li>
              <li>24/7 dəstək xidməti</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Statistikalarımız</h2>
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">50,000+</div>
                <div className="text-sm text-gray-600">Qeydiyyatlı İstifadəçi</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">25,000+</div>
                <div className="text-sm text-gray-600">Həll Edilmiş Şikayət</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">1,500+</div>
                <div className="text-sm text-gray-600">Qoşulmuş Şirkət</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">85%</div>
                <div className="text-sm text-gray-600">Həll Nisbəti</div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Əlaqə</h2>
            <p className="text-gray-700 mb-4">
              Suallarınız və ya təklifləriniz varsa, bizimlə əlaqə saxlamaqdan çəkinməyin:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ünvan:</h4>
                  <p className="text-gray-700">Bakı şəhəri, Nəsimi rayonu</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">E-poçt:</h4>
                  <p className="text-gray-700">info@grumble.az</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Telefon:</h4>
                  <p className="text-gray-700">+994 12 XXX XX XX</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">İş saatları:</h4>
                  <p className="text-gray-700">Bazar ertəsi - Cümə, 09:00-18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;