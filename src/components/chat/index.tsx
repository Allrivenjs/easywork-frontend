import { useContext, useEffect, useState } from "react";

import { Avatar, Box, IconButton, Stack } from "@chakra-ui/react";

import { motion } from "framer-motion";

import ChatWindow from "./components/ChatWindow";
import { useCookies } from "react-cookie";

import {IProfile, IUser} from "../../context/AuthContext/interfaces";import { getChatConnection } from "../../shared/services/chatServices";
import { AuthContext } from "../../context/AuthContext";

const ChatRoot = () => {
	const [userList, setUserList] = useState<Array<IUser>>([]);
	const [isOpen, onToggle] = useState([]);
	const [cookies] = useCookies(["user-token"]);
	const context = useContext(AuthContext);

	useEffect(() => {
		console.log(cookies["user-token"])
		const echo = getChatConnection(cookies["user-token"]);
		echo
			.join("channel-session")
			.here((users: Array<IUser>) => {
				console.log("you just joined");
				console.log(users)
				setUserList(
					users.filter((user: IUser) => user.id !==(((context?.user as IProfile)?.user as IUser)?.id))
				);
			})
			.joining((user: IUser) => {
				console.log("a user has joined");
				setUserList((prevUserList) => [...prevUserList, user]);
			})
			.leaving((user: IUser) => {
				console.log("user leaved");
				setUserList(userList.filter((item: IUser) => item.id !== user.id));
			})
			.error((error: any) => {
				console.log("error with echo: ", error);
			});

		echo.private(`App.Models.User.${(((context?.user as IProfile)?.user as IUser)?.id)}`).notification((notification: any) => {
			console.log(notification);
		})



	}, [context]);



	const handleOnOpenChat = (index: number) => {
		const isOpenArray = isOpen;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		isOpenArray[index] = !isOpenArray[index];
		onToggle(isOpenArray);
	};

	return (
		<Box width="full" height="full" position="relative">
			<Stack spacing={64} direction="column">
				{userList.map((user, index) => {
					return (
						<motion.div
							style={{
								position: "fixed",
								bottom: 16,
								left: 16 + index * 64,
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
							<ChatWindow user={user} isVisible={isOpen[index]} />

							<IconButton
								aria-label="chat button"
								bgColor="blue.400"
								color="white"
								rounded="full"
								shadow="base"
								icon={<Avatar name={`${user.name} ${user.lastname}`} />}
								onClick={() => handleOnOpenChat(index)}
							/>
						</motion.div>
					);
				})}
			</Stack>
		</Box>
	);
};

export default ChatRoot;
