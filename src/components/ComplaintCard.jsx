import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ComplaintCard = ({ title, company, author, date, summary, status = 'pending', likes = 0, comments = 0, onLike, onComment }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [commentsList, setCommentsList] = useState([
    {
      id: 'comment1',
      author: 'Ali Məmmədov',
      text: 'Mənim də eyni problem var. Çox pis xidmət.',
      time: '2 saat əvvəl',
      avatar: 'A',
      replies: []
    },
    {
      id: 'comment2',
      author: 'Leyla Həsənova',
      text: 'Siz müştəri xidmətlərinə müraciət etmisiniz?',
      time: '5 saat əvvəl',
      avatar: 'L',
      replies: []
    }
  ]);
  const [commentCount, setCommentCount] = useState(commentsList.length);

  const handleLike = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
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

  const handleAddComment = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (commentText.trim()) {
      const newComment = {
        id: `comment-${Date.now()}`,
        author: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.name || 'Siz',
        text: commentText,
        time: 'İndi',
        avatar: user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'S',
        replies: []
      };

      setCommentsList(prev => [...prev, newComment]);
      setCommentText('');
    }
  };

  const handleReply = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (replyText.trim() && activeReplyId) {
      const addReplyToComment = (comments) => {
        return comments.map(comment => {
          if (comment.id === activeReplyId) {
            return {
              ...comment,
              replies: [...comment.replies, {
                id: `reply-${Date.now()}`,
                author: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.name || 'Siz',
                text: replyText,
                time: 'İndi',
                avatar: user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'S'
              }]
            };
          }
          // Also check in replies for nested replies
          if (comment.replies.length > 0) {
            return {
              ...comment,
              replies: addReplyToComment(comment.replies)
            };
          }
          return comment;
        });
      };

      setCommentsList(addReplyToComment);
      setReplyText('');
      setActiveReplyId(null);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'resolved':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          label: 'Həll edilib',
          icon: '✓'
        };
      case 'pending':
        return null; // Don't show status for pending
      case 'in_progress':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          label: 'İcrada',
          icon: '🔄'
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          label: 'Yeni',
          icon: '📝'
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
          {statusConfig && (
            <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} whitespace-nowrap`}>
              {statusConfig.icon && <span className="mr-1">{statusConfig.icon}</span>}
              {statusConfig.label}
            </div>
          )}
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
            <div className="space-y-3">
              {commentsList.map((comment) => (
                <div key={comment.id}>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
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
                        className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                      >
                        Cavab ver
                      </button>

                      {/* Show replies */}
                      {comment.replies.length > 0 && (
                        <div className="ml-4 mt-2 space-y-2">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start space-x-2">
                              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-medium">
                                {reply.author.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-xs">{reply.author}</span>
                                  <span className="text-xs text-gray-500">{reply.time}</span>
                                </div>
                                <p className="text-xs text-gray-700 mt-1">
                                  {reply.text}
                                </p>
                                <button
                                  onClick={() => {
                                    if (!isAuthenticated) {
                                      navigate('/login');
                                      return;
                                    }
                                    setActiveReplyId(activeReplyId === reply.id ? null : reply.id);
                                  }}
                                  className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                                >
                                  Cavab ver
                                </button>
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

            {/* Main comment input */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={isAuthenticated ? "Şikayət haqqında rəyinizi yazın..." : "Şərh yazmaq üçün giriş edin"}
                className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                disabled={!isAuthenticated}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={handleAddComment}
                  disabled={!isAuthenticated || !commentText.trim()}
                  className="px-4 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Şərh Yaz
                </button>
              </div>
            </div>

            {/* Reply input */}
            {activeReplyId && (
              <div className="mt-4 p-3 bg-white rounded-lg border">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Cavabınızı yazın..."
                  className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => setActiveReplyId(null)}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Ləğv et
                  </button>
                  <button
                    onClick={handleReply}
                    className="px-4 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                  >
                    Göndər
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintCard;