import React, { useContext, useState } from "react";

import { Avatar, Box, IconButton, Stack } from "@chakra-ui/react";

import { motion } from "framer-motion";

import ChatWindow from "./components/ChatWindow";
import { useCookies } from "react-cookie";

import { IUser } from "./interfaces";
import { getChatConnection } from "../../shared/services/chatServices";
import { AuthContext } from "../../context/GlobalStates";

const ChatRoot = () => {
	const [userList, setUserList] = useState<Array<IUser>>([]);
	const [isOpen, onToggle] = useState([]);
	const [ cookies ] = useCookies(["user-token"]);
	const context = useContext(AuthContext);

	const echo = getChatConnection(cookies["user-token"]);

	const handleOnOpenChat = (index: number) => {
		const isOpenArray = isOpen;
		isOpenArray[index] = !isOpenArray[index];
		onToggle(isOpenArray);
	};

	echo.join("channel-session")
		.here((users: Array<IUser>) => {
			console.log("you just joined");
			setUserList(users.filter((user: IUser) => user.id !== context?.userData?.id));
		})
		.joining((user: IUser) => {
			console.log("user joined");
			const newUserList = userList;
			newUserList.push(user);
			setUserList(newUserList);
		})
		.leaving((user: IUser) => {
			console.log("user leaved");
			console.log("hello");
			setUserList(userList.filter((item: IUser) => item.id !== user.id));
		})
		.error((error: any) => {
			console.log("error with echo: ", error);
		});

	return(
		<Box
			width="full"
			height="full"
			position="relative"
		>
			<Stack
				spacing={64}
				direction="column"
			>
				{userList.map((user, index) => {
					return (
						<motion.div
							style={{
								position: "fixed",
								bottom: 16,
								left: 16 + (index * 64),
							}}
							drag
							dragConstraints={{
								top: -100,
								left: -10,
								right: 100,
								bottom: 10,
							}}
							key={index}
						>
							<ChatWindow
								user={user}
								isVisible={isOpen[index]}
							/>

							<IconButton
								aria-label="chat button"
								bgColor="blue.400"
								color="white"
								rounded="full"
								shadow="base"
								icon={<Avatar name={`${user.name} ${user.lastname}`}/>}

								onClick={() => handleOnOpenChat(index)}
							/>
						</motion.div>
					)})
				}
			</Stack>
		</Box>
	);
};

export default ChatRoot;
