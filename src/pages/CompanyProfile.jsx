import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

// ComplaintsSection component
const ComplaintsSection = ({ complaints, isLoading, onResponse, onFilterChange, stats }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [responseText, setResponseText] = useState({});
  const [respondingTo, setRespondingTo] = useState(null);

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    onFilterChange(status);
  };

  const handleResponse = async (complaintId) => {
    const message = responseText[complaintId];
    if (!message || message.trim().length < 10) {
      alert('Cavab ən azı 10 simvol olmalıdır');
      return;
    }

    const result = await onResponse(complaintId, message.trim());
    if (result.success) {
      setResponseText({ ...responseText, [complaintId]: '' });
      setRespondingTo(null);
      alert('Cavab uğurla göndərildi');
    } else {
      alert(result.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-gray-100 text-gray-800';
      case 'closed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Gözləyir';
      case 'in_progress': return 'İşlənir';
      case 'resolved': return 'Həll edildi';
      case 'rejected': return 'Rədd edildi';
      case 'closed': return 'Bağlandı';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter buttons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleStatusFilter('')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedStatus === ''
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Hamısı ({Object.values(stats).reduce((a, b) => a + b, 0)})
          </button>
          <button
            onClick={() => handleStatusFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedStatus === 'pending'
                ? 'bg-red-500 text-white'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            Gözləyən ({stats.pending})
          </button>
          <button
            onClick={() => handleStatusFilter('in_progress')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedStatus === 'in_progress'
                ? 'bg-blue-500 text-white'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            İşlənir ({stats.in_progress})
          </button>
          <button
            onClick={() => handleStatusFilter('resolved')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedStatus === 'resolved'
                ? 'bg-green-500 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            Həll edildi ({stats.resolved})
          </button>
        </div>
      </div>

      {/* Complaints list */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Şikayətlər {selectedStatus && `- ${getStatusText(selectedStatus)}`}
        </h3>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-500 mt-2">Yüklənir...</p>
          </div>
        ) : complaints.length > 0 ? (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{complaint.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{complaint.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Müştəri: {complaint.user?.firstName} {complaint.user?.lastName}</span>
                      <span>Kateqoriya: {complaint.category?.name}</span>
                      <span>{new Date(complaint.createdAt).toLocaleDateString('az-AZ')}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {getStatusText(complaint.status)}
                  </span>
                </div>

                {/* Existing responses */}
                {complaint.responses && complaint.responses.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {complaint.responses.map((response, index) => (
                      <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-3">
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-blue-800">{response.message}</p>
                          <span className="text-xs text-blue-600">
                            {new Date(response.createdAt).toLocaleDateString('az-AZ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Response form */}
                {complaint.status !== 'resolved' && complaint.status !== 'closed' && (
                  <div className="mt-3">
                    {respondingTo === complaint._id ? (
                      <div className="space-y-2">
                        <textarea
                          value={responseText[complaint._id] || ''}
                          onChange={(e) => setResponseText({ ...responseText, [complaint._id]: e.target.value })}
                          placeholder="Cavabınızı yazın..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows="3"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleResponse(complaint._id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                          >
                            Cavab göndər
                          </button>
                          <button
                            onClick={() => setRespondingTo(null)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                          >
                            Ləğv et
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setRespondingTo(complaint._id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        Cavab ver
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Şikayət yoxdur</h3>
            <p className="text-gray-500">
              {selectedStatus ? `${getStatusText(selectedStatus)} statusunda şikayət yoxdur.` : 'Hələ heç bir şikayət yoxdur.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const CompanyProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, logout, updateProfile } = useAuth();
  const { addReplyNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [complaintsStats, setComplaintsStats] = useState({
    pending: 0,
    in_progress: 0,
    resolved: 0,
    rejected: 0,
    closed: 0
  });
  const [isLoadingComplaints, setIsLoadingComplaints] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    address: ''
  });

  // Handle direct navigation from URL parameters
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['profile', 'pending-reviews', 'responded-reviews', 'notifications'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        companyName: user.companyName || user.name || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        website: user.website || '',
        description: user.description || '',
        address: user.address || ''
      });
      setImagePreview(user.avatar);
    }

    // Load mock reviews data
    loadReviews();

    // Load complaints for this company
    if (user?._id) {
      loadComplaints();
    }
  }, [user]);

  const loadReviews = () => {
    // Mock reviews data
    const mockReviews = [
      {
        id: 1,
        customerName: 'Əli Məmmədov',
        email: 'ali@example.com',
        rating: 4,
        comment: 'Xidmət yaxşıdır, lakin gözləmə müddəti uzundur.',
        status: 'pending',
        createdAt: '2024-01-15T10:30:00Z',
        response: null
      },
      {
        id: 2,
        customerName: 'Leyla Həsənova',
        email: 'leyla@example.com',
        rating: 5,
        comment: 'Əla xidmət! Çox məmnunam.',
        status: 'responded',
        createdAt: '2024-01-14T14:20:00Z',
        response: 'Təşəkkür edirik! Sizə xidmət etməkdən məmnunuq.'
      },
      {
        id: 3,
        customerName: 'Rəşad Quliyev',
        email: 'rashad@example.com',
        rating: 3,
        comment: 'Orta səviyyədə xidmət.',
        status: 'pending',
        createdAt: '2024-01-13T09:15:00Z',
        response: null
      },
      {
        id: 4,
        customerName: 'Nigar Əliyeva',
        email: 'nigar@example.com',
        rating: 5,
        comment: 'Mükəmməl xidmət və peşəkar yanaşma!',
        status: 'responded',
        createdAt: '2024-01-12T16:45:00Z',
        response: 'Çox sağ olun! Belə müştərilərə sahib olmaq bizim üçün böyük şərəfdir.'
      }
    ];

    setReviews(mockReviews);
  };

  // Load complaints for the company
  const loadComplaints = async (status = '') => {
    setIsLoadingComplaints(true);
    try {
      // Get company email from bankLogin data
      const bankLogin = JSON.parse(localStorage.getItem('bankLogin') || '{}');
      const companyEmail = bankLogin.email;

      if (!companyEmail) {
        setComplaints([]);
        setComplaintsStats({});
        return;
      }

      // Load from localStorage using company email as key
      const allComplaints = JSON.parse(localStorage.getItem('companyComplaints') || '{}');
      const companyComplaints = allComplaints[companyEmail] || [];

      // Filter by status if provided
      let filteredComplaints = companyComplaints;
      if (status) {
        filteredComplaints = companyComplaints.filter(complaint => complaint.status === status);
      }

      // Calculate stats
      const stats = {
        pending: companyComplaints.filter(c => c.status === 'pending').length,
        in_progress: companyComplaints.filter(c => c.status === 'in_progress').length,
        resolved: companyComplaints.filter(c => c.status === 'resolved').length,
        rejected: companyComplaints.filter(c => c.status === 'rejected').length,
        closed: companyComplaints.filter(c => c.status === 'closed').length
      };

      setComplaints(filteredComplaints);
      setComplaintsStats(stats);
    } catch (error) {
      console.error('Error loading complaints:', error);
    } finally {
      setIsLoadingComplaints(false);
    }
  };

  // Handle complaint response
  const handleComplaintResponse = async (complaintId, message) => {
    try {
      // Get company email from bankLogin data
      const bankLogin = JSON.parse(localStorage.getItem('bankLogin') || '{}');
      const companyEmail = bankLogin.email;

      if (!companyEmail) {
        return { success: false, message: 'Şirkət məlumatları tapılmadı' };
      }

      // Load from localStorage
      const allComplaints = JSON.parse(localStorage.getItem('companyComplaints') || '{}');
      const companyComplaints = allComplaints[companyEmail] || [];

      // Find and update the complaint
      const complaintIndex = companyComplaints.findIndex(c => c._id === complaintId);
      if (complaintIndex === -1) {
        return { success: false, message: 'Şikayət tapılmadı' };
      }

      // Add response
      const response = {
        author: companyEmail,
        authorType: 'Company',
        authorName: bankLogin.name,
        message: message,
        isPublic: true,
        createdAt: new Date().toISOString()
      };

      companyComplaints[complaintIndex].responses.push(response);

      // Update status to in_progress if it was pending
      if (companyComplaints[complaintIndex].status === 'pending') {
        companyComplaints[complaintIndex].status = 'in_progress';
      }

      // Save back to localStorage
      allComplaints[companyEmail] = companyComplaints;
      localStorage.setItem('companyComplaints', JSON.stringify(allComplaints));

      // Reload complaints to show updated data
      loadComplaints();
      return { success: true, message: 'Cavab uğurla göndərildi' };
    } catch (error) {
      console.error('Error responding to complaint:', error);
      return { success: false, message: 'Server xətası' };
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^\+994[0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Şirkət adı tələb olunur';
    } else if (formData.companyName.length < 2) {
      newErrors.companyName = 'Şirkət adı ən azı 2 simvol olmalıdır';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email tələb olunur';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Düzgün email daxil edin';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Düzgün telefon nömrəsi daxil edin (+994XXXXXXXXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          image: 'Şəkil 5MB-dan kiçik olmalıdır'
        }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          image: 'Yalnız şəkil faylları qəbul edilir'
        }));
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);

      // Clear image error
      if (errors.image) {
        setErrors(prev => ({
          ...prev,
          image: ''
        }));
      }
    }
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const updateData = new FormData();
      updateData.append('companyName', formData.companyName);
      updateData.append('firstName', formData.firstName);
      updateData.append('lastName', formData.lastName);
      updateData.append('email', formData.email);
      updateData.append('phone', formData.phone);
      updateData.append('website', formData.website);
      updateData.append('description', formData.description);
      updateData.append('address', formData.address);

      if (profileImage) {
        updateData.append('avatar', profileImage);
      }

      const result = await updateProfile(updateData);

      if (result.success) {
        setSuccessMessage('Profil uğurla yeniləndi');
        setIsEditing(false);
        setProfileImage(null);

        // Update the image preview if there was an avatar upload
        if (result.user.avatar) {
          setImagePreview(result.user.avatar);
        }

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrors({ general: result.message || 'Profil yenilənərkən xəta baş verdi' });
      }
    } catch (error) {
      setErrors({ general: error.message || 'Profil yenilənərkən xəta baş verdi' });
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    if (user) {
      setFormData({
        companyName: user.companyName || user.name || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        website: user.website || '',
        description: user.description || '',
        address: user.address || ''
      });
    }
    setIsEditing(false);
    setErrors({});
    setProfileImage(null);
    setImagePreview(user?.avatar);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleReviewResponse = (reviewId, response) => {
    setReviews(prev =>
      prev.map(review => {
        if (review.id === reviewId) {
          // Trigger notification for the user who wrote the review
          if (review.email && review.email !== user?.email) {
            // Create a notification for the review author
            const notification = {
              type: 'reply',
              title: 'Rəyinizə cavab verildi',
              message: `${user?.companyName || user?.name} şirkəti rəyinizə cavab verdi.`,
              relatedReviewId: reviewId,
              companyName: user?.companyName || user?.name,
              timestamp: new Date().toISOString(),
              isRead: false,
              userId: review.email
            };

            // Save notification to localStorage for the specific user
            const existingNotifications = JSON.parse(localStorage.getItem(`notifications_${review.email}`) || '[]');
            const updatedNotifications = [{ ...notification, id: Date.now().toString() }, ...existingNotifications];
            localStorage.setItem(`notifications_${review.email}`, JSON.stringify(updatedNotifications));
          }

          return { ...review, response, status: 'responded' };
        }
        return review;
      })
    );
  };

  const getFilteredReviews = () => {
    switch (activeTab) {
      case 'pending-reviews':
        return reviews.filter(r => r.status === 'pending');
      case 'responded-reviews':
        return reviews.filter(r => r.status === 'responded');
      default:
        return reviews;
    }
  };

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
      label: 'Şikayətlər',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      badge: complaintsStats.pending > 0 ? complaintsStats.pending : null
    },
    {
      id: 'pending-reviews',
      label: 'Gözləyən Rəylər',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'responded-reviews',
      label: 'Cavablandırılmış',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'notifications',
      label: 'Bildirişlərim',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v6m0 0l3-3m-3 3l-3-3" />
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

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="text-green-400 mr-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-green-800">{successMessage}</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="text-red-400 mr-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-red-800">{errors.general}</p>
                </div>
              </div>
            )}

            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                  <img
                    src={imagePreview || user?.avatar || `https://api.dicebear.com/8.x/initials/svg?seed=${user?.companyName || user?.name}&backgroundColor=3b82f6`}
                    alt={user?.companyName || user?.name}
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                    onError={(e) => {
                      e.target.src = `https://api.dicebear.com/8.x/initials/svg?seed=${user?.companyName || user?.name}&backgroundColor=3b82f6`;
                    }}
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer hover:bg-blue-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user?.companyName || user?.name}
                  </h2>
                  <p className="text-gray-600">{user?.email}</p>
                  <div className="flex space-x-6 mt-2">
                    <div className="text-center">
                      <div className="text-xl font-bold text-red-600">{complaintsStats.pending}</div>
                      <div className="text-sm text-gray-500">Gözləyən Şikayət</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">{complaintsStats.in_progress}</div>
                      <div className="text-sm text-gray-500">İşlənir</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600">{complaintsStats.resolved}</div>
                      <div className="text-sm text-gray-500">Həll Edildi</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-700">{Object.values(complaintsStats).reduce((a, b) => a + b, 0)}</div>
                      <div className="text-sm text-gray-500">Ümumi Şikayət</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Edit/Save buttons */}
              <div className="flex justify-end space-x-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Düzənlə</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Ləğv et
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Saxlanılır...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Saxla</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Profile Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Şirkət Məlumatları</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şirkət Adı <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    } ${errors.companyName ? 'border-red-500' : ''}`}
                    placeholder="Şirkət adını daxil edin"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    } ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    }`}
                    placeholder="Adınızı daxil edin"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soyad
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    }`}
                    placeholder="Soyadınızı daxil edin"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    } ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="+994XXXXXXXXX"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Telefon nömrəsi məcburi deyil
                  </p>
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    }`}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ünvan
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                  }`}
                  placeholder="Şirkət ünvanı"
                />
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şirkət Haqqında
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                  }`}
                  placeholder="Şirkətiniz haqqında məlumat..."
                />
              </div>

              {/* Image Upload Error */}
              {errors.image && (
                <div className="mt-4">
                  <p className="text-sm text-red-600">{errors.image}</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'complaints':
        return <ComplaintsSection
          complaints={complaints}
          isLoading={isLoadingComplaints}
          onResponse={handleComplaintResponse}
          onFilterChange={loadComplaints}
          stats={complaintsStats}
        />;

      case 'pending-reviews':
        const pendingReviews = getFilteredReviews();
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Gözləyən Rəylər</h3>
            {pendingReviews.length > 0 ? (
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onResponse={handleReviewResponse}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Gözləyən rəy yoxdur</h3>
                <p className="text-gray-500">Yeni rəylər burada görünəcək.</p>
              </div>
            )}
          </div>
        );

      case 'responded-reviews':
        const respondedReviews = getFilteredReviews();
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Cavablandırılmış Rəylər</h3>
            {respondedReviews.length > 0 ? (
              <div className="space-y-4">
                {respondedReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onResponse={handleReviewResponse}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Cavablandırılmış rəy yoxdur</h3>
                <p className="text-gray-500">Cavabladığınız rəylər burada görünəcək.</p>
              </div>
            )}
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Bildirişlərim</h3>
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v6m0 0l3-3m-3 3l-3-3" />
                </svg>
              </div>
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
                        // Update URL to reflect the current tab
                        navigate(`/company-profile?tab=${item.id}`, { replace: true });
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
                    {item.badge && (
                      <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.id === 'pending-reviews' && reviews.filter(r => r.status === 'pending').length > 0 && (
                      <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                        {reviews.filter(r => r.status === 'pending').length}
                      </span>
                    )}
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

// Review Card Component
const ReviewCard = ({ review, onResponse }) => {
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [responseText, setResponseText] = useState('');

  const handleSubmitResponse = (e) => {
    e.preventDefault();
    if (responseText.trim()) {
      onResponse(review.id, responseText.trim());
      setResponseText('');
      setShowResponseForm(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              {review.customerName.charAt(0)}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{review.customerName}</h4>
              <p className="text-sm text-gray-500">{review.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            {renderStars(review.rating)}
            <span className="text-sm text-gray-600">({review.rating}/5)</span>
          </div>
        </div>
        <div className="text-right">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            review.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {review.status === 'pending' ? 'Gözləyir' : 'Cavablandırılıb'}
          </span>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(review.createdAt).toLocaleDateString('az-AZ')}
          </p>
        </div>
      </div>

      <p className="text-gray-700 mb-4 pl-12">{review.comment}</p>

      {review.response && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4 ml-12">
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              Ş
            </div>
            <div>
              <h5 className="font-medium text-blue-900 mb-1">Şirkət Cavabı:</h5>
              <p className="text-blue-800 text-sm">{review.response}</p>
            </div>
          </div>
        </div>
      )}

      {review.status === 'pending' && (
        <div className="ml-12">
          {!showResponseForm ? (
            <button
              onClick={() => setShowResponseForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              <span>Cavab Ver</span>
            </button>
          ) : (
            <form onSubmit={handleSubmitResponse} className="space-y-3">
              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Cavabınızı yazın..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Göndər</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowResponseForm(false);
                    setResponseText('');
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-400 transition-colors"
                >
                  Ləğv et
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
