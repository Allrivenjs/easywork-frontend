import { FC, useRef } from "react";

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
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
	useDisclosure,
} from "@chakra-ui/react";

import { deleteTask } from "../../../shared/services/tasksService";

import { useCookies } from "react-cookie";
import { EditModal } from "./EditModal";

interface OwnerOptionsProps {
	id: string;
	fetchTasksData: () => void;
}

export const OwnerOptions: FC<OwnerOptionsProps> = ({ id, fetchTasksData }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenEditModal,
		onOpen: onOpenEditModal,
		onClose: onCloseEditModal,
	} = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement>(null);

	const [cookies] = useCookies(["user-token"]);

	const handleOnDelete = () => {
		deleteTask(cookies["user-token"], id);
		onClose();
		fetchTasksData();
	};

	return (
		<>
			<Box>
				<Menu>
					<MenuButton as={IconButton} size="xs">
						<Center>
							<SettingsIcon fontSize={12} />
						</Center>
					</MenuButton>
					<MenuList>
						<MenuItem minH="48px" onClick={onOpen}>
							Borrar
						</MenuItem>
						<MenuDivider />
						<MenuItem minH="40px" onClick={onOpenEditModal}>Editar</MenuItem>
					</MenuList>
				</Menu>
			</Box>

			<EditModal
				isOpen={isOpenEditModal}
				onClose={onCloseEditModal}
				onOpen={onOpenEditModal}
				task_id={id}
			/>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Borrar tarea
						</AlertDialogHeader>

						<AlertDialogBody>
							¿Estas seguro que quieres eliminar tu tarea? Esta acción no se
							puede revertir.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancelar
							</Button>
							<Button colorScheme="red" onClick={handleOnDelete} ml={3}>
								Borrar
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};
