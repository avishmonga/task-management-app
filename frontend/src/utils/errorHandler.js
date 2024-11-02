export const handleError = (error) => {
  console.error('Error:', error);
  alert(`An error occurred: ${error.message || 'Something went wrong!'}`);
};
