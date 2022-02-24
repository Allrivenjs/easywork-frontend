import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	IconButton,
	Input,
	Spinner,
	Stack,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import DifficultySelect from "../components/DifficultySelect";

import CategoriesSelect from "../components/TopicSelect";
import { createTask } from "../services/tasksService";

export interface NewTask {
	name: string;
	description: string;
	topics: Array<number>;
	difficulty: string;
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
			topics: [1],
			difficulty: "easy",
		},
		loading: false,
	});

	const handleOnChangeInput = (e: any) => {
		setCreateTaskState({
			...createTaskState,
			newTask: {
				...createTaskState.newTask,
				[e.target.name]: e.target.value,
			},
		});
	};

	const handleOnChangeSelect = (idTopic: number, index: number) => {
		const newCategories = createTaskState.newTask.topics;
		newCategories[index] = idTopic;
		setCreateTaskState({
			...createTaskState,
			newTask: {
				...createTaskState.newTask,
				topics: newCategories,
			},
		});
	};

	const handleOnAddTopic = () => {
		const newCategories = createTaskState.newTask.topics;
		newCategories.push(1);
		setCreateTaskState({
			...createTaskState,
			newTask: {
				...createTaskState.newTask,
				topics: newCategories,
			},
		});
	};

	const handleOnRemoveTopic = () => {
		const newCategories = createTaskState.newTask.topics;
		newCategories.pop();
		setCreateTaskState({
			...createTaskState,
			newTask: {
				...createTaskState.newTask,
				topics: newCategories,
			},
		});
	};

	const handleOnSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCreateTaskState({
			...createTaskState,
			loading: true,
		});
		const res = await createTask(createTaskState.newTask);
		setCreateTaskState({
			...createTaskState,
			loading: false,
		});
		console.log(res);

		console.log(createTaskState);
	};

	return (
		<Flex
			align={"center"}
			justify={"center"}
			bg={"gray.50"}
			pt={12}
			pb={12}
		>
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
										<FormHelperText>
											Un titulo corto y especifico ayudara
											a los demás a entenderte
										</FormHelperText>
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
										<FormHelperText>
											Describe detalladamente tu problema
											y como quieres recibir ayuda de los
											demás
										</FormHelperText>
									</FormControl>
									<FormControl id="name">
										<div className="flex items-center justify-between mb-2">
											<FormLabel
												htmlFor="name"
												m={0}
												p={0}
											>
												Tematica
											</FormLabel>
											<div className="flex justify-end gap-2">
												<IconButton
													onClick={handleOnAddTopic}
													aria-label="Add a category"
													size="sm"
													colorScheme="blue"
													icon={<AddIcon />}
												/>
												<IconButton
													onClick={
														handleOnRemoveTopic
													}
													aria-label="Add a category"
													size="sm"
													colorScheme="red"
													isDisabled={
														!(
															createTaskState
																.newTask.topics
																.length > 1
														)
													}
													icon={<MinusIcon />}
												/>
											</div>
										</div>

										{createTaskState.newTask.topics.map(
											(element, i) => {
												return (
													<CategoriesSelect
														key={i}
														index={i}
														onChange={
															handleOnChangeSelect
														}
													/>
												);
											}
										)}

										<FormHelperText>
											Selecciona un tematica acorde a tu
											tarea para ayudar clasificarla
										</FormHelperText>
									</FormControl>

									<FormControl id="description">
										<FormLabel htmlFor="description">
											Dificultad
										</FormLabel>
										<DifficultySelect
											onChange={handleOnChangeInput}
										/>
										<FormHelperText>
											Elige una dificultad que consideres
											acorde a tu tarea
										</FormHelperText>
									</FormControl>

									<FormControl id="description">
										<FormLabel htmlFor="description">
											Archivos
										</FormLabel>
										<input
											type="file"
											multiple
										/>
										<FormHelperText>
											Puedes adjuntar pdfs, imagenes o
											documentos de tu tarea
										</FormHelperText>
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
												<>Publicar tarea</>
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
