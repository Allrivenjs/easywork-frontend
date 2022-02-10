import { Avatar, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useCookies } from "react-cookie";
import { FiUser } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
	const [cookies] = useCookies(["user-token"]);
	const [isUserLogged, setIsUserLogged] = useState(
		cookies["user-token"] ? true : false
	);

	return (
		<header className="fixed z-50 w-full pl-32 pr-32 bg-white shadow-md bg-opacity-90 h-14 backdrop-blur-sm">
			<div className="flex items-center justify-between w-full h-full">
				<div className="flex items-center h-full">
					<Link to={"/"}>
						<h1 className="text-xl font-bold">📝 Easywork</h1>
					</Link>

					<ul className="flex gap-4 mt-1 ml-8">
						<li>
							<Link to={"/"}>
								<p className="text-gray-500 hover:underline">Home</p>
							</Link>
						</li>
						<li>
							<a href="#hero">
								<p className="text-gray-500 hover:underline">Acerca de nosotros</p>
							</a>
						</li>
						<li>
							<a href="#features">
								<p className="text-gray-500 hover:underline">Nuestros servicios</p>
							</a>
						</li>
					</ul>
				</div>
				<div className="flex items-center h-full">
					<Stack direction={"row"}>
						{isUserLogged ? (
							<Link
								to={"/profile"}
							>
								<div className="flex items-center">
									<p className="mt-1 ml-2 text-gray-500 hover:underline">Perfil</p>
									<Avatar ml={"2"} size={"sm"}/>
								</div>
							</Link>
						) : (
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
						)}
					</Stack>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
