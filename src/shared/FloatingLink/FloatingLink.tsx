import { FC } from "react";

import Link from "next/link";

import { Box } from "@chakra-ui/react";

interface FloatingButtonProps {
	to: string;
	children: string;
};

export const FloatingLink: FC<FloatingButtonProps> = ({ to, children }) => {
	return (
		<Link
			href={to}
		>
			<a>
				<Box
					position='fixed'
					right={20}
					bottom={20}
					w='fit-content'
					bgColor='blue.400'
					zIndex={999999}
					px={5}
					py={3}
					fontSize='lg'
					rounded='full'
					color='white'
					shadow='lg'
					fontWeight='semibold'
				>
					{ children }
				</Box>
			</a>
		</Link>
	);
};
