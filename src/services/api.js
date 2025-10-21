// API service for connecting frontend to backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'API request failed');
    }
    return response.json();
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Auth endpoints
  auth = {
    login: (identifier, password) =>
      this.request('/auth/login/user', {
        method: 'POST',
        body: JSON.stringify({ identifier, password })
      }),

    loginCompany: (email, password) => 
      this.request('/auth/login/company', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      }),

    register: (userData) => 
      this.request('/auth/register/user', {
        method: 'POST',
        body: JSON.stringify(userData)
      }),

    registerCompany: (companyData) => 
      this.request('/auth/register/company', {
        method: 'POST',
        body: JSON.stringify(companyData)
      }),

    me: () => this.request('/auth/me'),

    verifyEmail: (token) => 
      this.request('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ token })
      }),

    forgotPassword: (email) => 
      this.request('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email })
      }),

    resetPassword: (token, password) => 
      this.request('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password })
      })
  };

  // Complaints endpoints
  complaints = {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.request(`/complaints${queryString ? `?${queryString}` : ''}`);
    },

    getById: (id) => this.request(`/complaints/${id}`),

    create: (complaintData) => 
      this.request('/complaints', {
        method: 'POST',
        body: JSON.stringify(complaintData)
      }),

    update: (id, data) => 
      this.request(`/complaints/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),

    delete: (id) => 
      this.request(`/complaints/${id}`, {
        method: 'DELETE'
      }),

    like: (id) => 
      this.request(`/complaints/${id}/like`, {
        method: 'POST'
      }),

    getTrending: () => this.request('/complaints/trending'),

    getRecent: () => this.request('/complaints/recent')
  };

  // Companies endpoints
  companies = {
    getAll: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.request(`/companies${queryString ? `?${queryString}` : ''}`);
    },

    getById: (id) => this.request(`/companies/${id}`),

    getFeatured: () => this.request('/companies/featured'),

    updateProfile: (data) => 
      this.request('/companies/profile', {
        method: 'PUT',
        body: JSON.stringify(data)
      }),

    getStats: () => this.request('/companies/dashboard/stats')
  };

  // Users endpoints
  users = {
    getProfile: () => this.request('/users/profile'),

    updateProfile: (formData) => 
      this.request('/users/profile', {
        method: 'PUT',
        body: formData,
        headers: {
          ...(localStorage.getItem('token') && { 'Authorization': `Bearer ${localStorage.getItem('token')}` })
        }
      }),

    getComplaints: () => this.request('/users/complaints'),

    getStats: () => this.request('/users/dashboard/stats'),

    changePassword: (passwordData) => 
      this.request('/users/change-password', {
        method: 'POST',
        body: JSON.stringify(passwordData)
      })
  };

  // Reviews endpoints
  reviews = {
    getByCompany: (companyId) => this.request(`/reviews/company/${companyId}`),

    create: (reviewData) => 
      this.request('/reviews', {
        method: 'POST',
        body: JSON.stringify(reviewData)
      }),

    update: (id, data) => 
      this.request(`/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),

    delete: (id) => 
      this.request(`/reviews/${id}`, {
        method: 'DELETE'
      })
  };

  // Categories endpoints
  categories = {
    getAll: () => this.request('/categories'),

    getById: (id) => this.request(`/categories/${id}`),

    getHierarchy: () => this.request('/categories/hierarchy'),

    getPopular: () => this.request('/categories/popular')
  };

  // Stats endpoints
  stats = {
    getOverview: () => this.request('/stats/overview'),

    getComplaintsMonthly: () => this.request('/stats/complaints/monthly'),

    getCategoriesPopular: () => this.request('/stats/categories/popular'),

    getTopCompanies: () => this.request('/stats/companies/top'),

    getStatusDistribution: () => this.request('/stats/complaints/status-distribution')
  };

  // Health check
  health = () => this.request('/health');
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export individual services for convenience
export const {
  auth,
  complaints,
  companies,
  users,
  reviews,
  categories,
  stats
} = apiService;
