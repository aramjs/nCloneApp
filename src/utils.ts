export const getURL = (path: string) =>
  `${import.meta.env.VITE_BASE_API_URL}${path}`;
