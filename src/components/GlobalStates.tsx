import { createContext, ReactNode, useState } from "react";

interface AuthProviderProps {
	children: ReactNode;
};

interface UserData {
	name: string;
	lastname: string;
	phone: string;
	profile_photo_path: string;
	email: string;
	birthday: string;
	created_at: string;
};

interface UserDataContext {
	data: UserData;
	setAuthData: Function;
};

export const AuthContext = createContext<UserDataContext>({
	data:{
		name: "",
		lastname: "",
		phone: "",
		profile_photo_path: "",
		email: "",
		birthday: "",
		created_at: "",
	},
	setAuthData: function() {},
});

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

	return(
		<AuthContext.Provider value={{data: authState, setAuthData: setAuthState}}>
			{props.children}
		</AuthContext.Provider>
	);
};
