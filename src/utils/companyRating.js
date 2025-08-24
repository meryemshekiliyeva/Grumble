// Utility functions for calculating company ratings

// Calculate average rating from reviews
export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  
  const validReviews = reviews.filter(review => review.rating && review.rating > 0);
  if (validReviews.length === 0) return 0;
  
  const sum = validReviews.reduce((total, review) => total + review.rating, 0);
  return Math.round((sum / validReviews.length) * 10) / 10; // Round to 1 decimal place
};

// Get company rating from localStorage reviews
export const getCompanyRating = (companyId) => {
  const allReviews = JSON.parse(localStorage.getItem('companyReviews') || '{}');
  const companyReviews = allReviews[companyId] || [];
  return calculateAverageRating(companyReviews);
};

// Update company rating when a new review is added
export const updateCompanyRating = (companyId, newReview) => {
  const allReviews = JSON.parse(localStorage.getItem('companyReviews') || '{}');
  
  if (!allReviews[companyId]) {
    allReviews[companyId] = [];
  }
  
  // Add the new review
  allReviews[companyId].push(newReview);
  
  // Save back to localStorage
  localStorage.setItem('companyReviews', JSON.stringify(allReviews));
  
  // Calculate and return new average rating
  return calculateAverageRating(allReviews[companyId]);
};

// Get all companies with their calculated ratings
export const getCompaniesWithRatings = (companies) => {
  return companies.map(company => {
    const rating = getCompanyRating(company.id || company.name.toLowerCase().replace(/\s+/g, '-'));
    return {
      ...company,
      rating: rating
    };
  });
};

// Get review statistics for a company
export const getCompanyReviewStats = (companyId) => {
  const allReviews = JSON.parse(localStorage.getItem('companyReviews') || '{}');
  const companyReviews = allReviews[companyId] || [];
  
  const stats = {
    totalReviews: companyReviews.length,
    averageRating: calculateAverageRating(companyReviews),
    ratingDistribution: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    }
  };
  
  // Calculate rating distribution
  companyReviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      stats.ratingDistribution[Math.floor(review.rating)]++;
    }
  });
  
  return stats;
};
