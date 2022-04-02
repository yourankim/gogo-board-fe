import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/gogoboard/',
  withCredentials: true,
});

const handleSuccess = (response: any) => {
  if (response.data.accessToken) {
    const { accessToken } = response.data;
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`;
  }

  return response;
};

const handleError = (error: any) => {
  if (error.response.status >= 500 && error.response.status < 600) {
    alert('일시적인 오류입니다. 잠시 후 다시 시도해주세요.');
  }
  console.error(error);
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(handleSuccess, handleError);

export { axiosInstance };
