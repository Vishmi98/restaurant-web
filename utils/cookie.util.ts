import Cookies from 'js-cookie';

import { LOCAL_STORE } from '@/constants/key';


export const getCookieToken = (): string | '' => {
  const cookieToken = Cookies.get(LOCAL_STORE.LOCAL_TOKEN);
  return cookieToken || ''
};