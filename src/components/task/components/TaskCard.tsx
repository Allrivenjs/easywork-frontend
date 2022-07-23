import { Avatar, Badge, Box, Heading, HStack, Link, Stack, Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";
import { Link as LinkReact } from "react-router-dom";
import { TaskCardProps } from "./List";

const TaskCard = (props: TaskCardProps) => {
	return (
		<Box
			mb={6}
			position="relative"
		>
			<Box
				p={6}
				bgColor="white"
				rounded="lg"
				zIndex={100}
				position="relative"
				shadow="md"
			>
				<div className="flex justify-between mb-4">
					<div>
						<LinkReact
							to={`/tasks/${props.slug}`}
						>
							<Heading size={"lg"} className="hover:underline">{props.name}</Heading>
						</LinkReact>
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
						<LinkReact to={`/profile/${props.owner.profile_slug}`}>
							<p className="font-bold hover:underline">
								{props.owner.name} {props.owner.lastname}
							</p>
						</LinkReact>
						<p className="text-sm text-slate-500">
							Publicaco hace: {props.created_at}
						</p>
					</div>
				</div>
				<hr className="mt-3 mb-4" />
				<p>{props.description}</p>
			</Box>
			<Box
				bgColor="white"
				roundedBottom="lg"
				pt={8}
				p={4}
				zIndex={10}
				mt={-1}
				shadow="md"
			>
				<p className="mb-4 text-sm text-slate-500">
					Last comment
				</p>

				<VStack
					align="flex-start"
				>
					<Commnet
						name="Test Sánchez"
						comment="This is a comment test"
					/>

					<Link
						as={LinkReact}
						to={`/tasks/${props.slug}`}
						fontWeight="semibold"
						fontSize="xs"
						pt={1}
						display="inline-block"
					>
						Hacer un comentario
					</Link>
				</VStack>
			</Box>
		</Box>
	);
};

interface CommnetProps {
	name: string;
	comment: string;
}

const Commnet: FC<CommnetProps> = ({ name, comment }) => {
	return(
		<HStack>
			<Avatar
				name={name}
				size="sm"
			/>
			<Box
				bgColor="gray.100"
				py={1}
				px={3}
				rounded="lg"
			>
				<Text
					fontSize="xs"
					fontWeight="bold"
				>
					{name}
				</Text>
				<Text
					fontSize="sm"
				>
					{comment}
				</Text>
			</Box>
		</HStack>
	);
};

export default TaskCard;
