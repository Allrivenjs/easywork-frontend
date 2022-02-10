import {
	createContext,
	ReactNode,
	useState,
	useContext,
	useEffect,
} from "react";

import { isAuthenticated } from "../services/AuthService";

import { useCookies } from "react-cookie";

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
	setAuthData: Function;
}

export const AuthContext = createContext<UserDataContext>({
	data: {
		name: "",
		lastname: "",
		phone: "",
		profile_photo_path: "",
		email: "",
		birthday: "",
		created_at: "",
	},
	setAuthData: function () {},
});

export const AuthProvider = (props: AuthProviderProps) => {

	const [cookies] = useCookies(["user-token"]);

	const [authState, setAuthState] = useState<UserData>({
		name: "",
		lastname: "",
		phone: "",
		profile_photo_path: "",
		email: "",
		birthday: "",
		created_at: "",
	});

	const getUserData = async () => {
		const res = await isAuthenticated(cookies["user-token"]);
		console.log(res);
		if (res) {

		} else {

		}
	};

	useEffect(() => {
		getUserData();
	});

	return (
		<AuthContext.Provider
			value={{ data: authState, setAuthData: setAuthState }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
