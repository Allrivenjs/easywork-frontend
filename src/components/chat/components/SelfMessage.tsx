import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

interface SelfMessageProps {
	maxWidth: number;
	message: string;
}

const SelfMessage: FC<SelfMessageProps> = ({ message, maxWidth }) => {
	return(
		<Box
			bgColor="blue.200"
			py={2}
			px={4}
			rounded="2xl"
			maxWidth={maxWidth - 100}
			wordBreak="break-word"
			alignSelf="flex-end"
		>
			<Text>
				{message}
			</Text>
		</Box>
	);
};

export default SelfMessage;
