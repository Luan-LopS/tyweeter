export const getAuthHeaders = (headers: Headers) => {
  const token = localStorage.getItem('access');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};