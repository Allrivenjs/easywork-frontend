import {
	Avatar,
	Button,
	Spinner,
	Stack,
	Flex,
	MenuList,
	Menu,
	MenuButton,
	MenuItem,
	MenuDivider,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./../services/authService";
import { useContext } from "react";
import { useCookies } from "react-cookie";

import logo from "../assets/svg/logo.svg";
import { AuthContext, UserData } from "./GlobalStates";

interface UserAuthProps {
	userData: UserData | null | undefined;
}

const UserAuth = (props: UserAuthProps) => {
	const [cookies, , removeCookie] = useCookies(["user-token"]);
	const navigate = useNavigate();

	const methodLoguot = async () => {
		await logout(cookies["user-token"]);
		removeCookie("user-token");
		navigate("/");
	};

	if (props.userData === null) {
		return <Spinner></Spinner>;
	} else if (props.userData?.state === "auth") {
		return (
			<Flex alignItems={"center"}>
				<Menu>
					<MenuButton
						as={Button}
						rounded={"full"}
						variant={"link"}
						cursor={"pointer"}
						minW={0}
					>
						<Avatar
							size={"sm"}
							src={`${
								props.userData?.profile_photo_path
									? props.userData?.profile_photo_path
									: ""
							}`}
						/>
					</MenuButton>
					<MenuList>
						<Link to="/profile">
							<MenuItem>

									<div className="flex items-center">
										<p className="mt-1 ml-2 text-gray-500 hover:underline">
											Perfil
										</p>
									</div>
							</MenuItem>
						</Link>
						<MenuDivider />
						<MenuItem onClick={methodLoguot}>
							<div className="flex items-center">
								<p className="mt-1 ml-2 text-gray-500 hover:underline">
									Cerrar sesion
								</p>
							</div>
						</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		);
	} else {
		return (
			<>
				<Link to={"/login"}>
					<Button variant="outline" colorScheme={"blue"}>
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
