import { Avatar, Button, Spinner, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useContext } from "react";

import logo from "../assets/svg/logo.svg";
import { AuthContext, UserData } from "./GlobalStates";

interface UserAuthProps {
	userData: boolean | UserData | null | undefined;
}

const UserAuth = (props: UserAuthProps) => {
	if(props.userData === null) {
		return(
			<Spinner></Spinner>
		);
	} else if(props.userData !== false) {
		return(
			<Link to={"/profile"}>
				<div className="flex items-center">
					<p className="mt-1 ml-2 text-gray-500 hover:underline">
						Perfil
					</p>
					<Avatar ml={"2"} size={"sm"} />
				</div>
			</Link>
		);
	} else {
		return(
			<>
				<Link to={"/login"}>
					<Button
						variant="outline"
						colorScheme={"blue"}
					>
						Entrar
					</Button>
				</Link>
				<Link to={"/register"}>
					<Button
						colorScheme={"blue"}
						bg={"blue.400"}
						_hover={{ bg: "blue.500" }}
						variant="solid"
					>
						Registrarse
					</Button>
				</Link>
			</>
		);
	}
};

const Navbar = () => {
	const context = useContext(AuthContext);

	return (
		<header className="fixed z-50 w-full h-16 pl-32 pr-32 bg-white shadow-md bg-opacity-90 backdrop-blur-sm">
			<div className="flex items-center justify-between w-full h-full">
				<div className="flex items-center h-full">
					<Link to={"/"}>
						<img className="w-40" src={logo} alt="logo" />
					</Link>

					<ul className="flex gap-4 mt-1 ml-8">
						<li>
							<Link to={"/"}>
								<p className="text-gray-500 hover:underline">
									Home
								</p>
							</Link>
						</li>
						<li>
							<a href="#hero">
								<p className="text-gray-500 hover:underline">
									Acerca de nosotros
								</p>
							</a>
						</li>
						<li>
							<a href="#features">
								<p className="text-gray-500 hover:underline">
									Nuestros servicios
								</p>
							</a>
						</li>
					</ul>
				</div>
				<div className="flex items-center h-full">
					<Stack direction={"row"}>
						<UserAuth userData={context?.userData} />
					</Stack>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
