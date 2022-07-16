import { FC } from "react";

import { Box, Flex, Heading, HStack, IconButton, Input, InputGroup, InputLeftAddon, Stack, Text, useMediaQuery } from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";
import { IUser } from "../interfaces";
import { FiSend } from "react-icons/fi";
import Message from "./Message";
import SelfMessage from "./SelfMessage";

interface ChatWindowProps {
	isVisible: boolean;
	user: IUser;
}

const ChatWindow: FC<ChatWindowProps> = ({ isVisible, user }) => {
	const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

	const width = isLargerThan1280 ? 480 : 340;
	const height = isLargerThan1280 ? 640 : 400;

	return(
		<AnimatePresence>
			{isVisible && (
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
						<Flex
							flexDirection="column"
							height="full"
						>
							<Box
								bgColor="blue.400"
								width="full"
								borderTopRadius="xl"
								shadow="base"
								px={4}
								py={2}
							>
								<Text
									size="md"
									fontWeight={500}
									color="white"
								>
									{user.name} {user.lastname}
								</Text>
							</Box>
							<Box
								flexGrow={1}
								p={4}
							>
								<Stack>
									<Message
										maxWidth={width}
										message="Hello asdfadsfa sdfasdfasd fasdf asdfasdf asdfas dfasdffff ff fffffffff ffffffffffffffff ffffffffff fffffff"
									/>
									<SelfMessage
										maxWidth={width}
										message="Hello"
									/>
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
								<HStack
									alignItems="center"
								>
									<Input
										rounded="md"
										variant="filled"
										placeholder="Escribe un mensaje aquí"
										_hover={{
											bgColor: "gray.100"
										}}
										_focus={{
											bgColor: "gray.100",
											borderColor: "gray.300"
										}}
										size="sm"
									/>
									<IconButton
										m={0}
										colorScheme="blue"
										size="sm"
										aria-label="send button"
										icon={<FiSend />}
									/>
								</HStack>
							</Box>
						</Flex>
					</Box>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ChatWindow;
