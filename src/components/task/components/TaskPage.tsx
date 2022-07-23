import {
	Avatar,
	Badge,
	Box,
	Container,
	Heading,
	Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { getTaskBySlug } from "../../../shared/services/tasksService";
import FileItem from "../../../shared/FileItem";
import { TaskCardProps } from "./List";
import { useCookies } from "react-cookie";

interface TaskPageState {
	taskPageData: TaskCardProps;
	loading: boolean;
}

const TaskPage = () => {
	const { slug } = useParams();
	const [cookies] = useCookies(["user-token"]);

	const [taskPageState, setTaskPageState] = useState<TaskPageState>({
		taskPageData: {
			id: 0,
			name: "",
			description: "",
			slug: "",
			owner: {
				name: "",
				lastname: "",
				profile_photo_path: "",
				profile_slug: "",
			},
			topics: [],
			difficulty: "",
			created_at: "",
			files: [],
		},
		loading: true,
	});

	useEffect(() => {
		const fetchTaskPageData = async () => {
			setTaskPageState({
				...taskPageState,
				loading: true,
			});
			const res = await getTaskBySlug(cookies["user-token"], slug as string);
			console.log(res);
			if (res) {
				setTaskPageState({
					...taskPageState,
					taskPageData: res,
					loading: false,
				});
			}
		};
		fetchTaskPageData();
	}, [slug]);

	if (taskPageState.loading) {
		return (
			<div className="flex items-center justify-center w-full h-screen">
				<Spinner size={"xl"}></Spinner>
			</div>
		);
	} else {
		return (
			<div className="w-full pt-20 bg-slate-100">
				<Container maxW="container.xl">
					<div className="p-4 bg-white rounded-lg shadow">
						<div className="flex justify-between mb-4">
							<div>
								<Heading size={"lg"}>
									{taskPageState.taskPageData.name}
								</Heading>
								{taskPageState.taskPageData.topics.map(
									(element, i) => {
										return (
											<React.Fragment key={i}>
												<span className="mr-2 text-sm italic bg-gray-100 text-slate-500">
													| {element.name}
												</span>
											</React.Fragment>
										);
									}
								)}
							</div>
							<Badge className="h-fit">
								{taskPageState.taskPageData.difficulty}
							</Badge>
						</div>

						<hr />

						<p className="mt-4 mb-4 text-md text-slate-500">
							Publicada por:
						</p>

						<div className="flex">
							<Avatar
								name={`${taskPageState.taskPageData.owner.name} ${taskPageState.taskPageData.owner.lastname}`}
								src={
									taskPageState.taskPageData.owner
										.profile_photo_path
								}
							/>
							<div className="ml-3">
								<Link
									to={`/profile/${taskPageState.taskPageData.owner.profile_slug}`}
								>
									<p className="font-bold hover:underline">
										{taskPageState.taskPageData.owner.name}{" "}
										{
											taskPageState.taskPageData.owner
												.lastname
										}
									</p>
								</Link>
								<p className="text-sm text-slate-500">
									Publicaco hace:{" "}
									{taskPageState.taskPageData.created_at}
								</p>
							</div>
						</div>

						<p className="mt-6 mb-4 text-md text-slate-500">
							Descripción:
						</p>

						<p>{taskPageState.taskPageData.description}</p>


						{taskPageState.taskPageData.files &&
						taskPageState.taskPageData.files.length > 0 ? (
							<>
								<p className="mt-4 mb-4 text-md text-slate-500">
									Archivos adjuntos:
								</p>
								{
									taskPageState.taskPageData.files.map((element, i) => {
										return(
											<FileItem
												key={i}
												mime={element.mime}
												url={element.url}
											/>
										);
									})
								}
							</>
						) : (
							<></>
						)}
					</div>

					<Box flex={1}>
						<div className="w-full pt-32 pb-24 bg-slate-100">
							comentarios
						</div>
					</Box>
				</Container>
			</div>
		);
	}
};

export default TaskPage;
