import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Complaints from './pages/Complaints';
import Companies from './pages/Companies';
import Categories from './pages/Categories';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NewComplaint from './pages/NewComplaint';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/Dashboard';
import ComplaintsList from './admin/ComplaintsList';
import ComplaintView from './admin/ComplaintView';
import UserList from './admin/UserList';
import UserView from './admin/UserView';
import CompanyList from './admin/CompanyList';
import CompanyView from './admin/CompanyView';
import CategoryPage from './pages/CategoryPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import ReviewPage from './pages/ReviewPage';
import MyComplaints from './pages/MyComplaints';
import Profile from './pages/Profile';
import AuthSuccess from './pages/AuthSuccess';
import AiChatAssistant from './components/AiChatAssistant'; // Import the assistant UI

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Yüklənir...</p>
    </div>
  </div>
);

// App content component
const AppContent = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Layout />
            <AiChatAssistant themeColor="#6c5ce7" /> {/* Pass theme color */}
          </>
        }>
          <Route index element={<Home />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="companies" element={<Companies />} />
          <Route path="categories" element={<Categories />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="new-complaint" element={<NewComplaint />} />
          <Route path="yeni-sikayetler" element={<NewComplaint />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="company/:companyId" element={<CompanyDetailPage />} />
          <Route path="companies/:companyId" element={<CompanyDetailPage />} />
          <Route path="review/:companyId" element={<ReviewPage />} />
          <Route path="my-complaints" element={<MyComplaints />} />
          <Route path="profile" element={<Profile />} />
          <Route path="auth/success" element={<AuthSuccess />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="complaints" element={<ComplaintsList />} />
          <Route path="complaints/:id" element={<ComplaintView />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/:id" element={<UserView />} />
          <Route path="companies" element={<CompanyList />} />
          <Route path="companies/:id" element={<CompanyView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

// Main App component
function App() {
  try {
    return (
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </AuthProvider>
    );
  } catch (error) {
    console.error('App error:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}

export default App;
