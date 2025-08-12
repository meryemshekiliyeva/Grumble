import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Mock user data - in real app this would come from auth context
  const [userData, setUserData] = useState({
    name: 'Mryam Skiliyeva',
    email: 'meryemshekiliyeva@gmail.com',
    phone: '+994 XX XXX XX XX',
    avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=Mryam Skiliyeva&backgroundColor=3b82f6',
    stats: {
      complaints: 0,
      supports: 0,
      comments: 0
    }
  });

  const menuItems = [
    {
      id: 'profile',
      label: 'Profilim',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'complaints',
      label: 'Şikayətlərim',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'comments',
      label: 'Rəylərim',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: 'likes',
      label: 'Bəyəndiklərim',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },

    {
      id: 'logout',
      label: 'Çıxış',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      isLogout: true
    }
  ];

  const handleEdit = (field, currentValue) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleSave = () => {
    // Save logic here - update user data
    setUserData(prev => ({
      ...prev,
      [editingField]: editValue
    }));
    console.log(`Saving ${editingField}: ${editValue}`);
    setEditingField(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue('');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Hesabınızı silmək istədiyinizə əminsiniz? Bu əməliyyat geri alına bilməz.')) {
      if (window.confirm('Son dəfə soruşuruq: Hesabınızı həqiqətən silmək istəyirsiniz?')) {
        // Delete account logic
        logout();
        navigate('/');
        alert('Hesabınız silindi');
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-6 mb-6">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                  <div className="flex space-x-6 mt-2">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-700">{userData.stats.complaints}</div>
                      <div className="text-sm text-gray-500">Şikayətlərim</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-700">{userData.stats.supports}</div>
                      <div className="text-sm text-gray-500">Bəyəndiklərim</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-700">{userData.stats.comments}</div>
                      <div className="text-sm text-gray-500">Rəylərim</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ad Soyad</h3>
              <div className="flex items-center justify-between">
                {editingField === 'name' ? (
                  <div className="flex items-center space-x-2 flex-1">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button onClick={handleSave} className="text-green-500 hover:text-green-600 text-sm">Saxla</button>
                    <button onClick={handleCancel} className="text-red-500 hover:text-red-600 text-sm">Ləğv et</button>
                  </div>
                ) : (
                  <>
                    <span className="text-gray-700">{userData.name}</span>
                    <button
                      onClick={() => handleEdit('name', userData.name)}
                      className="text-green-500 hover:text-green-600 text-sm"
                    >
                      Düzənlə
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">E-Posta</h3>
              <div className="flex items-center justify-between">
                {editingField === 'email' ? (
                  <div className="flex items-center space-x-2 flex-1">
                    <input
                      type="email"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button onClick={handleSave} className="text-green-500 hover:text-green-600 text-sm">Saxla</button>
                    <button onClick={handleCancel} className="text-red-500 hover:text-red-600 text-sm">Ləğv et</button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">{userData.email}</span>
                      <span className="text-green-500">✓</span>
                    </div>
                    <button
                      onClick={() => handleEdit('email', userData.email)}
                      className="text-green-500 hover:text-green-600 text-sm"
                    >
                      Düzənlə
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Telefon</h3>
              <div className="flex items-center justify-between">
                {editingField === 'phone' ? (
                  <div className="flex items-center space-x-2 flex-1">
                    <input
                      type="tel"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button onClick={handleSave} className="text-green-500 hover:text-green-600 text-sm">Saxla</button>
                    <button onClick={handleCancel} className="text-red-500 hover:text-red-600 text-sm">Ləğv et</button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">{userData.phone}</span>
                      <span className="text-green-500">✓</span>
                    </div>
                    <button
                      onClick={() => handleEdit('phone', userData.phone)}
                      className="text-green-500 hover:text-green-600 text-sm"
                    >
                      Düzənlə
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Şifrə</h3>
              <div className="flex items-center justify-between">
                {editingField === 'password' ? (
                  <div className="flex items-center space-x-2 flex-1">
                    <input
                      type="password"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      placeholder="Yeni şifrə"
                      className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button onClick={handleSave} className="text-green-500 hover:text-green-600 text-sm">Saxla</button>
                    <button onClick={handleCancel} className="text-red-500 hover:text-red-600 text-sm">Ləğv et</button>
                  </div>
                ) : (
                  <>
                    <span className="text-gray-700">••••••••••</span>
                    <button
                      onClick={() => handleEdit('password', '')}
                      className="text-green-500 hover:text-green-600 text-sm"
                    >
                      Düzənlə
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Hesabımı Sil</h3>
                  <p className="text-sm text-gray-500 mt-1">Bu əməliyyat geri alına bilməz</p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Hesabı Sil
                </button>
              </div>
            </div>
          </div>
        );

      case 'complaints':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Şikayətlərim</h3>
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Heç bir şikayətiniz yoxdur</h3>
              <p className="text-gray-500 mb-4">İlk şikayətinizi yazmaq üçün aşağıdakı düyməni basın.</p>
              <Link
                to="/new-complaint"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Yeni Şikayət Yaz
              </Link>
            </div>
          </div>
        );

      case 'comments':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Yorumlarım</h3>
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Heç bir yorumunuz yoxdur</h3>
              <p className="text-gray-500">Şikayətlərə yorum yazmağa başlayın.</p>
            </div>
          </div>
        );

      case 'likes':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bəyəndiklərim</h3>
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Heç bir bəyəndiyiniz yoxdur</h3>
              <p className="text-gray-500">Şikayətləri bəyənməyə başlayın.</p>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bildirişlərim</h3>
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Heç bir bildirişiniz yoxdur</h3>
              <p className="text-gray-500">Yeni bildirişlər burada görünəcək.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.isLogout) {
                        handleLogout();
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary text-white'
                        : item.isLogout
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
