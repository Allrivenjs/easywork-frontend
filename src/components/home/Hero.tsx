import {
	Button,
	Container,
	Flex,
	Heading,
	Stack,
	Text,
} from "@chakra-ui/react";

import heroImg from "../../assets/svg/hero.svg";

const Hero = () => {
	return (
		<section id="hero">
			<Container maxW={"5xl"}>
				<Stack
					textAlign={"center"}
					align={"center"}
					spacing={{ base: 8, md: 10 }}
					py={{ base: 20, md: 28 }}
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
					<Text color={"gray.500"} maxW={"3xl"}>
						Nunca vuelvas a prender un trabajo. En{" "}
						<span className="text-blue-500">Easywork</span>, te
						ayudaremos a encontrar a la persona indicada para
						asesorarte en cualquier tema que necesites. Sacarás las
						calificaciones más altas, mientras aprendes y adquieres
						grandes conocimientos de personas que estudian al igual
						que tú.
					</Text>
					<Stack spacing={6} direction={"row"}>
						<Button
							rounded={"full"}
							px={6}
							colorScheme={"blue"}
							bg={"blue.400"}
							_hover={{ bg: "blue.500" }}
						>
							¡Quiero participar!
						</Button>
						<Button rounded={"full"} px={6}>
							Saber más
						</Button>
					</Stack>
					<Flex w={"full"} justifyContent={"center"}>
						<img src={heroImg} />
					</Flex>
				</Stack>
			</Container>
		</section>
	);
};

export default Hero;
