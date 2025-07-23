export const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: 'short',  // e.g., Jul
    day: 'numeric',  // e.g., 22
    year: 'numeric'  // e.g., 2025
  });
};
