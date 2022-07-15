import { FC } from "react";

import { Link } from "react-router-dom";

import logo from "../../assets/svg/logo.svg";

enum LogoSizes {
	small = "small",
	medium = "medium",
	big = "big",
}

interface LogoProps {
	size?: LogoSizes;
}

const Logo: FC<LogoProps> = ({ size }) => {
	return(
		<Link to={"/"}>
			<img className={`w-36`} src={logo} alt="logo" />
		</Link>
	);
};

export default Logo;
