import Link from "next/link";
import { FC } from "react";

interface NavbarLinkButtonsProps {
	to: string;
	content: string;
}

export const NavbarLinkButton: FC<NavbarLinkButtonsProps> = ({ to, content }) => {
	return(
		<Link
			href={to}
			color="gray.500"
		>
			<a>
				{content}
			</a>
		</Link>
	);
};
