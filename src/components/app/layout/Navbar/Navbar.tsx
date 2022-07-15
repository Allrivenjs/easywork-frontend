import {
	Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext } from "react";

import logo from "../../../../assets/svg/logo.svg";
import { AuthContext } from "../../../../context/GlobalStates";
import UserAuth from "./UserAuth";

const Navbar = () => {
	const context = useContext(AuthContext);

	return (
		<header className="fixed z-50 w-full h-16 pl-2 pr-2 bg-white shadow-md xl:pl-32 xl:pr-32 lg:pl-8 lg:pr-8 bg-opacity-90 backdrop-blur-sm ">
			<div className="flex items-center justify-between w-full h-full">
				<div className="flex items-center h-full">
					<Link to={"/"}>
						<img className="w-40" src={logo} alt="logo" />
					</Link>

					<ul className="flex hidden gap-4 mt-1 ml-8 lg:flex">
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
						<li>
							<Link to={"/courses"}>
								<p className="text-gray-500 hover:underline">
									Cursos
								</p>
							</Link>
						</li>
						<li>
							<Link to={"/tasks"}>
								<p className="text-gray-500 hover:underline">
									Tareas
								</p>
							</Link>
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
