import { Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/GlobalStates";
import { isAuthenticated } from "../services/AuthService";

import { useCookies } from "react-cookie";
import { FiUser } from "react-icons/fi";

const Navbar = () => {

	const [cookies] = useCookies(["user-token"]);
	const [isUserLogged, setIsUserLogged ] = useState(cookies["user-token"] ? true : false);

	const getUserData = async () => {
		const res = await isAuthenticated(cookies["user-token"]);
		console.log(res);
		if(res) {
			setIsUserLogged(true);
		} else {
			setIsUserLogged(false);
		};
	};

	useEffect(() => {
		if(!isUserLogged) getUserData();
	});

	return (
		<header className="fixed z-50 w-full pl-32 pr-32 bg-white shadow-md bg-opacity-90 h-14 backdrop-blur-sm">
			<div className="flex items-center justify-between w-full h-full">
				<div className="flex items-center h-full">
					<h1 className="text-xl font-bold">📝 Easywork</h1>

					<ul className="flex gap-4 mt-1 ml-8">
						<li>
							<Button fontWeight={"normal"} variant="link">
								Home
							</Button>
						</li>
						<li>
							<Button fontWeight={"normal"} variant="link">
								Acerca de nosotros
							</Button>
						</li>
					</ul>
				</div>
				<div className="flex items-center h-full">
					<Stack direction={"row"}>
					{
						isUserLogged
						?(
							<Button mt={"1"} rightIcon={<FiUser/>} fontWeight={"bold"} variant="link">
								Perfil
							</Button>
						)
						:(
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
						)
					}
					</Stack>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
