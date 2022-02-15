import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Flex,
	Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiPlay } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getCourse } from "../services/coursesService";

interface CourseVideo {
	id: number;
	section_id: number;
	name: string;
	description: string;
	duration: string;
	slug: string;
	created_at: string;
}

interface CourseSection {
	id: number;
	course_id: number;
	name: number;
	created_at: string;
	videos: Array<CourseVideo>;
}

interface Course {
	id: number;
	name: string;
	description: string;
	owner: string;
	slug: string;
	created_at: string;
	sections: Array<CourseSection>;
}

interface CoursePageState {
	courseData: Course;
	loading: boolean;
}

const CoursePage = () => {
	const [coursePageState, setCoursePageState] = useState<CoursePageState>({
		courseData: {
			id: 0,
			name: "",
			description: "",
			owner: "",
			slug: "",
			created_at: "",
			sections: [],
		},
		loading: true,
	});

	const { slug } = useParams();

	useEffect(() => {
		const fetchCourseData = async () => {
			const res = await getCourse(slug as string);
			setCoursePageState({ courseData: res, loading: false });
		};
		fetchCourseData();
	}, []);

	return (
		<Flex pt={"16"}>
			<Box flex={1} bg="red">
				<img src="https://fondosmil.com/fondo/29403.jpg" alt="" />
			</Box>
			<Box w={"md"} className="h-screen">
				<div className="relative">
					<h2 className="sticky p-4 text-2xl font-bold shadow">
						Secciones del curso
					</h2>
				</div>

				<Accordion defaultIndex={[0]} allowMultiple className="h-full overflow-y-scroll">
					{coursePageState.courseData.sections.map((element, i) => {
						return (
							<AccordionItem key={i} className="bg-slate-50">
								<AccordionButton>
									<Box flex="1" textAlign="left">
										<h3 className="text-lg font-bold">
											Sección {element.id}: {element.name}
										</h3>
									</Box>
									<AccordionIcon />
								</AccordionButton>

								<AccordionPanel pb={4}>
									{element.videos.map((video, i) => {
										return(
											<div key={i} className="w-full px-4 py-2 hover:bg-slate-200 hover:cursor-pointer">
												{video.id+1}. {video.name}
												<div className="flex items-center">
													<FiPlay size={"12"} className="mr-2"/><span className="text-sm text-slate-600"> 9 {video.duration} min</span>
												</div>
											</div>
										);
									})}
								</AccordionPanel>
							</AccordionItem>
						);
					})}
				</Accordion>
			</Box>
		</Flex>
	);
};

export default CoursePage;
