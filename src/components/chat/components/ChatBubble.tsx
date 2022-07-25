import { FC, useState } from "react";

import {
	Avatar,
	IconButton,
} from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";
import { IChatUser } from "../interfaces";
import { ChatWindow } from "./ChatWindow";

interface ChatBubbleProps {
	user: IChatUser;
	index: number;
}

const ChatBubble: FC<ChatBubbleProps> = ({ user, index }) => {

	const [isVisible, setIsVisible] = useState<boolean>(false);

	return (
		<motion.div
			style={{
				position: "fixed",
				bottom: 16,
				left: 16 + index * 64,
				zIndex: 9999999
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
			<AnimatePresence>
				{isVisible && (
					<ChatWindow
						user={user}
					/>
				)}
			</AnimatePresence>
			<IconButton
				aria-label="chat button"
				bgColor="blue.400"
				color="white"
				rounded="full"
				shadow="base"
				icon={<Avatar name={`${user.name} ${user.lastname}`} />}
				onClick={() => setIsVisible(!isVisible)}
			/>
		</motion.div>
	);
};

export default ChatBubble;
