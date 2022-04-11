import axios from 'axios';

const TOKEN_VALID_DURATION = 5 * 60 * 1000; // 5분

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/gogoboard/',
  withCredentials: true,
});

const refresh = async () => {
  console.log('hidden', document.hidden);
  console.log('document', document);
  // TODO: null 을 리턴하지 않고 처리할 방법 찾아보자
  if (document.hidden) {
    return;
  }
  return await axiosInstance.post('/users/auth/refresh/');
};

const handleSuccess = (response: any) => {
  const url = response.config.url;
  if (!url.includes('auth')) {
    return response;
  }

  console.log('setTimeout');
  setTimeout(refresh, TOKEN_VALID_DURATION - 60 * 1000);

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
  //refresh는 사용자가 인지하지 못하므로 오류메시지 불필요
  if (status >= 500 && status < 600 && !url.includes('refresh')) {
    alert('일시적인 오류입니다. 잠시 후 다시 시도해주세요.');
  } else if (
    (status === 400 || status === 401) &&
    (!url.includes('/users/auth') || url.includes('refresh'))
  ) {
    window.location.href = '/login';
    // TODO: 400 에러는 쿠키에 리프레쉬 토큰 자체가 없을 때 발생. 서버에서 401로 리턴해줄 수 있지 않을까?
    // TODO: refresh일때 그냥 통과시키는 처리 빼버렸는데 아예 빼는건 문제가 있으려나? App에서 호출하지 않고 setTimeout으로 호출했을 때는
    // 어떤 후처리가 필요하지? 정상일 땐 처리할 게 없지만 오류가 났다면 로그인 페이지로 이동하는 게 맞는 것 같은데..
  }
  console.error(error);
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(handleSuccess, handleError);

export { axiosInstance, refresh };
