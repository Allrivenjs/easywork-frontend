import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	Spinner,
	HStack,
	InputGroup,
	InputRightElement,
	InputLeftAddon,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { register, RegisterUserState } from "../services/authService";

import { useCookies } from "react-cookie";
import { AnimatePresence, motion } from "framer-motion";

const Register = () => {
	// Cookies
	const [, setCookie] = useCookies(["user-token"]);

	const [showPassword, setShowPassword] = useState(false);

	const [newUser, setNewUser] = useState<RegisterUserState>({
		name: "",
		lastname: "",
		email: "",
		phone: 0,
		birthday: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleOnSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		const token = await register(newUser);
		setLoading(false);
		if (token) {
			setCookie("user-token", token);
			navigate("/profile");
		}
	};

	const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewUser({
			...newUser,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"} >
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={20} px={6}>
				<AnimatePresence>
					<motion.div
						animate={{ x: [-500, 0], opacity: [0, 1] }}
						transition={{ duration: 0.5 }}
						exit={{ opacity: 0 }}
					>
						<Stack align={"center"}>
							<Heading textAlign={"center"} fontSize={"3xl"} pb={5}>
								🥳 Bienvenido a la comunidad de Easywork 📝
							</Heading>
						</Stack>
						<Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={6}>
							<form onSubmit={handleOnSubmitForm}>
								<Stack spacing={3}>
									<HStack>
										<Box>
											<FormControl id="name" isRequired>
												<FormLabel htmlFor="name">
													Nombre
												</FormLabel>
												<Input
													onChange={
														handleOnChangeInput
													}
													name="name"
													type="text"
													required
												/>
											</FormControl>
										</Box>
										<Box>
											<FormControl id="lastname" isRequired>
												<FormLabel htmlFor="lastname">
													Apellido
												</FormLabel>
												<Input
													onChange={
														handleOnChangeInput
													}
													name="lastname"
													type="text"
													required
												/>
											</FormControl>
										</Box>
									</HStack>
									<FormControl id="email" isRequired>
										<FormLabel htmlFor="email">
											Correo electronico
										</FormLabel>
										<Input
											onChange={handleOnChangeInput}
											name="email"
											type="email"
											required
										/>
									</FormControl>

									<FormControl id="phone" isRequired>
										<FormLabel htmlFor="phone">
											Numero de celular
										</FormLabel>
										<InputGroup>
											<InputLeftAddon>+57</InputLeftAddon>
											<Input
												onChange={handleOnChangeInput}
												name="phone"
												type="number"
												required
											/>
										</InputGroup>
									</FormControl>

									<FormControl id="birthday" isRequired>
										<FormLabel htmlFor="birthday">
											Fecha de nacimiento
										</FormLabel>
										<Input
											onChange={handleOnChangeInput}
											name="birthday"
											type="date"
											required
										/>
									</FormControl>
									<FormControl id="password" isRequired>
										<FormLabel htmlFor="password">
											Password
										</FormLabel>
										<InputGroup>
											<Input
												onChange={handleOnChangeInput}
												required
												minLength={8}
												name="password"
												type={
													showPassword
														? "text"
														: "password"
												}
											/>
											<InputRightElement h={"full"}>
												<Button
													variant={"ghost"}
													onClick={() =>
														setShowPassword(
															(showPassword) =>
																!showPassword
														)
													}
												>
													{showPassword ? (
														<ViewIcon />
													) : (
														<ViewOffIcon />
													)}
												</Button>
											</InputRightElement>
										</InputGroup>
									</FormControl>
									<Stack spacing={10} pt={1}>
										<Button
											type="submit"
											isDisabled={loading}
											size="lg"
											bg={"blue.400"}
											color={"white"}
											_hover={{
												bg: "blue.500",
											}}
										>
											{loading ? (
												<Spinner />
											) : (
												<>Registrarse</>
											)}
										</Button>
									</Stack>
									<Stack pt={3}>
										<Text align={"center"}>
											¿Ya tienes cuenta?{" "}
											<Link
												to="/login"
												className="text-blue-400"
											>
												inicia sesión
											</Link>
										</Text>
									</Stack>
								</Stack>
							</form>
						</Box>
					</motion.div>
				</AnimatePresence>
			</Stack>
		</Flex>
	);
};

export default Register;
