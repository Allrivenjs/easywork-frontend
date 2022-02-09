import { ReactElement } from "react";

import {
	Box,
	Container,
	Flex,
	Heading,
	Icon,
	SimpleGrid,
	Stack,
	Text,
} from "@chakra-ui/react";

import { FaPhp, FaReact } from "react-icons/fa";

import { SiDart } from "react-icons/si";

const Courses = () => {
	return (
		<Container maxW={"5xl"} py={12}>
			<Flex justifyContent={"center"} mb={"14"}>
				<Heading>Algunos de nuestros disponibles son:</Heading>
			</Flex>
			<Box p={4}>
				<SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
					<Item
						icon={<Icon as={FaReact} w={10} h={10} />}
						color="cyan"
						title={"React.js básico"}
					/>
					<Item
						icon={<Icon as={FaPhp} w={10} h={10} />}
						color="blue"
						title={"PHP básico"}

					/>
					<Item
						icon={<Icon as={SiDart} w={10} h={10} />}
						color="teal"
						title={"Dart + Flutter básico"}
					/>
				</SimpleGrid>
			</Box>
		</Container>
	);
};

interface FeatureProps {
	title: string;
	color: string;
	icon: ReactElement;
}

const Item = ({ title, color, icon }: FeatureProps) => {
	return (
		<Stack alignItems={"center"}>
			<Flex
				w={16}
				h={16}
				align={"center"}
				justify={"center"}
				color={"white"}
				rounded={"full"}
				bg={`${color}.400`}
				mb={1}
			>
				{icon}
			</Flex>
			<Text fontWeight={600}>{title}</Text>
		</Stack>
	);
};

export default Courses;
