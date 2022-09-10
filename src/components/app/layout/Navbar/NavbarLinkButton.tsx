import Link from "next/link";
import { FC } from "react";

interface NavbarLinkButtonsProps {
	to: string;
	content: string;
}

const NavbarLinkButton: FC<NavbarLinkButtonsProps> = ({ to, content }) => {
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

export default NavbarLinkButton
