export const BASE_URL = () => {
  let url;

  if (import.meta.env.VITE_ENV === "development") {
    url = import.meta.env.VITE_BASE_URL;
  } else if (import.meta.env.VITE_ENV === "production") {
    url = import.meta.env.VITE_PRODUCTION_URL;
  } else {
    console.error("Invalid environment variable");
  }

  return url;
};
