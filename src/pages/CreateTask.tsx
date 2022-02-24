import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, Spinner, Stack, Text, Textarea } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import CategoriesSelect from "../components/TopicSelect";

interface NewTask {
	name: string;
	description: string;
	topic: string;
}

interface CreateTaskState {
	newTask: NewTask;
	loading: boolean;
}

const CreateTask = () => {

	const [createTaskState, setCreateTaskState] = useState<CreateTaskState>({
		newTask: {
			name: "",
			description: "",
			topic: ""
		},
		loading: true,
	});

	const handleOnChangeInput = (e: any) => {
		setCreateTaskState({
			...createTaskState,
			newTask: {
				...createTaskState.newTask,
				[e.target.name]: e.target.value,
			},
		});
		console.log(createTaskState);
	};

	const handleOnSubmitForm = () => {
		console.log(createTaskState);
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
						<Stack align={"center"} mb={6}>
							<Heading fontSize={"4xl"}>
								Publica tu tarea 📝
							</Heading>
							<Text fontSize={"lg"} color={"gray.600"}>
								Para que los demás puedan ayudarte con ella
							</Text>
						</Stack>
						<Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
							<form onSubmit={handleOnSubmitForm}>
								<Stack spacing={4}>
									<FormControl id="name">
										<FormLabel htmlFor="name">
											Titulo de la publicación
										</FormLabel>
										<Input
											onChange={handleOnChangeInput}
											name="name"
											type="name"
											required
											autoFocus
										/>
										<FormHelperText>Un titulo corto y especifico ayudara a los demás a entenderte</FormHelperText>
									</FormControl>
									<FormControl id="description">
										<FormLabel htmlFor="description">
											Descripción
										</FormLabel>
										<Textarea
											onChange={handleOnChangeInput}
											name="description"
											required
										></Textarea>
										<FormHelperText>Describe detalladamente tu problema y como quieres recibir ayuda de los demás</FormHelperText>
									</FormControl>
									<FormControl id="name">
										<FormLabel htmlFor="name">
											Tematica
										</FormLabel>
										<CategoriesSelect
											onChange={handleOnChangeInput}
										/>
										<FormHelperText>Selecciona un tematica acorde a tu tarea para ayudar clasificarla</FormHelperText>
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
											isDisabled={createTaskState.loading}
											type="submit"
											bg={"blue.400"}
											color={"white"}
											_hover={{
												bg: "blue.500",
											}}
										>
											{createTaskState.loading ? (
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

export default CreateTask;
