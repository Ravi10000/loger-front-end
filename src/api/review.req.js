import api from "./index";

export const addReview = (review) => api.postForm("/review", review);
