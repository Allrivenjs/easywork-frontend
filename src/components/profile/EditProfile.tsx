import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Text,
	Textarea,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { useCookies } from "react-cookie";

import { useForm } from "react-hook-form";
import { IProfile } from "../../context/AuthContext/interfaces";
import {
	updateProfile,
	updateUser,
} from "../../shared/services/profileService";

interface EditProfileProps {
	user: IProfile | boolean;
}

export const EditProfile: FC<EditProfileProps> = ({ user }) => {
	const [cookies] = useCookies(["user-token"]);

	return (
		<Box bgColor="white" rounded="lg" shadow="base" py={8} px={12} mt={4}>
			<Heading size="lg">Edita tu información personal</Heading>
			<hr className="my-4" />
			<Text fontWeight="bold" fontSize="xl" mb={4}>
				Información de usuario
			</Text>

			<UserForm
				token={cookies["user-token"]}
				birthday={(user as IProfile).user.birthday}
				lastname={(user as IProfile).user.lastname}
				name={(user as IProfile).user.name}
				phone={(user as IProfile).user.phone}
			/>

			<hr className="my-4" />
			<Text fontWeight="bold" fontSize="xl" mb={4}>
				Información del perfil
			</Text>

			<ProfileForm
				token={cookies["user-token"]}
				about={(user as IProfile).about}
			/>
		</Box>
	);
};

interface ProfileFormProps {
	token: string;
	about: string;
}

const ProfileForm: FC<ProfileFormProps> = ({ token, about }) => {
	const toast = useToast();

	const { register, handleSubmit } = useForm();

	const onSubmit = async (data: any) => {
		const res = await updateProfile(token, data);
		if (res) {
			location.reload();
			toast({
				title: "Exito",
				description: "Formulario enviado con exito",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Error",
				description:
					"Error al intentar enviar el formulario, por favor revisa los datos",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<VStack spacing={4}>
				<HStack w="full">
					<FormControl>
						<FormLabel>Descripción</FormLabel>
						<Textarea {...register("about")} defaultValue={about} w={400} />
					</FormControl>
					<p className="text-sm text-slate-500">
						Una breve descripción de tu persona para que los demás puedan darse
						una idea de ti. Minimo 50 caracteres.
					</p>
				</HStack>
				<Button colorScheme="blue" alignSelf="flex-end" type="submit">
					Enviar
				</Button>
			</VStack>
		</form>
	);
};

interface UserFormProps {
	token: string;
	name: string;
	lastname: string;
	phone: string;
	birthday: Date;
}

const UserForm: FC<UserFormProps> = ({
	token,
	birthday,
	lastname,
	name,
	phone,
}) => {
	const toast = useToast();
	const { register, handleSubmit } = useForm();

	const onSubmit = async (data: any) => {
		const res = await updateUser(token, data);
		if (res) {
			location.reload();
			toast({
				title: "Exito",
				description: "Formulario enviado con exito",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Error",
				description:
					"Error al intentar enviar el formulario, por favor revisa los datos",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<VStack spacing={4}>
				<HStack w="full">
					<FormControl>
						<FormLabel>Nombre</FormLabel>
						<Input {...register("name")} defaultValue={name} w={400} />
					</FormControl>
					<p className="text-sm text-slate-500">
						Tu nombre será visible por otros usuarios y podrán encontrarte por
						el
					</p>
				</HStack>
				<HStack w="full">
					<FormControl>
						<FormLabel>Apellido</FormLabel>
						<Input {...register("lastname")} defaultValue={lastname} w={400} />
					</FormControl>
					<p className="text-sm text-slate-500">
						Tu apellido será visible por otros usuarios y podrán encontrarte por
						el
					</p>
				</HStack>
				<HStack w="full">
					<FormControl>
						<FormLabel>Número de contacto</FormLabel>
						<Input {...register("phone")} defaultValue={phone} w={400} />
					</FormControl>
					<p className="text-sm text-slate-500">
						Tu número de contacto podrá ser visible por aquellos que quieran
						contactarte
					</p>
				</HStack>
				<HStack w="full">
					<FormControl>
						<FormLabel>Fecha de nacimiento</FormLabel>
						<Input
							{...register("birthday")}
							type="date"
							defaultValue={new Date(birthday) as any}
							w={400}
						/>
					</FormControl>
					<p className="text-sm text-slate-500">
						Tu fecha de nacimiento no será visible para todos los usuarios
					</p>
				</HStack>
				<Button colorScheme="blue" alignSelf="flex-end" type="submit">
					Enviar
				</Button>
			</VStack>
		</form>
	);
};
