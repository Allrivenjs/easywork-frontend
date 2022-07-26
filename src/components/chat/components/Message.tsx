import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

interface MessageProps {
	maxWidth: number;
	message: string;
}

const Message: FC<MessageProps> = ({ message, maxWidth }) => {
	return(
		<Box
			bgColor="gray.200"
			py={2}
			px={4}
			rounded="2xl"
			width="fit-content"
			maxWidth={maxWidth - 100}
			wordBreak="break-word"
		>
			<Text>
				{message}
			</Text>
		</Box>
	);
};

export default Message;
