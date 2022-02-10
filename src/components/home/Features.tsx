import { ReactElement } from "react";

import {
	Container,
	Flex,
	Heading,
	Icon,
	Image,
	SimpleGrid,
	Stack,
	StackDivider,
	Text,
} from "@chakra-ui/react";

import { FiUser, FiVideo } from "react-icons/fi";
import { BiMoney } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const Features = () => {
	return (
		<section id="features">
			<Container maxW={"5xl"} py={12}>
				<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
					<Stack spacing={4}>
						<Text
							textTransform={"uppercase"}
							color={"blue.400"}
							fontWeight={600}
							fontSize={"sm"}
							bg={"blue.50"}
							p={2}
							alignSelf={"flex-start"}
							rounded={"md"}
						>
							Nuestros beneficios
						</Text>
						<Heading>Aprende de personas que te entienden</Heading>
						<Text color={"gray.500"} fontSize={"lg"}>
							En Easywork, los educadores son los ¡mismos
							estudiantes! Esto le garantiza a nuestros usuarios:
						</Text>
						<Stack
							spacing={4}
							divider={<StackDivider borderColor={"gray.100"} />}
						>
							<Item
								icon={
									<Icon
										as={FiUser}
										color={"yellow.500"}
										w={5}
										h={5}
									/>
								}
								iconBg={"yellow.100"}
								text={"Servicio compresivo"}
							/>
							<Item
								icon={
									<Icon
										as={BiMoney}
										color={"green.500"}
										w={5}
										h={5}
									/>
								}
								iconBg={"green.100"}
								text={"Ingresos monetarios"}
							/>
							<Item
								icon={
									<Icon
										as={FaUsers}
										color={"purple.500"}
										w={5}
										h={5}
									/>
								}
								iconBg={"purple.100"}
								text={"Acceso a una comunidad dispuesta a ayudar"}
							/>
							<Item
								icon={
									<Icon
										as={FiVideo}
										color={"blue.500"}
										w={5}
										h={5}
									/>
								}
								iconBg={"blue.100"}
								text={"Cursos y videos de parte de los educadores"}
							/>
						</Stack>
					</Stack>
					<Flex>
						<Image
							rounded={"md"}
							alt={"feature image"}
							src={
								"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
							}
							objectFit={"cover"}
						/>
					</Flex>
				</SimpleGrid>
			</Container>
		</section>
	);
};

interface ItemProps {
	text: string;
	iconBg: string;
	icon?: ReactElement;
}

const Item = ({ text, icon, iconBg }: ItemProps) => {
	return (
		<Stack direction={"row"} align={"center"}>
			<Flex
				w={8}
				h={8}
				align={"center"}
				justify={"center"}
				rounded={"full"}
				bg={iconBg}
			>
				{icon}
			</Flex>
			<Text fontWeight={600}>{text}</Text>
		</Stack>
	);
};

export default Features;
