// This file contains the JavaScript code that handles the functionality of the registered companies reviews page.

document.addEventListener('DOMContentLoaded', function() {
    const reviewCountElement = document.getElementById('reviewCount');
    const reviewHistoryElement = document.getElementById('reviewHistory');
    const scoreElement = document.getElementById('score');
    const timeFrameSelect = document.getElementById('timeFrameSelect');

    // Sample data for demonstration purposes
    const reviews = [
        { date: '2023-10-01', score: 4, accepted: true },
        { date: '2023-10-02', score: 5, accepted: true },
        { date: '2023-10-03', score: 3, accepted: false },
        { date: '2023-10-04', score: 4, accepted: true },
        { date: '2023-10-05', score: 2, accepted: true },
    ];

    function calculateAcceptedReviews() {
        return reviews.filter(review => review.accepted).length;
    }

    function calculateScore() {
        const acceptedReviews = reviews.filter(review => review.accepted);
        const totalScore = acceptedReviews.reduce((sum, review) => sum + review.score, 0);
        return acceptedReviews.length ? (totalScore / acceptedReviews.length).toFixed(1) : 0;
    }

    function getReviewHistory(timeFrame) {
        const now = new Date();
        const filteredReviews = reviews.filter(review => {
            const reviewDate = new Date(review.date);
            switch (timeFrame) {
                case 'daily':
                    return reviewDate.toDateString() === now.toDateString();
                case 'weekly':
                    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
                    return reviewDate >= weekStart;
                case 'monthly':
                    return reviewDate.getMonth() === now.getMonth() && reviewDate.getFullYear() === now.getFullYear();
                case 'yearly':
                    return reviewDate.getFullYear() === now.getFullYear();
                default:
                    return false;
            }
        });
        return filteredReviews;
    }

    function updateReviewHistory() {
        const selectedTimeFrame = timeFrameSelect.value;
        const history = getReviewHistory(selectedTimeFrame);
        reviewHistoryElement.innerHTML = history.map(review => `<li>${review.date}: Score ${review.score}</li>`).join('');
    }

    function updateUI() {
        reviewCountElement.textContent = calculateAcceptedReviews();
        scoreElement.textContent = calculateScore();
        updateReviewHistory();
    }

    timeFrameSelect.addEventListener('change', updateReviewHistory);

    // Initial UI update
    updateUI();
});