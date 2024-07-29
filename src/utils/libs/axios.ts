import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com", // Замените на ваш реальный API URL
    withCredentials: false,
});

const sendCheckInData = async (data: {
    userId: number;
    timestamp: string;
    latitude: number;
    longitude: number;
}) => {
    try {
        const response = await axiosInstance.post('/check-in', data);
        return response.data;
    } catch (error) {
        console.error('Error sending check-in data:', error);
        throw error;
    }
};

const sendCheckOutData = async (data: {
    userId: number;
    timestamp: string;
    latitude: number;
    longitude: number;
}) => {
    try {
        const response = await axiosInstance.post('/check-out', data);
        return response.data;
    } catch (error) {
        console.error('Error sending check-out data:', error);
        throw error;
    }
};

export { axiosInstance as default, sendCheckInData, sendCheckOutData };