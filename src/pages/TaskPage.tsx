import {
	Box,
	Container,
	Heading,
	Input,
	InputGroup,
	InputLeftAddon,
} from "@chakra-ui/react";

import { FiSearch } from "react-icons/fi";

const TaskPage = () => {
	return (
		<div className="w-full pt-32 pb-24 bg-slate-100">
			<Container maxW="container.xl">
				<div>
					<Heading className="mb-4">
						Publica tu tarea para que los demás puedan ayudarte 📝
					</Heading>
					<hr />
					<InputGroup mt={"6"} className="shadow">
						<InputLeftAddon>
							{" "}
							<FiSearch />{" "}
						</InputLeftAddon>
						<Input
							bg={"white"}
							variant="outline"
							placeholder="Buscar curso"
						/>
					</InputGroup>
				</div>

				<Box flex={1}></Box>
			</Container>
		</div>
	);
};

export default TaskPage;
