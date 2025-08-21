import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryId } = useParams();

  // Category data with companies
  const categories = {
    'banklar': {
      name: 'Banklar',
      companies: [
        {
          id: 'kapital-bank',
          name: 'Kapital Bank',
          logo: 'https://www.kapitalbank.az/files/about/main/png.png',
          rating: 3.0,
          complaints: 139,
          description: 'Azərbaycanın ən böyük istehlaklı banklarından biri'
        },
        {
          id: 'pasha-bank',
          name: 'PAŞA Bank',
          logo: 'https://www.pashabank.az/templates/images/pashabank-logo-en.svg',
          rating: 2.8,
          complaints: 8,
          description: 'Müasir bankçılıq xidmətləri təqdim edən bank'
        },
        {
          id: 'birbank',
          name: 'Birbank',
          logo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyOC4zLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCA2ODUgMjQ4LjIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDY4NSAyNDguMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0ZGMDAzOTt9DQo8L3N0eWxlPg0KPGc+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTU5LjgsMzkuNWMwLTMuNi0yLTQuMy00LjQtMi45TDcuNyw2NC4yYy0zLjIsMS44LTQuNCw0LjktNC40LDcuOXYxMzYuNmMwLDMuNiwyLDQuMyw0LjQsMi45TDU1LjQsMTg0DQoJCWMzLjItMS44LDQuNC00LjksNC40LTcuOVYzOS41eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMTYuMiwxMjguOXYtNzRoMTcuOXYzOS45YzUuOS03LjMsMTUuNS0xMi4yLDI2LjktMTIuMmMyMS44LDAsMzkuMywxNy4zLDM5LjMsNDEuNnY1LjQNCgkJYzAsMjQtMTcuOCw0MS40LTQyLjQsNDEuNEMxMzQuNiwxNzAuOSwxMTYuMiwxNTUuMywxMTYuMiwxMjguOUwxMTYuMiwxMjguOXogTTE4Mi4zLDEyOS4ydi00LjRjMC0xNi05LjUtMjYuMi0yNC4xLTI2LjINCgkJYy0xNC43LDAtMjQuMSwxMC4zLTI0LjEsMjYuMnY0LjRjMCwxNS43LDkuNSwyNS43LDI0LjEsMjUuN0MxNzIuOSwxNTUsMTgyLjMsMTQ0LjUsMTgyLjMsMTI5LjJ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIyMy45LDUyLjljNi41LDAsMTEuNCw0LjEsMTEuNCwxMC4zdjEuMWMwLDYuMi00LjksMTAuMy0xMS40LDEwLjNzLTExLjYtNC4xLTExLjYtMTAuM3YtMS4xDQoJCUMyMTIuMyw1NywyMTcuNCw1Mi45LDIyMy45LDUyLjl6IE0yMzIuOSwxNjlIMjE1Vjg0LjZoMTcuOVYxNjl6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTMxMy44LDEyOC45di03NGgxNy45djM5LjljNS45LTcuMywxNS41LTEyLjIsMjYuOS0xMi4yYzIxLjgsMCwzOS4zLDE3LjMsMzkuMyw0MS42djUuNA0KCQljMCwyNC0xNy44LDQxLjQtNDIuNCw0MS40QzMzMi4yLDE3MC45LDMxMy44LDE1NS4zLDMxMy44LDEyOC45TDMxMy44LDEyOC45eiBNMzc5LjksMTI5LjJ2LTQuNGMwLTE2LTkuNS0yNi4yLTI0LjEtMjYuMg0KCQljLTE0LjcsMC0yNC4xLDEwLjMtMjQuMSwyNi4ydjQuNGMwLDE1LjcsOS41LDI1LjcsMjQuMSwyNS43QzM3MC41LDE1NSwzNzkuOSwxNDQuNSwzNzkuOSwxMjkuMnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzAzLjYsODZsLTQuMiwxNi4zYy0zLjMtMS41LTYuNS0yLjQtMTAuNC0yLjRjLTExLjQsMC0yMCw4LjgtMjAsMjMuNVYxNjlIMjUxVjg0LjZoMTcuOXYxMS43DQoJCWM0LjktOS45LDEzLTEzLjcsMjEuOC0xMy43QzI5NS42LDgyLjYsMzAwLDgzLjcsMzAzLjYsODZMMzAzLjYsODZ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQwOS4xLDEyOS41VjEyNGMwLTI0LjEsMTcuNC00MS40LDM5LjMtNDEuNGMxMS40LDAsMjEsNC45LDI2LjksMTIuMlY4NC42aDE3LjlWMTY5aC0xNy45di0xMC4zDQoJCWMtNS45LDcuMy0xNS41LDEyLjItMjYuOSwxMi4yQzQyNi41LDE3MC45LDQwOS4xLDE1My43LDQwOS4xLDEyOS41eiBNNDc1LjMsMTI4Ljd2LTMuOWMwLTE2LTkuMy0yNi4yLTI0LTI2LjINCgkJYy0xNC43LDAtMjQsMTAuMy0yNCwyNi4ydjMuOWMwLDE2LDkuMywyNi4yLDI0LDI2LjJDNDY2LDE1NSw0NzUuMywxNDQuNyw0NzUuMywxMjguN3oiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTI5LDEyMC4zVjE2OWgtMTcuOVY4NC42SDUyOXYxMC42YzQuNC02LjUsMTIuNC0xMi41LDI0LjgtMTIuNWMxOS4xLDAsMzEuNiwxMy41LDMxLjYsMzYuM3Y1MGgtMTcuOXYtNDguOQ0KCQljMC0xNC4yLTctMjEuNS0xOC40LTIxLjVDNTM4LjMsOTguNiw1MjksMTA2LjcsNTI5LDEyMC4zTDUyOSwxMjAuM0w1MjksMTIwLjN6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYyMSwxNjloLTE3LjlWNTQuOUg2MjF2NjUuOGwzNC4xLTM2LjJoMjMuM2wtMzMuOSwzNC4ybDM3LjIsNTAuMmgtMjJsLTI3LjQtMzhMNjIxLDE0Mi4zTDYyMSwxNjlMNjIxLDE2OXoiDQoJCS8+DQo8L2c+DQo8L3N2Zz4NCg==',
          rating: 1.0,
          complaints: 1,
          description: 'Rəqəmsal bankçılıq həlləri təklif edən bank'
        }
      ]
    },
    'telekommunikasiya': {
      name: 'Telekommunikasiya',
      companies: [
        {
          id: 'azercell',
          name: 'Azercell',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Azercell_logo.svg/200px-Azercell_logo.svg.png',
          rating: 3.5,
          complaints: 45,
          description: 'Azərbaycanın aparıcı mobil operator şirkəti'
        },
        {
          id: 'bakcell',
          name: 'Bakcell',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bakcell_logo.svg/200px-Bakcell_logo.svg.png',
          rating: 3.2,
          complaints: 32,
          description: 'Müasir telekommunikasiya xidmətləri təqdim edən şirkət'
        }
      ]
    },
    'e-ticarət': {
      name: 'E-ticarət',
      companies: [
        {
          id: 'trendyol',
          name: 'Trendyol',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Trendyol_logo.svg/200px-Trendyol_logo.svg.png',
          rating: 4.1,
          complaints: 23,
          description: 'Onlayn alış-veriş platforması'
        }
      ]
    },
    'yemek-catdirilmasi': {
      name: 'Yemək Çatdırılması',
      companies: [
        {
          id: 'wolt',
          name: 'Wolt',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Wolt_logo.svg/200px-Wolt_logo.svg.png',
          rating: 3.5,
          complaints: 43,
          description: 'Beynəlxalq yemək çatdırılması platforması'
        },
        {
          id: 'bolt',
          name: 'Bolt',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Bolt_logo.svg/200px-Bolt_logo.svg.png',
          rating: 3.2,
          complaints: 156,
          description: 'Sürətli yemək çatdırılması xidməti'
        },
        {
          id: 'yango',
          name: 'Yango',
          logo: 'https://yango.com/images/logo.png',
          rating: 3.8,
          complaints: 89,
          description: 'Müasir yemək çatdırılması platforması'
        },
        {
          id: 'fooderos',
          name: 'Fooderos',
          logo: 'https://fooderos.az/images/logo.png',
          rating: 3.4,
          complaints: 67,
          description: 'Yerli yemək çatdırılması xidməti'
        }
      ]
    }
  };

  const category = categories[categoryId];

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Kateqoriya tapılmadı</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gray-700">Ana səhifə</Link>
            <span>/</span>
            <span className="text-gray-900">{category.name}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
          <p className="text-gray-600 mt-2">{category.companies.length} şirkət</p>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {category.companies.map((company) => (
            <Link
              key={company.id}
              to={`/company/${company.id}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=3b82f6&color=fff&size=48`;
                  }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(company.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{company.rating}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{company.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Şikayət sayı: {company.complaints}</span>
                <span className="text-blue-600 font-medium">Ətraflı →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
