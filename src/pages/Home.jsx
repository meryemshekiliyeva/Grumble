import React from 'react';
import ComplaintCard from '../components/ComplaintCard';
import CompanyCard from '../components/CompanyCard';
import CategoryCard from '../components/CategoryCard';
import FAQItem from '../components/FAQItem';

const mockComplaints = [
  {
    title: 'İnternet Bağlantı Problemləri',
    company: 'CityNet',
    author: 'Orxan Məmmədov',
    date: '9 İyul 2025',
    summary: 'İnternetim 3 gündür işləmir. Müştəri xidmətləri zənglərimi cavablamır. Bu qəbuledilməzdir!',
  },
  {
    title: 'Səhv Yemək Çatdırılması',
    company: 'Wolt',
    author: 'Aysel Əliyeva',
    date: '8 İyul 2025',
    summary: 'Pizza sifariş etdim, amma tamamilə fərqli sifariş gətirdilər. Restoran və Wolt bir-birini günahlandırır.',
  },
    {
    title: 'Məhsul Çatdırılmadı',
    company: 'Trendyol',
    author: 'Leyla Hüseynova',
    date: '7 İyul 2025',
    summary: '2 həftə əvvəl paltar sifariş etdim, hələ də çatdırılmayıb. İzləmə nömrəsi işləmir.',
  },
];

const testimonials = [
  {
    name: 'Elvin Valiyev',
    company: 'Kontakt Home',
    avatar: 'EV',
    message: 'Aldığım televizorda defekt var idi. Mağazaya müraciət etdim, lakin həll tapa bilmədik. Burda paylaşdıqdan sonra dəyişdirdilər.',
    status: 'Həll edilib',
    date: '5 DEC',
    resolved: true
  },
  {
    name: 'Səbinə Abbasova',
    company: 'AZAL',
    avatar: 'SA',
    message: 'Uçuş təxirə salındı, lakin vaxtında məlumat verilmədi. Şikayətimi burada yazdım və şirkət üzr istəyib kompensasiya verdi.',
    status: 'Həll edilib',
    date: '3 DEC',
    resolved: true
  }
];

const mostComplainedCompanies = [
  {
    name: 'CityNet',
    category: 'İnternet Provayderi',
    complaintCount: 247,
    icon: '🏢',
    bgColor: '#6c5ce7'
  },
  {
    name: 'Trendyol',
    category: 'E-ticarət',
    complaintCount: 189,
    icon: '🛒',
    bgColor: '#e17055'
  },
  {
    name: 'Wolt',
    category: 'Yemək Çatdırılması',
    complaintCount: 156,
    icon: '🍕',
    bgColor: '#00b894'
  },
  {
    name: 'AZAL',
    category: 'Havayolu',
    complaintCount: 134,
    icon: '✈️',
    bgColor: '#e84393'
  },
  {
    name: 'Azercell',
    category: 'Telekom',
    complaintCount: 128,
    icon: '📱',
    bgColor: '#0984e3'
  },
  {
    name: 'Kapital Bank',
    category: 'Bank',
    complaintCount: 112,
    icon: '🏦',
    bgColor: '#6c5ce7'
  },
  {
    name: 'Bravo',
    category: 'Supermarket',
    complaintCount: 98,
    icon: '🛍️',
    bgColor: '#fd79a8'
  },
  {
    name: 'Azərpoçt',
    category: 'Poçt Xidməti',
    complaintCount: 87,
    icon: '📦',
    bgColor: '#00cec9'
  },
  {
    name: 'Bolt Food',
    category: 'Yemək Çatdırılması',
    complaintCount: 76,
    icon: '🚗',
    bgColor: '#fdcb6e'
  },
  {
    name: 'AtaSigorta',
    category: 'Sığorta',
    complaintCount: 65,
    icon: '🛡️',
    bgColor: '#a29bfe'
  }
];

const categories = [
  {
    name: 'Telekom',
    description: 'Mobil və internet',
    icon: '📱',
    bgColor: '#6c5ce7'
  },
  {
    name: 'E-ticarət',
    description: 'Onlayn alış veriş',
    icon: '🛒',
    bgColor: '#e17055'
  },
  {
    name: 'Yemək Çatdırılması',
    description: 'Restoran və kafelər',
    icon: '🍕',
    bgColor: '#00b894'
  },
  {
    name: 'Nəqliyyat',
    description: 'Taksi və avtobus',
    icon: '🚗',
    bgColor: '#e84393'
  },
  {
    name: 'Kommunal',
    description: 'Su, qaz, elektrik',
    icon: '⚡',
    bgColor: '#fdcb6e'
  },
  {
    name: 'Bank Xidmətləri',
    description: 'Kredit və əmanət',
    icon: '🏦',
    bgColor: '#0984e3'
  },
  {
    name: 'Təhsil',
    description: 'Məktəb və universitet',
    icon: '🎓',
    bgColor: '#a29bfe'
  },
  {
    name: 'Dövlət Xidmətləri',
    description: 'ASAN və digər',
    icon: '🏛️',
    bgColor: '#fd79a8'
  },
  {
    name: 'Sığorta',
    description: 'Həyat və əmlak',
    icon: '🛡️',
    bgColor: '#00cec9'
  },
  {
    name: 'Pərakəndə',
    description: 'Supermarket və mağaza',
    icon: '🏪',
    bgColor: '#6c5ce7'
  },
  {
    name: 'Əyləncə',
    description: 'Kino və teatr',
    icon: '🎭',
    bgColor: '#e17055'
  },
  {
    name: 'Səhiyyə',
    description: 'Xəstəxana və klinika',
    icon: '🏥',
    bgColor: '#00b894'
  },
  {
    name: 'Havayolu',
    description: 'Uçuş və biletlər',
    icon: '✈️',
    bgColor: '#e84393'
  },
  {
    name: 'Turizm',
    description: 'Otel və səyahət',
    icon: '🏨',
    bgColor: '#fdcb6e'
  },
  {
    name: 'Texnologiya',
    description: 'IT və proqram',
    icon: '💻',
    bgColor: '#0984e3'
  },
  {
    name: 'Kuryer',
    description: 'Çatdırılma xidməti',
    icon: '📦',
    bgColor: '#a29bfe'
  },
  {
    name: 'Daşınmaz Əmlak',
    description: 'Ev və ofis',
    icon: '🏠',
    bgColor: '#fd79a8'
  },
  {
    name: 'Biznes Xidmətləri',
    description: 'Konsultasiya və audit',
    icon: '💼',
    bgColor: '#00cec9'
  }
];

const faqData = [
  {
    question: "Platformanızda şikayət bildirmək pulludur?",
    answer: "Xeyr, platformamızda şikayət bildirmək tamamilə pulsuzdur. Biz istifadəçilərimizin problemlərini həll etmək üçün pulsuz xidmət təqdim edirik və heç bir ödəniş tələb etmirik."
  },
  {
    question: "Şikayətim nə qədər müddətdə həll olunur?",
    answer: "Şikayətlərin həll olunma müddəti problemin mürəkkəbliyindən asılıdır. Adi hallarda 3-7 iş günü ərzində cavab alırsınız. Təcili hallarda isə 24 saat ərzində əlaqə saxlanılır."
  },
  {
    question: "Şəxsi məlumatlarım təhlükəsizdir?",
    answer: "Bəli, biz istifadəçilərimizin məxfiliyini çox ciddi qəbul edirik. Bütün şəxsi məlumatlar şifrələnir və yalnız şikayətin həlli üçün lazım olan hallarda istifadə olunur. Məlumatlarınız heç vaxt üçüncü tərəflərə verilmir."
  },
  {
    question: "Hansı şirkətlər platformanızda təmsil olunur?",
    answer: "Platformamızda Azərbaycanda fəaliyyət göstərən 500+ şirkət təmsil olunur. Bunlara bank, telekom, e-ticarət, yemək çatdırılması, nəqliyyat və digər sahələrdən şirkətlər daxildir."
  },
  {
    question: "Şikayətimi necə daha effektiv yazım?",
    answer: "Effektiv şikayət üçün: 1) Problemi aydın şəkildə izah edin, 2) Tarix və saat qeyd edin, 3) Sənədlərin şəklini əlavə edin, 4) Əlaqə məlumatlarınızı düzgün yazın, 5) Gözlədiyiniz həlli qeyd edin."
  }
];

const Home = () => {
  return (
    <div className="w-full">
      <section className="w-full py-16 md:py-20 lg:py-24 bg-muted/20">
        <div className="container mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Şikayətinizi Bildirin
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl mt-4">
            Grumble səsinizin eşidildiyi platformadır. Təcrübələrinizi paylaşın və başqalarının hekayələrini oxuyun.
          </p>
          <button className="mt-6 px-8 py-3 text-lg font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">
            Şikayət Göndər
          </button>
        </div>
      </section>

      <section className="w-full py-10 md:py-16 bg-muted/10">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Ən Çox Şikayət Edilən Şirkətlər
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Şəffaf və hesabatlı. Hansı şirkətlərin ən çox şikayət aldığını öyrənin və öz təcrübənizi paylaşın.
            </p>
          </div>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {mostComplainedCompanies.map((company, index) => (
              <CompanyCard key={index} {...company} />
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="px-6 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors">
              BÜTÜN ŞİRKƏTLƏRİ GÖSTƏR →
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="w-full py-16 md:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-7xl px-6">
          {/* Top section - 50+ and badge */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 mb-16">
            {/* Left side - 50+ and description */}
            <div className="lg:w-2/5">
              <div className="inline-flex items-center bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
                KATEQORİYA
              </div>
              <div className="mb-8">
                <div className="text-8xl md:text-9xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-4 leading-none">
                  50<span className="text-5xl md:text-6xl">+</span>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <p className="text-lg font-medium text-gray-700">
                    Platformamız bütün sahələri əhatə edir
                  </p>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-600">CANLI STATİSTİKA</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">50+</div>
                      <div className="text-xs text-gray-500">Kateqoriya</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">1000+</div>
                      <div className="text-xs text-gray-500">Şirkət</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Title and description */}
            <div className="lg:w-3/5">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-gray-900 leading-tight">
                Şikayət <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">kateqoriyaları</span>.
              </h2>
              <p className="text-xl text-gray-700 mb-4 font-medium">
                Geniş və əhatəli kateqoriyalar.
              </p>
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed mb-8">
                Platformamızın geniş kateqoriya kitabxanası sizə istənilən sahədə şikayət bildirmək imkanı verir və problemlərinizi düzgün yönləndirir.
              </p>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white/50 rounded-xl p-4 backdrop-blur-sm border border-white/20 shadow-sm hover:border-white/40 transition-all duration-300">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-sm">🎯</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Dəqiq kateqoriyalaşdırma</span>
                </div>
                <div className="flex items-center gap-3 bg-white/50 rounded-xl p-4 backdrop-blur-sm border border-white/20 shadow-sm hover:border-white/40 transition-all duration-300">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-sm">⚡</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Sürətli həll yolları</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Rows of Animated Categories */}
          <div className="space-y-4">
            {/* First Row - Left to Right */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right">
                {[...categories.slice(0, 6), ...categories.slice(0, 6)].map((category, index) => (
                  <CategoryCard key={`row1-${index}`} {...category} />
                ))}
              </div>
            </div>

            {/* Second Row - Right to Left */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-left">
                {[...categories.slice(6, 12), ...categories.slice(6, 12)].map((category, index) => (
                  <CategoryCard
                    key={`row2-${index}`}
                    {...category}
                  />
                ))}
              </div>
            </div>

            {/* Third Row - Left to Right */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-right">
                {[...categories.slice(12, 18), ...categories.slice(12, 18)].map((category, index) => (
                  <CategoryCard key={`row3-${index}`} {...category} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-10 md:py-16 bg-gradient-to-br from-primary/5 to-secondary/10">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="relative z-10">
              {/* Header with stats */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
                <div className="flex items-center space-x-4 mb-6 lg:mb-0">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Həll edilmiş <span className="text-primary">15,000+</span> şikayət
                    </h3>
                    <p className="text-muted-foreground">
                      İstifadəçilərimiz platformamızda problemlərini paylaşır və həll tapırlar.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">500+</div>
                    <div className="text-sm text-muted-foreground">Günlük şikayət</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center space-x-1">
                      <span className="text-3xl font-bold text-foreground">4.8</span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">1,250 qiymət</div>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/40 shadow-sm hover:shadow-md hover:border-gray-300/50 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                        </div>
                        <p className="text-sm text-foreground/80 mb-3">{testimonial.message}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs font-medium text-green-600">{testimonial.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom stats */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-3 bg-card/60 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 shadow-sm hover:border-gray-300/60 transition-all duration-300">
                  <span className="text-sm font-medium text-foreground">10,000+ həll edilmiş şikayət platformamızda</span>
                  <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span className="text-xs font-medium">TƏSDİQLƏNMİŞ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-10 md:py-16">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Tez-tez verilən suallar
            </h2>
            <p className="text-lg text-muted-foreground">
              Platformamız haqqında ən çox verilən sualların cavabları
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-10 md:py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-10">
            Son Şikayətlər
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockComplaints.map((complaint, index) => (
              <ComplaintCard key={index} {...complaint} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
