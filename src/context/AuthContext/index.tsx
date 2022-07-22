import {
	createContext,
	ReactNode,
	useState,
	useEffect,
	useContext,
} from "react";

import { useCookies } from "react-cookie";
import { isAuthenticated } from "../../shared/services/authService";

import { IProfile } from "./interfaces";

interface AuthProviderProps {
	children: ReactNode;
}

interface IUserContext {
	user: IProfile | null | boolean;
	setUser: React.Dispatch<React.SetStateAction<IProfile | null | boolean>>;
}

export const AuthContext = createContext<IUserContext | null>(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if(!context) throw new Error("useAuth must be used within a AuthContextProvider");
	return context;
};

export const AuthProvider = (props: AuthProviderProps) => {
	const [cookies, , removeCookie] = useCookies(["user-token"]);

	const [authState, setAuthState] = useState<IProfile | null | boolean>(null);	// null = charging, UserData = auth, false = not auth

	useEffect(() => {
		const fetchUserData = async () => {
			setAuthState(null);
			const res = await isAuthenticated(cookies["user-token"]);
			console.log(res);
			if (res) {
				setAuthState(res);
			} else {
				setAuthState(false);
				removeCookie("user-token");
			}
		};
		fetchUserData();
	}, [cookies]);

	return (
		<AuthContext.Provider
			value={{
				user: authState,
				setUser: setAuthState,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
