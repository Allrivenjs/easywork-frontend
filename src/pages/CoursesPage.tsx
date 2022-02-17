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
import { getCourses } from "../services/coursesService";

import CourseCard from "../components/CourseCard";
import { FiSearch } from "react-icons/fi";
import Categories from "../components/Categories";

interface Image {
	id: number;
    url: string;
}

export interface CourseCardProps {
	id: number;
	name: string;
	slug: string;
	description: string;
	owner: string;
	created_at: string;
	image: Image;
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
					<Categories />
					<Box flex={1}>
						{coursesPageState.loading ? (
							<div className="flex items-center justify-center w-full h-screen">
								<Spinner size={"xl"} />
							</div>
						) : (
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
						)}
					</Box>
				</Flex>
			</Container>
		</div>
	);
};

export default CoursesPage;
