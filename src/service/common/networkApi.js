import { SERVER_URL } from 'service/consts';
import createApi from './commonApi';
import multiApi from './multipartApi';

const networkApi = createApi(SERVER_URL);
const multipApi = multiApi(SERVER_URL);

export { networkApi, multipApi };
