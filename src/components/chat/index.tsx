import { useEffect } from "react";

import { Box, Stack } from "@chakra-ui/react";

import ChatBubble from "./components/ChatBubble";
import { useCookies } from "react-cookie";

import { useAuth } from "../../context/AuthContext";

const ChatRoot = () => {
	const [cookies] = useCookies(["user-token"]);

	const context = useAuth();

	useEffect(() => {
		/*
		echo.private(`App.Models.User.${(((context?.user as IProfile)?.user as IUser)?.id)}`).notification((notification: any) => {
			console.log(notification);
		})
		*/
	}, [cookies, context]);

	return (
		<Box width="full" height="full" position="relative">
			<Stack spacing={64} direction="column">
				{context.chatUserList.map((user, index) => (
					<ChatBubble
						key={index}
						user={user}
						index={index}
					/>
				))}
			</Stack>
		</Box>
	);
};

export default ChatRoot;
