
import {
  useAppDispatch,
  useAppSelector,
} from '../store/hooks';

import {
  onCheckingCredentials,
  onLogout,
  onLogin,
} from '../store/auth';

import {
  register,
  login,
  LoginUserState,
  RegisterUserState,
  isAuthenticated,
  logout
} from '../shared/services/authService';

import { useCookies } from 'react-cookie';

export const useAuthStore = () => {
  const { status, userProfile } = useAppSelector( state => state.auth );
  const dispatch = useAppDispatch();

  const [cookies, setCookie, removeCookie] = useCookies(['user-token']);

  const checkingAuthentication = async () => {
    dispatch( onCheckingCredentials() );
  };

  const startLoginUser = async (userLoginCredentials: LoginUserState) => {
    removeCookie('user-token');
    dispatch( onCheckingCredentials() );
    // TODO: decirle a jaime flaco que la ruta login retorne el perfil de usuario y no el usuario
    const res = await login(userLoginCredentials);

    if (!res.ok) {
      dispatch( onLogout() );
      return {
        ok: res.ok,
        msg: res.msg,
      };
    };

    setCookie('user-token', res.token);
    // TODO: cambiar esto por dispatch( onLogin(res.user) );
    return {
      ok: await checkAuthToken(),
      msg: res.msg
    };
  };

  const startRegisterUser = async (userRegisterCredentials: RegisterUserState) => {
    removeCookie('user-token');
    dispatch( onCheckingCredentials() );

    // TODO: decirle a jaime flaco que la ruta login retorne el perfil de usuario y no el usuario
    const res = await register(userRegisterCredentials);
    console.log(res)

    if (!res.ok) {
      dispatch( onLogout() );
      return {
        ok: res.ok,
        msg: res.msg,
      };
    };

    setCookie('user-token', res.token);
    // TODO: cambiar esto por dispatch( onLogin(res.user) );
    return {
      ok: await checkAuthToken(),
      msg: res.msg
    };
  };

  const startLogout = async () => {
    dispatch( onCheckingCredentials() );
    const res = await logout();
    if (res.ok) {
      removeCookie('user-token');
      dispatch( onLogout() );
    };
  };

  const checkAuthToken = async () => {
    const token = cookies['user-token'];
    if (!token) {
      dispatch( onLogout() );
      return;
    };

    const res = await isAuthenticated();

    if (res.ok) {
      dispatch( onLogin(res.user) );
      return res.ok;
    };

    dispatch( onLogout() );
  };


  return {
    // properties
    status,
    cookies,
    userProfile,

    // methods
    checkingAuthentication,
    startRegisterUser,
    startLoginUser,
    checkAuthToken,
    startLogout,
  };
};
