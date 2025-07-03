import axios from "axios";
const API_URL = "https://courier-backend-xrgx.onrender.com/api";
console.log(API_URL, "API_URL from env");
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // The request was made and the server responded with a status code
      const data = error.response.data;
      if (data && data.message) {
        let message = data.message;
        if (Array.isArray(message)) {
          let messages = message.map((msg: string) => {
            return {
              name: msg.split(" ")[0].toLocaleLowerCase(),
              message: msg,
            };
          });

          error.response.data.messages = messages;
        }
      } else {
        // Otherwise, log a generic error message
        console.error("An error occurred while processing your request.");
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
