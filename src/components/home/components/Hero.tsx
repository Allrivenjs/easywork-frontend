import { useRouter } from "next/router";
import Image from "next/image";

import {
	Button,
	Container,
	Flex,
	Heading,
	Stack,
	Text,
} from "@chakra-ui/react";

import { motion } from "framer-motion";

export const Hero = () => {
	const { push } = useRouter();

	return (
		<section id="hero">
			<Container maxW={"5xl"}>
				<Stack
					textAlign={"center"}
					align={"center"}
					spacing={{ base: 8, md: 10 }}
					py={{ base: 20, md: 28 }}
				>
					<motion.div
						animate={{ y: [-100, 0], opacity: [0, 0.5, 1] }}
						transition={{ duration: 0.7 }}
					>
						<Heading
							fontWeight={600}
							fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
							lineHeight={"110%"}
						>
							Encontrar ayuda para tus trabajos nunca habia sido{" "}
							<Text as={"span"} color={"blue.400"}>
								tan facil
							</Text>
						</Heading>
					</motion.div>
					<motion.div
						animate={{ opacity: [0, 0.5, 1] }}
						transition={{ delay: 1, duration: 0.7 }}
					>
						<Text color={"gray.500"} maxW={"3xl"}>
							Nunca vuelvas a prender un trabajo. En{" "}
							<span className="text-blue-500">Easywork</span>, te
							ayudaremos a encontrar a la persona indicada para
							asesorarte en cualquier tema que necesites. Sacarás
							las calificaciones más altas, mientras aprendes y
							adquieres grandes conocimientos de personas que
							estudian al igual que tú.
						</Text>
					</motion.div>
					<Stack spacing={6} direction={"row"}>
						<motion.div
							animate={{ opacity: [0, 0.5, 1] }}
							transition={{ delay: 1.2, duration: 0.7 }}
						>
							<Button
								onClick={ () => push('/login') }
								rounded={"full"}
								px={6}
								colorScheme={"blue"}
								bg={"blue.400"}
								_hover={{ bg: "blue.500" }}
							>
								¡Quiero participar!
							</Button>
						</motion.div>
						<motion.div
							animate={{ opacity: [0, 0.5, 1] }}
							transition={{ delay: 1.3, duration: 0.7 }}
						>
							<a href="#mentor-application">
								<Button rounded={"full"} px={6}>
									¡Quiero enseñar!
								</Button>
							</a>
						</motion.div>
					</Stack>
					<motion.div
						animate={{ x: [500, 0], opacity: [0, 1] }}
						transition={{ delay: 1.3, duration: 1 }}
					>
						<Flex w={"full"} justifyContent={"center"}>
							<Image
								src='/assets/svg/hero.svg'
								alt='Easywork colaborative image'
								width={800}
								height={500}
							/>
						</Flex>
					</motion.div>
				</Stack>
			</Container>
		</section>
	);
};
