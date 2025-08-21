import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ComplaintCard = ({ title, company, author, date, summary, status = 'pending', likes = 0, comments = 0, onLike, onComment, complaintId }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [activeReplyId, setActiveReplyId] = useState(null);

  // Generate unique comments for each complaint based on complaintId
  const generateUniqueComments = (id) => {
    const commentSets = [
      // For internet/telecom complaints
      [
        {
          id: `${id}-comment1`,
          author: 'Ali Məmmədov',
          text: 'Mənim də eyni problem var. Çox pis xidmət.',
          time: '2 saat əvvəl',
          avatar: 'A',
          replies: []
        },
        {
          id: `${id}-comment2`,
          author: 'Leyla Həsənova',
          text: 'Siz müştəri xidmətlərinə müraciət etmisiniz?',
          time: '5 saat əvvəl',
          avatar: 'L',
          replies: []
        }
      ],
      // For food delivery complaints
      [
        {
          id: `${id}-comment1`,
          author: 'Rəşad Əliyev',
          text: 'Mən də bu restoranla problem yaşamışam. Sifarişim gecikdi.',
          time: '3 saat əvvəl',
          avatar: 'R',
          replies: []
        },
        {
          id: `${id}-comment2`,
          author: 'Səbinə Qasımova',
          text: 'Bu çatdırılma xidməti həqiqətən yaxşılaşmalıdır.',
          time: '6 saat əvvəl',
          avatar: 'S',
          replies: []
        }
      ],
      // For shopping complaints
      [
        {
          id: `${id}-comment1`,
          author: 'Kamran Əliyev',
          text: 'Bu problem həll edilməlidir. Çox ciddi məsələdir.',
          time: '1 saat əvvəl',
          avatar: 'K',
          replies: []
        },
        {
          id: `${id}-comment2`,
          author: 'Nigar Həsənova',
          text: 'Mən də oxşar təcrübə yaşamışam. Pul geri qaytarılmadı.',
          time: '4 saat əvvəl',
          avatar: 'N',
          replies: []
        }
      ],
      // For banking complaints
      [
        {
          id: `${id}-comment1`,
          author: 'Elvin Məmmədov',
          text: 'Bank xidmətləri həqiqətən yaxşılaşmalıdır.',
          time: '2 saat əvvəl',
          avatar: 'E',
          replies: []
        }
      ],
      // For mobile operator complaints
      [
        {
          id: `${id}-comment1`,
          author: 'Aynur Əliyeva',
          text: 'İnternet sürəti həqiqətən çox zəifdir.',
          time: '1 saat əvvəl',
          avatar: 'A',
          replies: []
        },
        {
          id: `${id}-comment2`,
          author: 'Tural Quliyev',
          text: 'Müqavilədə yazılan sürət verilmir.',
          time: '3 saat əvvəl',
          avatar: 'T',
          replies: []
        }
      ]
    ];

    // Use complaintId to determine which comment set to use
    const hash = complaintId ? complaintId.split('').reduce((a, b) => a + b.charCodeAt(0), 0) : 0;
    return commentSets[hash % commentSets.length];
  };

  const [commentsList, setCommentsList] = useState(() => generateUniqueComments(complaintId));
  const [commentCount, setCommentCount] = useState(commentsList.length);

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
        complaintId: complaintId,
        complaintTitle: title,
        company: company,
        timestamp: new Date().toISOString(),
        type: 'complaint'
      };
      userLikes.push(likeData);
      localStorage.setItem('userLikes', JSON.stringify(userLikes));
    } else {
      setLikeCount(prev => prev - 1);
      // Remove from user likes
      const userLikes = JSON.parse(localStorage.getItem('userLikes') || '[]');
      const filteredLikes = userLikes.filter(like => like.complaintId !== complaintId);
      localStorage.setItem('userLikes', JSON.stringify(filteredLikes));
    }
    setIsLiked(newLikedState);
    if (onLike) onLike();
  };

  const handleCommentToggle = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setShowComments(!showComments);
    if (onComment) onComment();
  };

  const handleAddMessage = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (messageText.trim()) {
      if (activeReplyId) {
        // Adding a reply
        const replyData = {
          id: `reply-${Date.now()}-${complaintId}`,
          author: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.name || 'Siz',
          text: messageText,
          time: 'İndi',
          avatar: user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'S'
        };

        setCommentsList(prevComments =>
          prevComments.map(comment => {
            if (comment.id === activeReplyId) {
              return {
                ...comment,
                replies: [...comment.replies, replyData]
              };
            }
            return comment;
          })
        );
        setActiveReplyId(null);

        // Track user reply
        const userComments = JSON.parse(localStorage.getItem('userComments') || '[]');
        const commentData = {
          id: replyData.id,
          complaintId: complaintId,
          complaintTitle: title,
          company: company,
          text: messageText,
          timestamp: new Date().toISOString(),
          type: 'reply',
          parentCommentId: activeReplyId
        };
        userComments.push(commentData);
        localStorage.setItem('userComments', JSON.stringify(userComments));
      } else {
        // Adding a new comment
        const newComment = {
          id: `comment-${Date.now()}-${complaintId}`,
          author: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.name || 'Siz',
          text: messageText,
          time: 'İndi',
          avatar: user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'S',
          replies: []
        };

        setCommentsList(prev => [...prev, newComment]);
        setCommentCount(prev => prev + 1);

        // Track user comment
        const userComments = JSON.parse(localStorage.getItem('userComments') || '[]');
        const commentData = {
          id: newComment.id,
          complaintId: complaintId,
          complaintTitle: title,
          company: company,
          text: messageText,
          timestamp: new Date().toISOString(),
          type: 'comment'
        };
        userComments.push(commentData);
        localStorage.setItem('userComments', JSON.stringify(userComments));
      }

      setMessageText('');
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'resolved':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          label: 'Cavablandırılıb',
          icon: '✓'
        };
      case 'pending':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          label: 'Gözləyir',
          icon: '⏳'
        };
      case 'in_progress':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          label: 'Gözləyir',
          icon: '⏳'
        };
      default:
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          label: 'Gözləyir',
          icon: '⏳'
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group w-full max-w-none">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-4">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
              {title}
            </h3>
            <p className="text-sm font-medium text-gray-500">
              <span className="font-semibold text-gray-700">{company}</span> üçün
            </p>
          </div>
          <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} whitespace-nowrap`}>
            {statusConfig.icon && <span className="mr-1">{statusConfig.icon}</span>}
            {statusConfig.label}
          </div>
        </div>

        <p className="text-gray-600 text-base line-clamp-3 leading-relaxed mb-4">
          {summary}
        </p>

        <div className="text-xs text-gray-500 font-medium">
          {date}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
              src={`https://api.dicebear.com/8.x/initials/svg?seed=${author}&backgroundColor=3b82f6,8b5cf6,ef4444,f59e0b,10b981`}
              alt={author}
            />
            <span className="text-sm font-medium text-gray-700">{author}</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                isLiked
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'text-gray-500 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200'
              }`}
            >
              <svg className={`w-4 h-4 transition-transform ${isLiked ? 'scale-110' : ''}`} fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{likeCount}</span>
            </button>
            <button
              onClick={handleCommentToggle}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                showComments
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-200'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{commentCount}</span>
            </button>
          </div>
        </div>

        {showComments && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-4">
              {commentsList.map((comment) => (
                <div key={comment.id} className="bg-white p-3 rounded-lg border">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                      {comment.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 break-words">
                        {comment.text}
                      </p>
                      <button
                        onClick={() => {
                          if (!isAuthenticated) {
                            navigate('/login');
                            return;
                          }
                          setActiveReplyId(activeReplyId === comment.id ? null : comment.id);
                        }}
                        className="text-xs text-blue-600 hover:text-blue-800 mt-2 font-medium"
                      >
                        Cavab ver
                      </button>

                      {/* Show replies */}
                      {comment.replies.length > 0 && (
                        <div className="ml-4 mt-3 space-y-2 border-l-2 border-gray-200 pl-3">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start space-x-2">
                              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                                {reply.avatar}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-xs text-gray-900">{reply.author}</span>
                                  <span className="text-xs text-gray-500">{reply.time}</span>
                                </div>
                                <p className="text-xs text-gray-700 break-words">
                                  {reply.text}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Single message input for both comments and replies */}
            <div className="mt-4 p-3 bg-white rounded-lg border">
              {activeReplyId && (
                <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      <span className="text-sm text-blue-700 font-medium">
                        {commentsList.find(c => c.id === activeReplyId)?.author} şərhinə cavab yazırsınız
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveReplyId(null)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={
                  !isAuthenticated
                    ? "Şərh yazmaq üçün giriş edin"
                    : activeReplyId
                      ? "Cavabınızı yazın..."
                      : "Şikayət haqqında rəyinizi yazın..."
                }
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows="3"
                disabled={!isAuthenticated}
              />
              <div className="flex justify-end items-center mt-3">
                <button
                  onClick={handleAddMessage}
                  disabled={!isAuthenticated || !messageText.trim()}
                  className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {activeReplyId ? 'Cavab Ver' : 'Şərh Yaz'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintCard;