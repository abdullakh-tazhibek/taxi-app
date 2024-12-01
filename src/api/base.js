import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
});

{
  /* 
  baseURL: "http://192.168.8.1/",
  baseURL: "http://localhost:3000/api/v1/",
   */
}

// Intercept requests to attach token
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Refresh token logic
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Handle 501 error
    if (error.response && error.response.status === 501) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        // Redirect to login or handle unauthorized state
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { data } = await axios.post(
            "https://your-api-url.com/refresh",
            {
              refreshToken,
            }
          );

          const newToken = data.token;
          localStorage.setItem("token", newToken);

          isRefreshing = false;
          processQueue(null, newToken);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (err) {
          isRefreshing = false;
          processQueue(err, null);

          // If refresh fails, clear tokens and redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(err);
        }
      }

      // Queue failed requests while refreshing
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    return Promise.reject(error); // Pass through other errors
  }
);

export default api;
