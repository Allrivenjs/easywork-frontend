import { CourseCardProps } from "../pages/CoursesPage";

import { Badge } from '@chakra-ui/react'
import { Link } from "react-router-dom";

const CourseCard = (props: CourseCardProps) => {
	return (
		<Link
			to={`/course/${props.slug}`}
		>
			<div className="flex w-full h-48 mb-4 shadow">
				<img
					src={
						props.image
							? props.image
							: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
					}
					alt={props.name}
					className="object-cover w-64 rounded-l-lg"
				/>
				<div className="flex flex-col p-4 bg-white rounded-r-lg justify-evenly">
					<div className="flex items-center mb-2">
						<h3 className="mr-2 text-xl font-bold">{props.name}</h3>
						<Badge colorScheme="green">NEW</Badge>
					</div>

					<p className="mb-2 overflow-hidden h-36 text-slate-700 text-ellipsis">{props.description}</p>

					<div className="flex justify-between">
						<p className="text-sm">Publicado por: <span className="text-blue-500 hover:underline hover:cursor-pointer">{props.owner}</span> </p>
						<p className="text-sm text-slate-500">Creado hace {props.created_at}</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CourseCard;
