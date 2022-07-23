import {
	Box,
	Container,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputLeftAddon,
	SkeletonCircle,
	SkeletonText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { FiSearch } from "react-icons/fi";

import axios from "axios";
import { useCookies } from "react-cookie";
import Pagination, { Link } from "../../../shared/Pagination";
import TaskCard from "./TaskCard";
import FloatingLink from "../../../shared/FloatingLink";
import { getTasks } from "../../../shared/services/tasksService";
import Categories from "../../../shared/Categories";
import { ITask } from "./interface";

interface TasksPageState {
	tasks: Array<ITask>;
	links: Array<Link>;
	loading: boolean;
}

const TasksPage = () => {
	const [cookies] = useCookies(["user-token"]);
	const [tasksPageState, setTasksPageState] = useState<TasksPageState>({
		tasks: [],
		links: [],
		loading: true,
	});

	const [url, setUrl] = useState<string | null>(null);

	useEffect(() => {
		const source = axios.CancelToken.source();

		const fetchTasksData = async () => {
			try {
				setTasksPageState({ ...tasksPageState, loading: true });
				const res = await getTasks(cookies["user-token"], source, url as string);
				if (res) {
					setTasksPageState({
						tasks: res.data,
						links: res.links,
						loading: false,
					});
				}
			} catch (e) {
				console.log("Error fetching tasks: ", e);
			}
		};
		fetchTasksData();

		return () => {
			source.cancel();
		};
	}, [url]);

	return (
		<div className="w-full pt-32 pb-24 bg-slate-100">
			<Container maxW="container.xl">
				<div>
					<Heading className="mb-4">
						Ayuda a los demás con sus tareas 🙌
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
				<Flex gap={4} className="mt-6">
					<Categories />
					<Box flex={1}>
						{tasksPageState.loading ? (
							<>
								{[...Array(5)].map((element, i) => {
									return (
										<Box
											key={i}
											padding="6"
											bg="white"
											className="mb-6 rounded-lg shadow-lg"
										>
											<SkeletonCircle size="10" />
											<SkeletonText
												mt="4"
												noOfLines={6}
												spacing="4"
											/>
										</Box>
									);
								})}
							</>
						) : (
							<>
								{tasksPageState.tasks.map((element, i) => {
									return (
										<TaskCard
											key={i}
											{...element}
										/>
									);
								})}
							</>
						)}
						<Pagination
							links={tasksPageState.links}
							onClick={setUrl}
						/>
					</Box>
				</Flex>
			</Container>

			<FloatingLink
				to="/tasks/create"
			>
				✍️ Crear tarea
			</FloatingLink>
		</div>
	);
};

export default TasksPage;
