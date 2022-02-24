import parse from "html-react-parser";

import { Button } from "@chakra-ui/react";

export interface Link {
	active: boolean;
	label: string;
	url: string;
}

interface PaginationProps {
	links: Array<Link>;
	onClick: (url: string) => void;
}

const Pagination = (props: PaginationProps) => {
	return(
		<div className="flex justify-center w-full">
			{props.links.map((element, i) => {
				return(
					<Button
						mx={1}
						key={i}
						onClick={() => props.onClick(element.url)}
						isDisabled={element.active}
					>
						{parse(element.label)}
					</Button>
				);
			})}
		</div>
	);
};

export default Pagination;
