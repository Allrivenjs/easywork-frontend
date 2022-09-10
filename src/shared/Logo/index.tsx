import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

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
		<Link href={"/"}>
			<a>
				<Image
					src='/assets/svg/logo.svg'
					width={144}
					height={32}
					alt='logo'
				/>
			</a>
		</Link>
	);
};

export default Logo;
