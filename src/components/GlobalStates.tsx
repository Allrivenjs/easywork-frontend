import {
	createContext,
	ReactNode,
	useState,
	useEffect,
} from "react";

import { isAuthenticated } from "../services/AuthService";

import { useCookies } from "react-cookie";

interface AuthProviderProps {
	children: ReactNode;
}

export interface UserData {
	name: string;
	lastname: string;
	phone: string;
	profile_photo_path: string;
	email: string;
	birthday: string;
	created_at: string;
}

interface UserDataContext {
	userData: UserData | null | boolean;
	setAuthData: React.Dispatch<React.SetStateAction<UserData | null | boolean>>;
}

export const AuthContext = createContext<UserDataContext | null>(null);

export const AuthProvider = (props: AuthProviderProps) => {
	const [cookies] = useCookies(["user-token"]);

	const [authState, setAuthState] = useState<UserData | null | boolean>(null);	// null = charging, UserData = logged, false = un logged

	useEffect(() => {
		const fetchUserData = async () => {
			setAuthState(null);
			const res = await isAuthenticated(cookies["user-token"]);
			if (res) {
				setAuthState({
					name: res.name,
					lastname: res.lastname,
					phone: res.phone,
					profile_photo_path: res.profile_photo_path,
					email: res.email,
					birthday: res.birthday,
					created_at: res.created_at,
				});
			} else {
				setAuthState(false);
			}
		};
		fetchUserData();
	}, [cookies]);

	return (
		<AuthContext.Provider
			value={{
				userData: authState,
				setAuthData: setAuthState,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
