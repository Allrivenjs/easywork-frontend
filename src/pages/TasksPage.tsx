import {
	Box,
	Container,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputLeftAddon,
	Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTasks } from "../services/tasksService";

import { FiSearch } from "react-icons/fi";

import CreateNewTaskBtn from "../components/CreateNewTaskBtn";
import TaskCard from "../components/TaskCard";
import Categories from "../components/Categories";
import axios from "axios";
import Pagination, { Link } from "../components/Pagination";

interface Owner {
	name: string;
	lastname: string;
	profile_photo_path: string;
	profile_slug: string;
}

interface Topic {
	id: number;
	name: string;
	created_at: string;
}

export interface TaskCardProps {
	id: number;
	name: string;
	slug: string;
	description: string;
	difficulty: string;
	owner: Owner;
	topics: Array<Topic>;
	created_at: string;
}

interface TasksPageState {
	tasks: Array<TaskCardProps>;
	links: Array<Link>;
	loading: boolean;
}

const TasksPage = () => {
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
				const res = await getTasks(source, url as string);
				console.log(res);
				if (res) {
					setTasksPageState({
						tasks: res.data,
						links: res.meta.links,
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
							<div className="flex items-center justify-center w-full h-screen">
								<Spinner size={"xl"} />
							</div>
						) : (
							<>
								{tasksPageState.tasks.map((element, i) => {
									return (
										<TaskCard
											key={i}
											id={element.id}
											name={element.name}
											slug={element.slug}
											description={element.description}
											difficulty={element.difficulty}
											owner={element.owner}
											topics={element.topics}
											created_at={element.created_at}
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

			<CreateNewTaskBtn />
		</div>
	);
};

export default TasksPage;
