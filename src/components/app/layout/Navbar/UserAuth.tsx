import {
	Avatar,
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Spinner
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useCookies } from "react-cookie";

import { IProfile } from "../../../../context/AuthContext/interfaces";
import { logout } from "../../../../shared/services/authService";

interface UserAuthProps {
	user: IProfile | null | boolean;
}

export const UserAuth = (props: UserAuthProps) => {
	const [cookies, , removeCookie] = useCookies(["user-token"]);
	const { push } = useRouter();

	const methodLoguot = async () => {
		await logout(cookies["user-token"]);
		removeCookie("user-token");
		push("/");
	};

	if (props.user === null) {
		return <Spinner></Spinner>;
	} else if (props.user) {
		return (
			<Flex alignItems={"center"} >
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
							src={(props.user as IProfile).user.profile_photo_path}
						/>
					</MenuButton>
					<MenuList>
						<Link href="/profile">
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
				<Link href={"/login"}>
					<Button variant="outline" colorScheme={"blue"}>
						Entrar
					</Button>
				</Link>
				<Link href={"/register"}>
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
