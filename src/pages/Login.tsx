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
	useToast,
} from "@chakra-ui/react";

import { login, LoginUserState } from "../services/AuthService";

import { useCookies } from "react-cookie";
import { AnimatePresence, motion } from "framer-motion";

const Login = () => {
	// Cookies
	const [, setCookie] = useCookies(["user-token"]);

	const [user, setUser] = useState<LoginUserState>({
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const toast = useToast();

	const handleOnSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		// e.preventDefault();
		setLoading(true);
		const token = await login(user);
		setLoading(false);
		if (token) {
			setCookie("user-token", token);
			navigate("/profile");
		} else {
			toast({
				title: "Algo ha salido mal",
				description: "Usuario y/o contraseña incorrectos",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<AnimatePresence>
					<motion.div
						animate={{ x: [500, 0], opacity: [0, 1] }}
						transition={{ duration: 0.5 }}
						exit={{ opacity: 0, x: 500 }}
					>
						<Stack align={"center"}>
							<Heading fontSize={"4xl"}>
								Inicia sesión en tu cuenta
							</Heading>
							<Text fontSize={"lg"} color={"gray.600"}>
								o si aun no tienes cuenta,{" "}
								<Link
									to={"/register"}
									className="text-blue-400"
								>
									registrate
								</Link>{" "}
								✌️
							</Text>
						</Stack>
						<Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
							<form onSubmit={handleOnSubmitForm}>
								<Stack spacing={4}>
									<FormControl id="email">
										<FormLabel htmlFor="email">
											Correo electronico
										</FormLabel>
										<Input
											onChange={handleOnChangeInput}
											name="email"
											type="email"
											required
											autoComplete={"email"}
											autoFocus
										/>
									</FormControl>
									<FormControl id="password">
										<FormLabel htmlFor="password">
											Contraseña
										</FormLabel>
										<Input
											onChange={handleOnChangeInput}
											name="password"
											type="password"
											required
											autoComplete={"current-password"}
										/>
									</FormControl>
									<Stack spacing={10}>
										{/* <Stack
									direction={{ base: "column", sm: "row" }}
									align={"start"}
									justify={"space-between"}
								>
									<Checkbox>Remember me</Checkbox>
									<Link color={"blue.400"}>
										¿Olvidaste tu contraseña?
									</Link>
								</Stack> */}
										<Button
											isDisabled={loading}
											type="submit"
											bg={"blue.400"}
											color={"white"}
											_hover={{
												bg: "blue.500",
											}}
										>
											{loading ? (
												<Spinner />
											) : (
												<>Iniciar sesión</>
											)}
										</Button>
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

export default Login;
