import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://attendance-backend-24xu.onrender.com/api/v1",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция для проверки срока действия токена
function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = atob(payloadBase64);
    const decoded = JSON.parse(decodedJson);
    const exp = decoded.exp;
    const currentTime = Date.now() / 1000;
    return exp < currentTime;
  } catch (error) {
    console.error('Ошибка при проверке срока действия токена:', error);
    return true;
  }
}

// Интерцептор запросов
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('access_token');
  
  if (token && config.url !== "sign-in") {
    if (isTokenExpired(token)) {
      console.warn('Токен истек. Необходимо обновление.');
      // Здесь можно добавить логику обновления токена
    } else {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Токен добавлен в заголовок запроса');
    
    }
  }

  // console.log('Отправляемый запрос:', config);
  // console.log('URL запроса:', config.url);
  // console.log('Метод запроса:', config.method);
  // console.log('Данные запроса:', config.data);
  // console.log('Заголовки запроса:', config.headers);

  return config;
}, (error: AxiosError) => {
  console.error('Ошибка при подготовке запроса:', error);
  return Promise.reject(error);
});

// Интерцептор ответов
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log('Получен ответ:', response);
    // console.log('Статус ответа:', response.status);
    // console.log('Данные ответа:', response.data);
    return response;
  },
  (error: AxiosError) => {
    console.error('Ошибка ответа:', error);
    if (error.response) {
      // console.error('Статус ответа:', error.response.status);
      // console.error('Данные ответа:', error.response.data);

      if (error.response.status === 401) {
        // console.error('Ошибка аутентификации. Возможно, токен недействителен или истек.');
        localStorage.removeItem('access_token');
        // Здесь можно добавить логику для выхода из системы или обновления токена
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;