import { SettingsIcon } from "@chakra-ui/icons";
import {
	Box,
	Center,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";

export const OwnerOptions = () => {
	return (
		<Box>
			<Menu>
				<MenuButton as={IconButton} size="xs">
					<Center>
						<SettingsIcon fontSize={12} />
					</Center>
				</MenuButton>
				<MenuList>
					<MenuItem minH="48px">Borrar</MenuItem>
					<MenuDivider />
					<MenuItem minH="40px">Editar</MenuItem>
				</MenuList>
			</Menu>
		</Box>
	);
};
