import { Button, Heading, Stack } from "@chakra-ui/react";

const Navbar = () => {
	return (
		<div className="sticky w-full pl-32 pr-32 bg-white bg-opacity-50 shadow-md h-14 backdrop-blur-md">
			<div className="flex items-center justify-between w-full h-full">
				<div className="flex items-center h-full">
					<h1 className="text-xl font-bold">📝 Easywork</h1>

					<ul className="flex gap-4 mt-1 ml-8">
						<li>
							<Button variant="link">
								Home
							</Button>
						</li>
						<li>
							<Button variant="link">
								Acerca de nosotros
							</Button>
						</li>
					</ul>
				</div>
				<div className="flex items-center h-full">
					<Stack direction={"row"}>
						<Button
							colorScheme="blue"
							variant="outline"
						>
							Entrar
						</Button>
						<Button
							colorScheme="blue"
							variant="solid"
						>
							Registrarse
						</Button>
					</Stack>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
