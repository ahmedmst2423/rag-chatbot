import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_API;

// === Public API instance ===
export const apiCall = axios.create({
  baseURL: BASE_URL,
});

// === Secure (auth-protected) API instance ===
export const secureAPI = axios.create({
  baseURL: BASE_URL,
});

// === Request Interceptor for apiCall ===
apiCall.interceptors.request.use((config) => {
  config.headers["X-FE-URL"] = window.location.href;
  return config;
});

// === Request Interceptor for secureAPI ===
secureAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); // change if using sessionStorage or cookies
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["X-FE-URL"] = window.location.href;
    return config;
  },
  (error) => Promise.reject(error)
);

// === Response Interceptor for apiCall (common logic)
const handleErrorResponse = async (error:any) => {
  console.log("API Response Error:", { error });

  // Handle Blob (e.g., application/octet-stream error bodies)
  if (error.response?.data instanceof Blob) {
    const message = await error.response.data.text();
    try {
      const messageObj = JSON.parse(message);
      return Promise.reject(messageObj);
    } catch {
      return Promise.reject(message);
    }
  }

  const errorMessage =
    error?.response?.data?.Message ??
    error?.response?.data ??
    error.message ??
    error;

  console.log({ errorMessage });
  return Promise.reject(errorMessage);
};

// Attach to both instances if needed
apiCall.interceptors.response.use((res) => res, handleErrorResponse);
secureAPI.interceptors.response.use((res) => res, handleErrorResponse);
