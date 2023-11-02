export function calculateReviewMsg(rating) {
  if (rating >= 4.5) return "Excellent Reviews";
  if (rating >= 4) return "Very Good Reviews";
  if (rating >= 3.5) return "Good Reviews";
  if (rating >= 3) return "Average Reviews";
  if (rating >= 2.5) return "Below Average Reviews";
  if (rating >= 2) return "Poor Reviews";
}

export function totalReviews(ratings) {
  return [1, 2, 3, 4, 5].reduce((acc, cur) => acc + ratings[cur], 0);
}
