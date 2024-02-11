export const APP_NAME = 'Limo';
export const LOCAL_STORAGE_NAME = 'user';
// export const baseUrl = 'http://localhost:3001';
export const baseUrl = (import.meta.env.VITE_NODE_ENV === 'production') ? import.meta.env.VITE_BASE_URL: 'http://localhost:3001';
export const API_URL = baseUrl + '/api/v1/'