import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Flex,
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiPlay } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getCourse } from "../services/coursesService";

import "../../node_modules/video-react/dist/video-react.css"
import { Player } from 'video-react';

interface CourseVideo {
	id: number;
	section_id: number;
	name: string;
	description: string;
	duration: string;
	slug: string;
	url: string;
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
	actualVideo: CourseVideo;
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
		actualVideo: {
			id: 0,
			section_id: 0,
			name: "",
			description: "",
			duration: "",
			slug: "",
			url: "",
			created_at: "",
		},
	});

	const { slug } = useParams();

	useEffect(() => {
		const fetchCourseData = async () => {
			const res = await getCourse(slug as string);
			setCoursePageState({
				...coursePageState,
				courseData: res,
				loading: false,
				actualVideo: res.sections[0].videos[0],
			});
		};
		fetchCourseData();
	}, []);

	const onChangeSelectedVideo = (newSelectedVideo: CourseVideo) => {
		setCoursePageState({
			...coursePageState,
			actualVideo: newSelectedVideo,
		});
	};

	return (
		<Flex pt={"16"}>
			<Box flex={1}>
				{/* <img
					className="object-cover w-full"
					style={{ height: "720px" }}
					src={coursePageState.actualVideo.url}
				/> */}

				<Player
					playsInline
					poster="/assets/poster.png"
					src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
				/>

				<Tabs>
					<TabList>
						<Tab>Acerca de esta clase</Tab>
						<Tab>Acerca del curso</Tab>
						<Tab isDisabled>Comentarios</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
						<div className="p-6">
								<p className="text-sm text-slate-400">
									Nombre:
								</p>
								<Heading className="mb-2">
									{coursePageState.actualVideo.name}
								</Heading>

								<p className="text-sm text-slate-400">
									Descripción:
								</p>
								<p className="mb-2">
									{coursePageState.actualVideo.description}
								</p>

								<p className="text-sm text-slate-400">
									Duración:
								</p>
								<p className="mb-4">
									{coursePageState.actualVideo.duration}
								</p>

								<p className="text-md text-slate-400">
									Creado hace:{" "}
									{coursePageState.actualVideo.created_at}
								</p>
							</div>
						</TabPanel>
						<TabPanel>
							<div className="p-6">
								<p className="text-sm text-slate-400">
									Nombre:
								</p>
								<Heading className="mb-2">
									{coursePageState.courseData.name}
								</Heading>

								<p className="text-sm text-slate-400">
									Descripción:
								</p>
								<p className="mb-2">
									{coursePageState.courseData.description}
								</p>

								<p className="text-sm text-slate-400">
									Dictado por:
								</p>
								<p className="mb-4">
									{coursePageState.courseData.owner}
								</p>

								<p className="text-md text-slate-400">
									Creado hace:{" "}
									{coursePageState.courseData.created_at}
								</p>
							</div>
						</TabPanel>
						<TabPanel>
							<p>three!</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
			<Box w={"md"} className="right-0 h-full">
				<div className="relative">
					<h2 className="sticky p-4 text-2xl font-bold shadow">
						Secciones del curso
					</h2>
				</div>

				<Accordion
					defaultIndex={[0]}
					allowMultiple
					className="h-full overflow-y-scroll"
				>
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
										return (
											<div
												onClick={() =>
													onChangeSelectedVideo(video)
												}
												key={i}
												className="w-full px-4 py-2 hover:bg-slate-200 hover:cursor-pointer"
											>
												{video.id + 1}. {video.name}
												<div className="flex items-center">
													<FiPlay
														size={"12"}
														className="mr-2"
													/>
													<span className="text-sm text-slate-600">
														{" "}
														9 {video.duration} min
													</span>
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
