import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ComplaintCard from '../components/ComplaintCard';
import CompanyCard from '../components/CompanyCard';
import CategoryCard from '../components/CategoryCard';
import FAQItem from '../components/FAQItem';
import { sortComplaints } from '../utils/statusConfig';

const mockComplaints = [
  {
    id: 'SKNET001',
    title: 'İnternet Bağlantı Problemləri',
    company: 'CityNet',
    author: 'Orxan Məmmədov',
    date: '9 İyul 2025',
    summary: 'İnternetim 3 gündür işləmir. Müştəri xidmətləri zənglərimi cavablamır. Bu qəbuledilməzdir!',
    status: 'pending',
    rating: 2,
    likes: 12,
    comments: 3
  },
  {
    id: 'SKWOLT002',
    title: 'Səhv Yemək Çatdırılması',
    company: 'Wolt',
    author: 'Aysel Əliyeva',
    date: '8 İyul 2025',
    summary: 'Pizza sifariş etdim, amma tamamilə fərqli sifariş gətirdilər. Restoran və Wolt bir-birini günahlandırır.',
    status: 'resolved',
    rating: 1,
    likes: 8,
    comments: 5
  },
    {
    id: 'SKTREN003',
    title: 'Məhsul Çatdırılmadı',
    company: 'Trendyol',
    author: 'Leyla Hüseynova',
    date: '7 İyul 2025',
    summary: '2 həftə əvvəl paltar sifariş etdim, hələ də çatdırılmayıb. İzləmə nömrəsi işləmir.',
    status: 'in_progress',
    rating: 2,
    likes: 15,
    comments: 7
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
    company: 'Emirates',
    avatar: 'SA',
    message: 'Uçuş təxirə salındı, lakin vaxtında məlumat verilmədi. Şikayətimi burada yazdım və şirkət üzr istəyib kompensasiya verdi.',
    status: 'Həll edilib',
    date: '3 DEC',
    resolved: true
  }
];

const mostComplainedCompanies = [
  {
    name: 'AT&T',
    category: 'Telekom',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/AT%26T_logo_2016.svg/200px-AT%26T_logo_2016.svg.png',
    bgColor: '#0066CC',
    companyId: 'att'
  },
  {
    name: 'JPMorgan Chase',
    category: 'Banklar',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/JPMorgan_Chase_logo.svg/200px-JPMorgan_Chase_logo.svg.png',
    bgColor: '#0066CC',
    companyId: 'jpmorgan-chase'
  },
  {
    name: 'Uber Eats',
    category: 'Yemək Çatdırılması',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/200px-Uber_logo_2018.png',
    bgColor: '#000000',
    companyId: 'uber-eats'
  },
  {
    name: 'Emirates',
    category: 'Havayolu',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png',
    bgColor: '#FF0000',
    companyId: 'emirates'
  },
  {
    name: 'Vodafone',
    category: 'Telekom',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Vodafone_icon.svg/200px-Vodafone_icon.svg.png',
    bgColor: '#E60000',
    companyId: 'vodafone'
  },
  {
    name: 'T-Mobile',
    category: 'Telekom',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/T-Mobile_logo.svg/200px-T-Mobile_logo.svg.png',
    bgColor: '#E20074',
    companyId: 't-mobile'
  },
  {
    name: 'EDF Energy',
    category: 'Kommunal',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/EDF_logo.svg/200px-EDF_logo.svg.png',
    bgColor: '#FF6600',
    companyId: 'edf-energy'
  },
  {
    name: 'National Grid',
    category: 'Kommunal',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/National_Grid_logo.svg/200px-National_Grid_logo.svg.png',
    bgColor: '#0066CC',
    companyId: 'national-grid'
  },
  {
    name: 'HSBC',
    category: 'Banklar',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/HSBC_logo_%282018%29.svg/200px-HSBC_logo_%282018%29.svg.png',
    bgColor: '#DB0011',
    companyId: 'hsbc'
  }
];

const categories = [
  {
    name: 'Telekom',
    description: 'Mobil və internet',
    icon: '📱',
    bgColor: '#6c5ce7',
    categoryId: 'telekommunikasiya',
    brands: ['AT&T', 'Vodafone', 'T-Mobile', 'Verizon', 'Orange', 'Telefonica']
  },
  {
    name: 'E-ticarət',
    description: 'Onlayn alış veriş',
    icon: '🛒',
    bgColor: '#e17055',
    categoryId: 'e-ticarət',
    brands: ['Trendyol', 'Embawood', 'Kontakt Home', 'Irshad', 'Optimal', 'Baku Electronics']
  },
  {
    name: 'Yemək Çatdırılması',
    description: 'Restoran və kafelər',
    icon: '🍕',
    bgColor: '#00b894',
    categoryId: 'yemek-catdirilmasi',
    brands: ['Wolt', 'Bolt', 'Yango', 'Fooderos', 'Yemeksepeti', 'Glovo']
  },
  {
    name: 'Nəqliyyat',
    description: 'Taksi və avtobus',
    icon: '🚗',
    bgColor: '#e84393',
    categoryId: 'neqliyyat',
    brands: ['Bolt', 'Uber', 'BiP', 'Bakı Taksi', 'Bakı Metropoliteni', 'BakuBus']
  },
  {
    name: 'Kommunal',
    description: 'Su, qaz, elektrik',
    icon: '⚡',
    bgColor: '#fdcb6e',
    categoryId: 'kommunal',
    brands: ['Azersu', 'Azerishiq', 'Azerigas', 'Socar Gas', 'Bakı Su Şirkəti', 'Sumqayıt Su']
  },
  {
    name: 'Banklar',
    description: 'Kredit və əmanət',
    icon: '🏦',
    bgColor: '#0984e3',
    categoryId: 'banklar',
    brands: ['JPMorgan Chase', 'HSBC', 'Goldman Sachs', 'Bank of America', 'Wells Fargo', 'Citibank']
  },
  {
    name: 'Təhsil',
    description: 'Məktəb və universitet',
    icon: '🎓',
    bgColor: '#a29bfe',
    categoryId: 'tehsil',
    brands: ['ADA University', 'Bakı Dövlət Universiteti', 'UNEC', 'Xəzər Universiteti', 'Qafqaz Universiteti', 'AMEA']
  },
  {
    name: 'Dövlət Xidmətləri',
    description: 'ASAN və digər',
    icon: '🏛️',
    bgColor: '#fd79a8',
    categoryId: 'dovlet-xidmetleri',
    brands: ['ASAN Xidmət', 'e-Gov', 'Dövlət Qeydiyyat Xidməti', 'Vergi Nazirliyi', 'Əmək Nazirliyi', 'Ədliyyə Nazirliyi']
  },
  {
    name: 'Sığorta',
    description: 'Həyat və əmlak',
    icon: '🛡️',
    bgColor: '#00cec9',
    categoryId: 'sigorta',
    brands: ['PASHA Sığorta', 'Qala Sığorta', 'AXA Sığorta', 'ASCO Sığorta', 'Atəşgah Sığorta', 'Azərbaycan Sığorta']
  },
  {
    name: 'Pərakəndə',
    description: 'Supermarket və mağaza',
    icon: '🏪',
    bgColor: '#6c5ce7',
    categoryId: 'perakende',
    brands: ['Bravo', 'Araz', 'Bazarstore', 'Neptun', 'Coşqun', 'Favorit']
  },
  {
    name: 'Əyləncə',
    description: 'Kino və teatr',
    icon: '🎭',
    bgColor: '#e17055',
    categoryId: 'eylence',
    brands: ['CinemaPlus', 'Park Cinema', 'Nizami Kino Mərkəzi', 'Gənclik Mall Cinema', 'Flame Towers Cinema', 'Dəniz Mall Cinema']
  },
  {
    name: 'Səhiyyə',
    description: 'Xəstəxana və klinika',
    icon: '🏥',
    bgColor: '#00b894',
    categoryId: 'sehiyye',
    brands: ['Mərkəzi Klinika', 'Liv Hospital', 'Acıbadem', 'Yeni Klinika', 'Medicus', 'Avicenna']
  },
  {
    name: 'Havayolu',
    description: 'Uçuş və biletlər',
    icon: '✈️',
    bgColor: '#e84393',
    categoryId: 'havayolu',
    brands: ['Emirates', 'Lufthansa', 'Delta Air Lines', 'American Airlines', 'British Airways', 'Air France']
  },
  {
    name: 'Turizm',
    description: 'Otel və səyahət',
    icon: '🏨',
    bgColor: '#fdcb6e',
    categoryId: 'turizm',
    brands: ['Fairmont Baku', 'Four Seasons', 'JW Marriott', 'Hilton Baku', 'Hyatt Regency', 'Kempinski']
  },
  {
    name: 'Texnologiya',
    description: 'IT və proqram',
    icon: '💻',
    bgColor: '#0984e3',
    categoryId: 'texnologiya',
    brands: ['Microsoft', 'Google', 'Apple', 'Amazon Web Services', 'IBM', 'Oracle']
  },
  {
    name: 'Kuryer',
    description: 'Çatdırılma xidməti',
    icon: '📦',
    bgColor: '#a29bfe',
    categoryId: 'kuryer',
    brands: ['Azerpost', 'DHL', 'FedEx', 'UPS', 'Onex', 'Sürətli Kuryer']
  },
  {
    name: 'Daşınmaz Əmlak',
    description: 'Ev və ofis',
    icon: '🏠',
    bgColor: '#fd79a8',
    categoryId: 'dasinmaz-emlak',
    brands: ['Pasha Construction', 'Akkord', 'Baghlan Group', 'Gilan Holding', 'AF Group', 'Kolin İnşaat']
  },
  {
    name: 'Biznes Xidmətləri',
    description: 'Konsultasiya və audit',
    icon: '💼',
    bgColor: '#00cec9',
    categoryId: 'biznes-xidmetleri',
    brands: ['PwC Azerbaijan', 'KPMG', 'Deloitte', 'EY', 'BDO', 'Grant Thornton']
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
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleComplaintSubmit = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/yeni-sikayetler');
  };

  const handleShowAllCompanies = () => {
    navigate('/companies');
  };



  const handleLike = (complaintId) => {
    console.log('Liked complaint:', complaintId);
    // TODO: Implement like functionality with backend
  };

  const handleComment = (complaintId) => {
    console.log('Comment on complaint:', complaintId);
    // TODO: Implement comment functionality with backend
  };
  return (
    <div className="w-full">
      <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Background illustration */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="200" cy="150" r="80" fill="currentColor" opacity="0.1"/>
            <circle cx="800" cy="200" r="60" fill="currentColor" opacity="0.1"/>
            <circle cx="1000" cy="400" r="100" fill="currentColor" opacity="0.1"/>
            <circle cx="300" cy="600" r="70" fill="currentColor" opacity="0.1"/>
            <path d="M100,300 Q300,200 500,300 T900,300" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2"/>
            <path d="M200,500 Q400,400 600,500 T1000,500" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2"/>
          </svg>
        </div>

        <div className="container mx-auto max-w-6xl px-6 text-center relative z-10">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Şikayətinizi Bildirin
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 md:text-xl mt-4 leading-relaxed">
            Grumble səsinizin eşidildiyi platformadır. Təcrübələrinizi paylaşın və başqalarının hekayələrini oxuyun.
          </p>
          <button
            onClick={handleComplaintSubmit}
            className="mt-6 px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
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
              <CompanyCard
                key={index}
                {...company}

              />
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={handleShowAllCompanies}
              className="px-6 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
            >
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
        <div className="container mx-auto max-w-4xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Son Şikayətlər
            </h2>
            <p className="text-muted-foreground">
              Ən son paylaşılan şikayətləri görün və öz təcrübənizi paylaşın
            </p>
          </div>
          <div className="space-y-6">
            {sortComplaints(mockComplaints).map((complaint, index) => (
              <ComplaintCard
                key={complaint.id}
                {...complaint}
                complaintId={complaint.id}
                onLike={() => handleLike(complaint.id)}
                onComment={() => handleComment(complaint.id)}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/complaints"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Bütün Şikayətləri Gör
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
