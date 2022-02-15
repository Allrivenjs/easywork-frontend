import { useContext, useEffect, useState } from "react";

import { Avatar, Button, Container, Heading, Spinner } from "@chakra-ui/react";

import { UserData } from "../components/GlobalStates";
import { AiFillStar } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { getUserWithSlug } from "../services/profileService";

interface ProfileState {
	userData: UserData;
	loading: boolean;
}

const ProfileWithSlug = () => {
	const { slug } = useParams();
	const navigate = useNavigate();

	const [profileWithSlugState, setProfileWithSlugState] =
		useState<ProfileState>({
			userData: {
				state: "notAuth",
				name: "",
				lastname: "",
				phone: "",
				profile_photo_path: "",
				email: "",
				birthday: "",
				created_at: "",
				profile: {
					id: 0,
					about: "",
					ranking: 0,
					slug: "",
					user_id: "",
					created_at: "",
				},
			},
			loading: true,
		});

	useEffect(() => {
		const getProfileData = async () => {
			setProfileWithSlugState({
				...profileWithSlugState,
				loading: true,
			});
			const res = await getUserWithSlug(slug as string);
			if (res) {
				setProfileWithSlugState({
					loading: false,
					userData: res,
				});
			} else {
				navigate("/notfound");
			}
		};
		getProfileData();
	}, [slug]);

	return (
		<div className="w-full pt-24 pb-24 bg-slate-100">
			{console.log(profileWithSlugState)}
			{!profileWithSlugState?.loading ? (
				<Container maxW="container.xl">
					<div className="relative bg-red-300 rounded-t-lg h-80">
						<div className="absolute flex -bottom-16 left-6">
							<div className="p-2 bg-white rounded-full">
								<Avatar
									name={`${profileWithSlugState.userData?.name} ${profileWithSlugState.userData?.lastname}`}
									size={"2xl"}
								/>
							</div>
						</div>
					</div>

					<div className="px-6 pt-20 pb-6 bg-white rounded-b-lg">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center">
								<Heading>
									{profileWithSlugState.userData?.name}{" "}
									{profileWithSlugState.userData?.lastname}
								</Heading>
								<p className="ml-2 text-lg text-slate-500">
									(Student)
								</p>
							</div>
							<p className="text-sm text-slate-500">
								Se unio{" "}
								{
									profileWithSlugState.userData?.profile
										.created_at
								}
							</p>
						</div>

						<p className="text-slate-600">
							{profileWithSlugState.userData?.profile.about}
						</p>

						<h3 className="mt-2 text-xl font-bold">Valoración</h3>
						<div className="flex">
							{[
								...Array(
									profileWithSlugState.userData?.profile
										.ranking
								),
							].map((element, i) => {
								return (
									<AiFillStar
										color="#63B3ED"
										size={24}
										key={i}
									/>
								);
							})}
						</div>
						<Button className="mt-4" colorScheme={"blue"}>
							Contactar
						</Button>
					</div>

					<div className="p-6 mt-6 bg-white rounded-lg">Timeline</div>
				</Container>
			) : (
				<div className="flex items-center justify-center w-full h-screen">
					<Spinner size={"xl"} />
				</div>
			)}
		</div>
	);
};

export default ProfileWithSlug;
