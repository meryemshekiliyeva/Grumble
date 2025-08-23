import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Load complaint data from localStorage or API
    const loadComplaint = () => {
      // First check user complaints
      const userComplaints = JSON.parse(localStorage.getItem('userComplaints') || '[]');
      let foundComplaint = userComplaints.find(c => c.id === id);
      
      // If not found in user complaints, check mock complaints
      if (!foundComplaint) {
        const mockComplaints = [
          {
            id: 'SKNET001',
            title: 'İnternet Bağlantı Problemləri',
            company: 'CityNet',
            category: 'Telekommunikasiya',
            author: 'Orxan Məmmədov',
            date: '9 İyul 2025',
            summary: 'İnternetim 3 gündür işləmir. Müştəri xidmətləri zənglərimi cavablamır. Bu qəbuledilməzdir!',
            status: 'pending',
            likes: 12,
            comments: 3,
            rating: 2
          },
          {
            id: 'SKWOLT002',
            title: 'Səhv Yemək Çatdırılması',
            company: 'Wolt',
            category: 'Yemək Çatdırılması',
            author: 'Aysel Əliyeva',
            date: '8 İyul 2025',
            summary: 'Pizza sifariş etdim, amma tamamilə fərqli sifariş gətirdilər. Restoran və Wolt bir-birini günahlandırır.',
            status: 'resolved',
            likes: 8,
            comments: 5,
            rating: 1
          }
        ];
        foundComplaint = mockComplaints.find(c => c.id === id);
      }
      
      if (foundComplaint) {
        setComplaint(foundComplaint);
        setLikeCount(foundComplaint.likes || 0);
        
        // Check if user has liked this complaint
        const userLikes = JSON.parse(localStorage.getItem('userLikes') || '[]');
        setIsLiked(userLikes.some(like => like.complaintId === id));
        
        // Load comments
        const allComments = JSON.parse(localStorage.getItem('complaintComments') || '{}');
        setComments(allComments[id] || []);
      }
      
      setLoading(false);
    };

    loadComplaint();
  }, [id]);

  const handleLike = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const newLikedState = !isLiked;
    if (newLikedState) {
      setLikeCount(prev => prev + 1);
      // Track user like
      const userLikes = JSON.parse(localStorage.getItem('userLikes') || '[]');
      const likeData = {
        id: `like-${Date.now()}`,
        complaintId: id,
        complaintTitle: complaint.title,
        company: complaint.company,
        timestamp: new Date().toISOString(),
        type: 'complaint'
      };
      userLikes.push(likeData);
      localStorage.setItem('userLikes', JSON.stringify(userLikes));
    } else {
      setLikeCount(prev => prev - 1);
      // Remove from user likes
      const userLikes = JSON.parse(localStorage.getItem('userLikes') || '[]');
      const filteredLikes = userLikes.filter(like => like.complaintId !== id);
      localStorage.setItem('userLikes', JSON.stringify(filteredLikes));
    }
    setIsLiked(newLikedState);
  };

  const handleAddComment = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!newComment.trim()) return;

    const comment = {
      id: `comment-${Date.now()}`,
      author: user.name || `${user.firstName} ${user.lastName}`,
      text: newComment,
      timestamp: new Date().toISOString(),
      avatar: user.name ? user.name.charAt(0).toUpperCase() : user.firstName.charAt(0).toUpperCase()
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);

    // Save to localStorage
    const allComments = JSON.parse(localStorage.getItem('complaintComments') || '{}');
    allComments[id] = updatedComments;
    localStorage.setItem('complaintComments', JSON.stringify(allComments));

    // Track user comment
    const userComments = JSON.parse(localStorage.getItem('userComments') || '[]');
    const commentData = {
      id: comment.id,
      complaintId: id,
      complaintTitle: complaint.title,
      company: complaint.company,
      text: newComment,
      timestamp: comment.timestamp,
      type: 'comment'
    };
    userComments.push(commentData);
    localStorage.setItem('userComments', JSON.stringify(userComments));

    setNewComment('');
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Gözləyir',
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          icon: '⏳'
        };
      case 'resolved':
        return {
          label: 'Həll olundu',
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          icon: '✅'
        };
      case 'in_progress':
        return {
          label: 'İcrada',
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          icon: '🔄'
        };
      default:
        return {
          label: status,
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          icon: '📋'
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Şikayət yüklənir...</p>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Şikayət tapılmadı</h3>
          <p className="text-gray-500 mb-4">Bu şikayət mövcud deyil və ya silinib.</p>
          <Link
            to="/complaints"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Şikayətlərə qayıt
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(complaint.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600">Ana səhifə</Link>
          <span>/</span>
          <Link to="/complaints" className="hover:text-blue-600">Şikayətlər</Link>
          <span>/</span>
          <span className="text-gray-900">#{complaint.id}</span>
        </nav>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{complaint.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="font-medium">{complaint.company}</span>
                  <span>•</span>
                  <span>{complaint.category}</span>
                  <span>•</span>
                  <span>{complaint.date}</span>
                  <span>•</span>
                  <span>#{complaint.id}</span>
                </div>
              </div>
              <div className={`flex items-center px-3 py-1.5 rounded-full text-sm font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                <span className="mr-1">{statusConfig.icon}</span>
                {statusConfig.label}
              </div>
            </div>

            {/* Rating */}
            {complaint.rating && (
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-gray-600">Reytinq:</span>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${
                        star <= complaint.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{complaint.rating}/5</span>
                </div>
              </div>
            )}

            {/* Author */}
            <div className="flex items-center space-x-3">
              <img
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                src={`https://api.dicebear.com/8.x/initials/svg?seed=${complaint.author}&backgroundColor=3b82f6,8b5cf6,ef4444,f59e0b,10b981`}
                alt={complaint.author}
              />
              <div>
                <p className="font-medium text-gray-900">{complaint.author}</p>
                <p className="text-sm text-gray-500">Şikayət müəllifi</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">{complaint.summary}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                    isLiked
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : 'text-gray-500 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200'
                  }`}
                >
                  <svg className={`w-5 h-5 transition-transform ${isLiked ? 'scale-110' : ''}`} fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{likeCount} Bəyənmə</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{comments.length} Şərh</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Şərhlər ({comments.length})</h3>
          </div>

          {/* Add Comment */}
          {isAuthenticated && (
            <div className="p-6 border-b border-gray-200">
              <div className="flex space-x-4">
                <img
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name || user.firstName}&backgroundColor=3b82f6`}
                  alt={user.name || user.firstName}
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Şərhinizi yazın..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="3"
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Şərh əlavə et
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className="divide-y divide-gray-200">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="p-6">
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">{comment.author}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.timestamp).toLocaleDateString('az-AZ')}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p>Hələ heç bir şərh yoxdur</p>
                {!isAuthenticated && (
                  <p className="mt-2">
                    <Link to="/login" className="text-blue-600 hover:text-blue-800">
                      Daxil olun
                    </Link>
                    {' '}və ilk şərhi siz yazın
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
