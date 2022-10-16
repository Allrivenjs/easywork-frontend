
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
  RegisterUserState
} from '../shared/services/authService';

export const useAuth = () => {
  const { status } = useAppSelector( state => state.auth );
  const dispatch = useAppDispatch();

  const checkingAuthentication = async () => {
    dispatch( onCheckingCredentials() );
  };

  const startLoginUser = async (userLoginCredentials: LoginUserState) => {
    dispatch( onCheckingCredentials() );

    const token = await login(userLoginCredentials);
    console.log({ token });

/*
 *    if ( !ok ) return dispatch( logout({ errorMessage }) );
 *
 *    dispatch( login({ uid, displayName, email, photoURL }) );
 */
  };

  const startRegisterUser = async (userRegisterCredentials: RegisterUserState) => {
    dispatch( onCheckingCredentials() );

    const res = await register(userRegisterCredentials);

/*
 *    if ( !ok ) return dispatch( logout({ errorMessage }) );
 *
 *    dispatch( login({ uid, displayName, email, photoURL }) );
 */
  };


  return {
    status,

    // methods
    checkingAuthentication,
    startRegisterUser,
    startLoginUser,
  };
};
