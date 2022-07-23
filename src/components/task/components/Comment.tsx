import { FC } from "react";

import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
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
					<Text
						size="base"
						fontWeight="bold"
					>
						{`${owner.name} ${owner.lastname}`}
					</Text>
					<p className="text-sm text-slate-500">
						Publicaco hace:{" "}
						{new Date(created_at).toDateString()}
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
