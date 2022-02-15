import {
	Box,
	Checkbox,
	Container,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputLeftAddon,
	Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getCourses } from "../services/coursesService";

import CourseCard from "../components/CourseCard";
import { FiSearch } from "react-icons/fi";

export interface CourseCardProps {
	id: number;
	name: string;
	slug: string;
	description: string;
	owner: string;
	created_at: string;
	image: string;
}

interface CoursesPageState {
	courses: Array<CourseCardProps>;
	loading: boolean;
}

const CoursesPage = () => {
	const [coursesPageState, setCoursesPageState] = useState<CoursesPageState>({
		courses: [],
		loading: true,
	});

	useEffect(() => {
		const fetchCoursesData = async () => {
			setCoursesPageState({ ...coursesPageState, loading: true });
			const res = await getCourses();
			setCoursesPageState({ courses: res, loading: false });
		};
		fetchCoursesData();
	}, []);

	return (
		<div className="w-full pt-32 pb-24 bg-slate-100">
			<Container maxW="container.xl">
				<div>
					<Heading className="mb-4">
						Conoce nuestros nuevos cursos aquí 🧑‍💻
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
					<Box
						w={"60"}
						bg="white"
						h={"fit-content"}
						p={"4"}
						className="sticky rounded-lg shadow top-20"
					>
						<h4 className="mb-2 text-2xl font-bold">Categorias</h4>
						<hr />
						<aside className="mt-4 ml-1">
							<Categories name="Programación" />
							<Categories name="Calculo" />
							<Categories name="Física" />
						</aside>
					</Box>
					<Box flex={1}>
						{
							coursesPageState.loading
							?(
								<div className="flex items-center justify-center w-full h-screen">
									<Spinner size={"xl"} />
								</div>
							)
							:(
								<>
									{coursesPageState.courses.map((element, i) => {
										return (
											<CourseCard
												key={i}
												id={element.id}
												name={element.name}
												description={element.description}
												image={element.image}
												owner={element.owner}
												slug={element.slug}
												created_at={element.created_at}
											/>
										);
									})}
								</>
							)
						}
					</Box>
				</Flex>
			</Container>
		</div>
	);
};

interface CategoriesProps {
	name: string;
}

const Categories = (props: CategoriesProps) => {
	return (
		<div className="mb-2">
			<Checkbox>
				<span className="text-lg hover:underline hover:text-blue-400">
					{props.name}
				</span>
			</Checkbox>
		</div>
	);
};

export default CoursesPage;
