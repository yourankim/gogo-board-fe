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
  const status = error.response.status;
  const url = error.config.url;
  if (status >= 500 && status < 600) {
    alert('일시적인 오류입니다. 잠시 후 다시 시도해주세요.');
  } else if (status === 401 && !url.includes('/users/auth')) {
    window.location.href = '/login';
  } else if (status === 401 && url.includes('refresh')) {
    // TODO: 여기서 그냥 통과시키면 isLoggedIn 상태를 바꾸지 못하는 것 아닌가? 인증 상태 처리하는 부분을 다 모아서 정리를 다시 해보자.
    return Promise.resolve(error.response);
  }
  console.error(error);
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(handleSuccess, handleError);

export { axiosInstance };
