import { FC } from "react";

import { Link as LinkReact } from "react-router-dom";

import { Avatar, Box, HStack, Link, Text } from "@chakra-ui/react";
import { IComment } from "./interface";

export const Comment: FC<IComment> = ({ body, replies, created_at, owner }) => {
	return(
		<Box

		>
			<HStack
			>
				<Avatar
					name={`${owner.name} ${owner.lastname}`}
				/>
				<Box
				>
					<Link
						as={LinkReact}
						to={`/profile/${owner.id}`}
						size="base"
						fontWeight="bold"
					>
						{`${owner.name} ${owner.lastname}`}
					</Link>
					<p className="text-sm text-slate-500">
						Publicaco hace:{" "}
						<span>{created_at}</span>
					</p>
				</Box>
			</HStack>

			<Text
				my={4}
				ml={14}
			>
				{body}
			</Text>

			<hr className="mb-4"/>
		</Box>
	);
};
