import { FC, useEffect, useState } from "react";

import {
	Box,
	Flex,
	HStack,
	IconButton,
	Input,
	Stack,
	Text,
	useMediaQuery,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { FiSend } from "react-icons/fi";
import {
	getChatConnection,
	getMessages,
	sendMessage,
} from "../../../shared/services/chatServices";
import { IChatMessage, IChatRoom, INewMessage, ISendMessage } from "../interfaces";
import Message from "./Message";
import SelfMessage from "./SelfMessage";
import { useAuth } from "../../../context/AuthContext";
import { IProfile } from "../../../context/AuthContext/interfaces";

interface ChatWindowProps {
	room: IChatRoom;
}

export const ChatWindow: FC<ChatWindowProps> = ({ room }) => {
	const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

	const { user } = useAuth();

	const width = isLargerThan1280 ? 480 : 340;
	const height = isLargerThan1280 ? 640 : 400;

	const [cookies] = useCookies(["user-token"]);

	const [messages, setMessages] = useState<Array<IChatMessage>>();
	const [message, setMessage] = useState<string>("");
	const [newMessages, setNewMessages] = useState<Array<INewMessage>>([]);

	const fetchMessages = async () => {
		const res = await getMessages(cookies["user-token"], room.id);
		if (res) {
			setMessages(res);
		}
	};

	useEffect(() => {
		console.log("esperando mensajes...");
		fetchMessages();
		const echo = getChatConnection(cookies["user-token"]);
		echo
			.private(`chat-channel.${room.id}`)
			.listen("MessageNotification", (e: INewMessage) => {
				console.log(e);
				setNewMessages(prevState => [...prevState, e]);
			})
	}, []);



	const handleOnSendMessage = async () => {
		setMessage("");
		if (message) {
			const newMessage: ISendMessage = {
				message,
				room_id: room.id,
			};

			await sendMessage(cookies["user-token"], newMessage);
		}
	};

	return (
		<motion.div
			style={{ marginBottom: 6 }}
			initial={{ opacity: 0, y: 0, height: 100 }}
			animate={{ opacity: 1, y: 0, height: height }}
			exit={{ opacity: 0, y: 0, height: 100 }}
		>
			<Box
				bgColor="white"
				width={width}
				height={height}
				rounded="xl"
				shadow="base"
				border={1}
				borderStyle="solid"
				borderColor="gray.50"
			>
				<Flex flexDirection="column" height="full">
					<Box
						bgColor="blue.400"
						width="full"
						borderTopRadius="xl"
						shadow="base"
						px={4}
						py={2}
					>
						<Text size="md" fontWeight={500} color="white">
							{room.users[0].name} {room.users[0].lastname}
						</Text>
					</Box>
					<Box flexGrow={1} p={4} overflowY="scroll">
						<Stack>
							{messages?.map((message, index) => {
								if (message.user_id === (user as IProfile).id) {
									return (
										<SelfMessage
											key={index}
											message={message.message}
											maxWidth={width}
										/>
									);
								} else {
									return (
										<Message
											key={index}
											message={message.message}
											maxWidth={width}
										/>
									);
								}
							})}

							{newMessages.map((message, index) => {
									if (message.user_id === (user as IProfile).id) {
										return(
											<Message
												key={index}
												message={message.message}
												maxWidth={width}
											/>
										)
									} else {
										<SelfMessage
											key={index}
											message={message.message}
											maxWidth={width}
										/>
									}
							})}
						</Stack>
					</Box>
					<Box
						bgColor="gray.200"
						width="full"
						borderBottomRadius="xl"
						shadow="base"
						px={4}
						py={2}
					>
						<HStack alignItems="center">
							<Input
								rounded="md"
								variant="filled"
								placeholder="Escribe un mensaje aquí"
								onKeyUp={(e) => e.code === "Enter" && handleOnSendMessage()}
								onChange={(e) => setMessage(e.target.value)}
								value={message}
								_hover={{
									bgColor: "gray.100",
								}}
								_focus={{
									bgColor: "gray.100",
									borderColor: "gray.300",
								}}
								size="sm"
							/>
							<IconButton
								m={0}
								colorScheme="blue"
								size="sm"
								aria-label="send button"
								onClick={() => handleOnSendMessage()}
								icon={<FiSend />}
							/>
						</HStack>
					</Box>
				</Flex>
			</Box>
		</motion.div>
	);
};
