import { Button, Stack } from "@chakra-ui/react";

const Navbar = () => {
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
						<Button
							variant="outline"
							colorScheme={"blue"}
						>
							Entrar
						</Button>
						<Button
							colorScheme={"blue"}
							bg={"blue.400"}
							_hover={{ bg: "blue.500" }}
							variant="solid"
						>
							Registrarse
						</Button>
					</Stack>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
