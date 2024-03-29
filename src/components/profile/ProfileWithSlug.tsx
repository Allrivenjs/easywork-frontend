import { useEffect, useState } from "react";

import {
	Avatar,
	Box,
	Container,
	Heading,
	Spinner,
} from "@chakra-ui/react";

import { AiFillStar } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { getUserWithSlug } from "../../shared/services/profileService";
import axios from "axios";
import { IProfile } from "../../context/AuthContext/interfaces";
import TaskCard from "../task/components/TaskCard";

const ProfileWithSlug = () => {
	const { slug } = useParams();

	const navigate = useNavigate();

	const [loading, setLoading] = useState<boolean>(true);
	const [profile, setProfile] = useState<IProfile>();

	const source = axios.CancelToken.source();

	const fetchProfileData = async () => {
		setLoading(true);
		const res = await getUserWithSlug(source, slug as string);
		if (res) {
			setProfile(res);
		} else {
			navigate("/notfound");
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchProfileData();
		return () => {
			source.cancel();
		};
	}, [slug]);

	return (
		<div className="w-full pt-24 pb-24 bg-slate-100">
			{!loading ? (
				<Container maxW="container.xl">
					<div className="relative bg-red-300 rounded-t-lg h-80">
						<div className="absolute flex -bottom-16 left-6">
							<div className="p-2 bg-white rounded-full">
								<Avatar
									name={`${profile?.user.name} ${profile?.user.lastname}`}
									size={"2xl"}
									src={profile?.user.profile_photo_path}
								/>
							</div>
						</div>
					</div>

					<div className="px-6 pt-20 pb-6 bg-white rounded-b-lg shadow">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center">
								<Heading>
									{profile?.user.name} {profile?.user.lastname}
								</Heading>
								<p className="ml-2 text-lg text-slate-500">(Student)</p>
							</div>
							<p className="text-sm text-slate-500">
								Se unio {profile?.created_at}
							</p>
						</div>

						<p className="text-slate-600">{profile?.about}</p>

						<h3 className="mt-2 text-xl font-bold">Valoración</h3>
						<div className="flex">
							{[...Array(profile?.ranking)].map((element, i) => {
								return <AiFillStar color="#63B3ED" size={24} key={i} />;
							})}
						</div>
					</div>
					<Box mt={4}>
						{profile?.user.tasks_desc.map((element, i) => (
							<TaskCard key={i} task={element} fetchTasksData={fetchProfileData} />
						))}
					</Box>
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
