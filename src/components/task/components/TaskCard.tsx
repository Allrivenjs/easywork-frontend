import React, { FC } from "react";

import {
	Avatar,
	Badge,
	Box,
	Heading,
	HStack,
	Link,
	Text,
	VStack,
} from "@chakra-ui/react";

import { Link as LinkReact } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { IProfile } from "../../../context/AuthContext/interfaces";
import { IComment, ITask } from "./interface";
import { OwnerOptions } from "./OwnerOptions";

interface TaskCardProps {
	task: ITask;
	fetchTasksData: () => void;
}

const TaskCard: FC<TaskCardProps> = ({ task, fetchTasksData }) => {
	const context = useAuth();
	return (
		<Box mb={6} position="relative">
			<Box
				p={6}
				bgColor="white"
				rounded="lg"
				zIndex={10}
				position="relative"
				shadow="md"
			>
				<div className="flex justify-between mb-4">
					<div>
						<LinkReact to={`/tasks/${task.slug}`}>
							<Heading size={"lg"} className="hover:underline">
								{task.name}
							</Heading>
						</LinkReact>
						{task.topics.map((element, i) => {
							return (
								<React.Fragment key={i}>
									<span className="mr-2 text-sm italic bg-gray-100 text-slate-500">
										| {element.name}
									</span>
								</React.Fragment>
							);
						})}
					</div>
					<Badge className="h-fit">{task.difficulty}</Badge>
				</div>
				<div className="flex justify-between w-full">
					<div className="flex">
						<Avatar
							name={`${task.owner.name} ${task.owner.lastname}`}
							src={task.owner.profile_photo_path}
						/>
						<div className="ml-3">
							<LinkReact to={`/profile/${task.owner.profile.slug}`}>
								<p className="font-bold hover:underline">
									{task.owner.name} {task.owner.lastname}
								</p>
							</LinkReact>
							<p className="text-sm text-slate-500">
								Publicaco hace: {task.created_at}
							</p>
						</div>
					</div>
					{context.user && (context.user as IProfile).id === task.own_id && (
						<OwnerOptions id={task.id} fetchTasksData={fetchTasksData} />
					)}
				</div>
				<hr className="mt-3 mb-4" />
				<p>{task.description}</p>
			</Box>
			<Box
				bgColor="white"
				roundedBottom="lg"
				pt={8}
				p={4}
				zIndex={5}
				mt={-1}
				shadow="md"
			>
				{task.comments_lasted[0] ? (
					<React.Fragment>
						<p className="mb-4 text-sm text-slate-500">Ultimo comentario</p>

						<VStack align="flex-start">
							<Comment {...task.comments_lasted[0]} />
							<Link
								as={LinkReact}
								to={`/tasks/${task.slug}`}
								fontWeight="semibold"
								fontSize="xs"
								pt={1}
								display="inline-block"
							>
								Hacer un comentario
							</Link>
						</VStack>
					</React.Fragment>
				) : (
					<React.Fragment>
						<p className="mb-4 text-sm text-slate-500">
							Aun no hay comentarios...
						</p>
						<Link
							as={LinkReact}
							to={`/tasks/${task.slug}/#add-comment`}
							fontWeight="semibold"
							fontSize="xs"
							pt={1}
							display="inline-block"
						>
							Hacer un comentario
						</Link>
					</React.Fragment>
				)}
			</Box>
		</Box>
	);
};

const Comment: FC<IComment> = ({ owner, body }) => {
	return (
		<HStack>
			<Avatar name={`${owner.name} ${owner.lastname}`} size="sm" />
			<Box bgColor="gray.100" py={1} px={3} rounded="lg">
				<Text fontSize="xs" fontWeight="bold">
					<LinkReact to={`/profile/${owner.profile.slug}`}>
						{owner.name} {owner.lastname}
					</LinkReact>
				</Text>
				<Text fontSize="sm">{body}</Text>
			</Box>
		</HStack>
	);
};

export default TaskCard;
