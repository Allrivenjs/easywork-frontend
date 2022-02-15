import {
	createContext,
	ReactNode,
	useState,
	useEffect,
} from "react";

import { isAuthenticated } from "../services/authService";

import { useCookies } from "react-cookie";


interface Profile {
	id: number
	about: string;
	ranking: number;
	slug: string;
	user_id: string;
	created_at: string;
}
interface AuthProviderProps {
	children: ReactNode;
}

export interface UserData {
	state: string;
	name: string;
	lastname: string;
	phone: string;
	profile_photo_path: string;
	email: string;
	birthday: string;
	created_at: string;
	profile: Profile;
}

interface UserDataContext {
	userData: UserData | null;
	setAuthData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export const AuthContext = createContext<UserDataContext | null>(null);

export const AuthProvider = (props: AuthProviderProps) => {
	const [cookies, ,removeCookie] = useCookies(["user-token"]);

	const [authState, setAuthState] = useState<UserData | null>(null);	// null = charging, UserData = logged, false = un logged

	useEffect(() => {
		const fetchUserData = async () => {
			setAuthState(null);
			const res = await isAuthenticated(cookies["user-token"]);
			console.log(res);
			if (res) {
				setAuthState({
					state: 'auth',
					name: res.name,
					lastname: res.lastname,
					phone: res.phone,
					profile_photo_path: res.profile_photo_path,
					email: res.email,
					birthday: res.birthday,
					created_at: res.created_at,
					profile: {
						id: res.profile.id,
						about: res.profile.about,
						ranking: res.profile.ranking,
						slug: res.profile.slug,
						user_id: res.profile.user_id,
						created_at: res.profile.created_at,
					},
				});
			} else {
				setAuthState({
					state: 'notAuth',
					name: "",
					lastname: "",
					phone: "",
					profile_photo_path: "",
					email: "",
					birthday: "",
					created_at: "",
					profile: {
						id: 0,
						about: "",
						ranking: 0,
						slug: "",
						user_id: "",
						created_at: "",
					},
				});
				removeCookie("user-token");
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
