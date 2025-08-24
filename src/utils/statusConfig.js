// Centralized status configuration for complaints
export const getStatusConfig = (status) => {
  switch (status) {
    case 'pending':
      return {
        label: 'Gözləyir',
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        border: 'border-yellow-200',
        icon: '⏳'
      };
    case 'in_progress':
    case 'in-progress':
      return {
        label: 'İcradadır',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        icon: '🔄'
      };
    case 'resolved':
      return {
        label: 'Həll edilib',
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200',
        icon: '✅'
      };
    case 'rejected':
      return {
        label: 'Rədd edilib',
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        icon: '❌'
      };
    case 'closed':
      return {
        label: 'Bağlanıb',
        bg: 'bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-200',
        icon: '🔒'
      };
    default:
      return {
        label: 'Gözləyir',
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        border: 'border-yellow-200',
        icon: '⏳'
      };
  }
};

// Status priority for sorting (higher number = higher priority)
export const getStatusPriority = (status) => {
  switch (status) {
    case 'pending':
      return 5;
    case 'in_progress':
    case 'in-progress':
      return 4;
    case 'resolved':
      return 3;
    case 'rejected':
      return 2;
    case 'closed':
      return 1;
    default:
      return 0;
  }
};

// Sort complaints by date (newest first) and then by status priority
export const sortComplaints = (complaints) => {
  return [...complaints].sort((a, b) => {
    // First sort by date (newest first)
    const dateA = new Date(a.date || a.createdAt || 0);
    const dateB = new Date(b.date || b.createdAt || 0);
    
    if (dateB.getTime() !== dateA.getTime()) {
      return dateB.getTime() - dateA.getTime();
    }
    
    // If dates are equal, sort by status priority
    return getStatusPriority(b.status) - getStatusPriority(a.status);
  });
};
