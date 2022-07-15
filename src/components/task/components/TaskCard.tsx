import { Avatar, Badge, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { TaskCardProps } from "./List";

const TaskCard = (props: TaskCardProps) => {
	return (
		<div className="p-6 mb-6 bg-white rounded-lg shadow">
			<div className="flex justify-between mb-4">
				<div>
					<Link
						to={`/tasks/${props.slug}`}
					>
						<Heading size={"lg"} className="hover:underline">{props.name}</Heading>
					</Link>
					{props.topics.map((element, i) => {
						return (
							<React.Fragment key={i}>
								<span className="mr-2 text-sm italic bg-gray-100 text-slate-500">
									| {element.name}
								</span>
							</React.Fragment>
						);
					})}
				</div>
				<Badge className="h-fit">{props.difficulty}</Badge>
			</div>
			<div className="flex">
				<Avatar
					name={`${props.owner.name} ${props.owner.lastname}`}
					src={props.owner.profile_photo_path}
				/>
				<div className="ml-3">
					<Link to={`/profile/${props.owner.profile_slug}`}>
						<p className="font-bold hover:underline">
							{props.owner.name} {props.owner.lastname}
						</p>
					</Link>
					<p className="text-sm text-slate-500">
						Publicaco hace: {props.created_at}
					</p>
				</div>
			</div>
			<hr className="mt-3 mb-4" />
			<p>{props.description}</p>
		</div>
	);
};

export default TaskCard;
