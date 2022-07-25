import {
	createContext,
	ReactNode,
	useState,
	useEffect,
	useContext,
} from "react";

import { useCookies } from "react-cookie";
import { IChatUser } from "../../components/chat/interfaces";
import { isAuthenticated } from "../../shared/services/authService";
import { getChatConnection } from "../../shared/services/chatServices";

import { IProfile } from "./interfaces";

interface AuthProviderProps {
	children: ReactNode;
}

interface IUserContext {
	user: IProfile | null | boolean;
	setUser: React.Dispatch<React.SetStateAction<IProfile | null | boolean>>;
	chatUserList: Array<IChatUser>;
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
	const [chatUserList, setChatUserList] = useState<Array<IChatUser>>([]);

	useEffect(() => {
		const fetchUserData = async () => {
			setAuthState(null);
			const res = await isAuthenticated(cookies["user-token"]);
			// console.log(res);
			if (res) {
				setAuthState(res);

				console.log("**CHAT INICIALIZADO**");
				const echo = getChatConnection(cookies["user-token"]);
				echo
					.join("channel-session")
					.here((users: Array<IChatUser>) => {
						console.log("you just joined");
						console.log(users);
						setChatUserList(users.filter((user) => user.id !== (res.user as IProfile).id));
					})
					.joining((user: IChatUser) => {
						console.log("a user has joined: ", user.name);
						setChatUserList((prevUserList) => [...prevUserList, user]);
					})
					.leaving((user: IChatUser) => {
						console.log("user leaved: ", user.name);
						setChatUserList(chatUserList.filter((item: IChatUser) => item.id !== user.id));
					})
					/*
					.error((error: any) => {
						console.log("error with echo: ", error);
					});
					*/

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
				chatUserList: chatUserList,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
