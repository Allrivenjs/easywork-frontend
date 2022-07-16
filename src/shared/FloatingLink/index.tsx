import { FC } from "react";

import { Link } from "react-router-dom";

interface FloatingButtonProps {
	to: string;
	children: string;
}

const FloatingLink: FC<FloatingButtonProps> = ({ to, children }) => {
	return (
		<Link to={to} className="fixed z-50 right-12 bottom-12">
			<div className="px-5 py-3 text-lg font-semibold text-white bg-blue-400 rounded-full shadow-lg hover:bg-blue-500">
				{children}
			</div>
		</Link>
	);
};

export default FloatingLink;
