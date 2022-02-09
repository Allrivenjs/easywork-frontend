import {
	Box,
	Button,
	Container,
	Link,
	SimpleGrid,
	Stack,
	Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";

import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

const Footer = () => {
	return (
		<Box bg={"blue.50"} color={"blue.700"}>
			<Container as={Stack} maxW={"6xl"} py={10}>
				<SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
					<Stack align={"flex-start"}>
						<ListHeader>Compañia</ListHeader>
						<Link href={"#"}>Acerca de nosotros</Link>
						<Link href={"#"}>Blog</Link>
						<Link href={"#"}>Educadores</Link>
						<Link href={"#"}>Contactanos</Link>
					</Stack>

					<Stack align={"flex-start"}>
						<ListHeader>Soporte</ListHeader>
						<Link href={"#"}>Centro de ayuda</Link>
						<Link href={"#"}>Centro de seguridad</Link>
						<Link href={"#"}>Lineamientos de la comunidad</Link>
					</Stack>

					<Stack align={"flex-start"}>
						<ListHeader>Legal</ListHeader>
						<Link href={"#"}>Politicas de cookies</Link>
						<Link href={"#"}>Politicas de privacidad</Link>
						<Link href={"#"}>Terminos de uso</Link>
						<Link href={"#"}>Aplicación de la ley</Link>
					</Stack>

					<Stack align={"flex-start"}>
						<ListHeader>Instala nuestra app</ListHeader>
						<p>😉 Coming soon...</p>
					</Stack>
				</SimpleGrid>
			</Container>

			<Box
				borderTopWidth={1}
				borderStyle={"solid"}
				borderColor={"gray.200"}
			>
				<Container
					as={Stack}
					maxW={"6xl"}
					py={4}
					direction={{ base: "column", md: "row" }}
					spacing={4}
					justify={{ md: "space-between" }}
					align={{ md: "center" }}
				>
					<Text>© 2022 Easywork. Todos los derechos reservados</Text>
					<Stack direction={"row"} spacing={6}>
						<Button rounded={"full"} w="12" h="12">
							<FiTwitter />
						</Button>
						<Button rounded={"full"} w="12" h="12">
							<FiFacebook />
						</Button>
						<Button rounded={"full"} w="12" h="12">
							<FiInstagram />
						</Button>
					</Stack>
				</Container>
			</Box>
		</Box>
	);
};

const ListHeader = ({ children }: { children: ReactNode }) => {
	return (
		<Text fontWeight={"bold"} fontSize={"lg"} mb={2}>
			{children}
		</Text>
	);
};

export default Footer;
