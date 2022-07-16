import { FC } from "react";

import { Box, Flex, Heading, Input, InputGroup, InputLeftAddon, Stack, Text, useMediaQuery } from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";
import { IUser } from "../interfaces";

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
						rounded="2xl"
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
								bgColor="gray.300"
								width="full"
								borderTopRadius="2xl"
								shadow="base"
								px={4}
								py={2}
							>
								<Text
									size="md"
									fontWeight={500}
								>
									{user.name} {user.lastname}
								</Text>
							</Box>
							<Box
								flexGrow={1}
							>

							</Box>
							<Box
								bgColor="gray.300"
								width="full"
								borderBottomRadius="2xl"
								shadow="base"
								px={4}
								py={2}
							>
								<InputGroup>
									<Input
										rounded="md"
										variant="filled"
										placeholder="Escribe un mensaje aquí"
										size="sm"
									/>
								</InputGroup>
							</Box>
						</Flex>
					</Box>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ChatWindow;
