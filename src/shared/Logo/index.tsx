import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
	return(
		<Link href={"/"}>
			<a>
				<Image
					src='/assets/svg/logo.svg'
					width={144}
					height={48}
					alt='logo'
				/>
			</a>
		</Link>
	);
};
