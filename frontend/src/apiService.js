import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const postToBackend = async (endpoint, data) => {
    try {
        console.log(`Sending to: ${BASE_URL}${endpoint}`);
        const response = await axios.post(`${BASE_URL}${endpoint}`, data);

        console.log("Expense data sent to backend successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending expense data to backend:", error);

        if(error.response) { //request was made and server responded with a status code
            console.error("Backend responded with an error:", error.response.data);
            console.error("Status code:", error.response.status);
        } else if (error.request) { // the request was made but no response was received
            console.error("No response received from backend:", error.request);
        } else {
            console.error("Error setting up the request:", error.message);
        }

        throw error; // Re-throw the error for further handling if needed
    }
}; 