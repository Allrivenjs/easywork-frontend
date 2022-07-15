import { Link } from "@chakra-ui/react";
import { FC } from "react";
import { Link as ReactLink } from "react-router-dom";

interface NavbarLinkButtonsProps {
	to: string;
	content: string;
}

const NavbarLinkButton: FC<NavbarLinkButtonsProps> = ({ to, content }) => {
	return(
		<Link
			as={ReactLink}
			to={to}
			color="gray.500"
		>
			{content}
		</Link>
	);
};

export default NavbarLinkButton
