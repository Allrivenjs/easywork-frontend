import { useEffect, useState } from "react";

import { Box, Stack } from "@chakra-ui/react";

import ChatBubble from "./components/ChatBubble";
import { useCookies } from "react-cookie";

import { getChatConnection, getMyRooms } from "../../shared/services/chatServices";
import { IChatRoom } from "./interfaces";
import { useAuth } from "../../context/AuthContext";
import { IProfile, IUser } from "../../context/AuthContext/interfaces";

const ChatRoot = () => {
	const [cookies] = useCookies(["user-token"]);
	const [chatRooms, setChatRooms] = useState<Array<IChatRoom>>();

	const context = useAuth();

	const fetchChatData = async () => {
		const res = await getMyRooms(cookies["user-token"]);
		console.log(res)
		if(res) {
			setChatRooms(res);
		}
	};

	useEffect(() => {
		fetchChatData();
		const echo = getChatConnection(cookies["user-token"]);
		/*
		echo
			.private("chat-channel.1")
			.listen("MessageNotification", (e: any) => {
				console.log(e);
			})
		*/
		console.log("**ESCUCHANDO EVENTO APP.MODEL.USER");
		echo.private(`App.Models.User.${(((context?.user as IProfile)?.user as IUser)?.id)}`).notification((notification: any) => {
			console.log(notification);
		})
	}, [cookies]);

	return (
		<Box width="full" height="full" position="relative">
			<Stack spacing={64} direction="column">

				{
					chatRooms && chatRooms.map((room, index) => (
						<ChatBubble
							key={index}
							room={room}
							index={index}
						/>
					))
				}
			</Stack>
		</Box>
	);
};

export default ChatRoot;
