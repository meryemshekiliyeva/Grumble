import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
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
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="company/:companyId" element={<CompanyDetailPage />} />
          <Route path="companies/:companyId" element={<CompanyDetailPage />} />
          <Route path="review/:companyId" element={<ReviewPage />} />
          <Route path="my-complaints" element={<MyComplaints />} />
          <Route path="profile" element={<Profile />} />
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
    </AuthProvider>
  );
}

export default App;
