import {
  useContext, useCallback, useMemo, createContext,
} from 'react';
import axios from 'axios';

export const TokenContext = createContext(typeof window === 'undefined' ? null : sessionStorage.getItem('token'));
const useFTP = () => {
  const token = useContext(TokenContext);

  const extendConfig = useCallback((config) => ({ ...config, headers: { ...config?.headers, 'WWW-Authorization': token ? `Bearer ${token}` : null } }), [token]);
  const [getWithAuthorization] = useMemo(() => ['get'].map((method) => (url, config) => axios[method](url, extendConfig(config))), [extendConfig]);
  const [postWithAuthorization] = useMemo(() => ['post'].map((method) => (url, data, config) => axios[method](url, data, extendConfig(config))), [extendConfig]);

  const login = useCallback(async (user, password) => postWithAuthorization('/api/login', { user, password }), [postWithAuthorization]);
  const logout = useCallback(async () => getWithAuthorization('/api/logout'), [getWithAuthorization]);
  const upload = useCallback(async (body, config) => postWithAuthorization('/api/upload', body, config), [postWithAuthorization]);
  const list = useCallback(async (query) => getWithAuthorization('/api/list', { params: query }), [getWithAuthorization]);

  return useMemo(() => ({
    login,
    logout,
    upload,
    list,
    // I know that all of these callbacks are dependent on the token, and the token alone
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [token]);
};

export default useFTP;
