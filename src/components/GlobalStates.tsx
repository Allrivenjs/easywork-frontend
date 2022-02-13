import {
	createContext,
	ReactNode,
	useState,
	useContext,
	useEffect,
} from "react";

// import { isAuthenticated } from "../services/AuthService";

// import { useCookies } from "react-cookie";

interface AuthProviderProps {
	children: ReactNode;
}

interface UserData {
	name: string;
	lastname: string;
	phone: string;
	profile_photo_path: string;
	email: string;
	birthday: string;
	created_at: string;
}

interface UserDataContext {
	data: UserData;
	setAuthData: React.Dispatch<React.SetStateAction<UserData>>;
}

export const AuthContext = createContext<UserDataContext | null>(null);

export const AuthProvider = (props: AuthProviderProps) => {
	const [authState, setAuthState] = useState<UserData>({
		name: "",
		lastname: "",
		phone: "",
		profile_photo_path: "",
		email: "",
		birthday: "",
		created_at: "",
	});

	return (
		<AuthContext.Provider
			value={{ data: authState, setAuthData: setAuthState }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
