import { Avatar, Box, Container, Heading, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { AiFillStar } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { IProfile } from "../../context/AuthContext/interfaces";
import { getTasksByUser } from "../../shared/services/tasksService";
import { ITask } from "../task/components/interface";
import TaskCard from "../task/components/TaskCard";
import { EditProfile } from "./EditProfile";

const Profile = () => {
	const [tasks, setTasks] = useState<Array<ITask>>();
	const { user } = useAuth();

	const [cookies] = useCookies(["user-token"]);

	const source = axios.CancelToken.source();
	const fetchProfileData = async () => {
		const res = await getTasksByUser(cookies["user-token"], source);
		if (res) {
			setTasks(res.data);
		}
	};

	useEffect(() => {
		fetchProfileData();
		return () => {
			source.cancel();
		};
	}, []);

	return (
		<div className="w-full pt-24 pb-24 bg-slate-100">
			{user ? (
				<Container maxW="container.xl">
					<div className="relative bg-red-300 rounded-t-lg h-80">
						<div className="absolute flex -bottom-16 left-6">
							<div className="p-2 bg-white rounded-full">
								<Avatar
									name={`${(user as IProfile).user.name} ${
										(user as IProfile).user.lastname
									}`}
									src={(user as IProfile).user.profile_photo_path}
									size={"2xl"}
								/>
							</div>
						</div>
					</div>

					<div className="px-6 pt-20 pb-6 bg-white shadow">
						<div className="flex items-center">
							<Heading className="mb-2">
								{(user as IProfile).user.name}{" "}
								{(user as IProfile).user.lastname}
							</Heading>
							<p className="ml-2 text-lg text-slate-500">(Student)</p>
						</div>
						<p className="text-slate-600">{(user as IProfile).about}</p>
						<h3 className="mt-2 text-xl font-bold">Valoración</h3>
						<div className="flex">
							{[...Array((user as IProfile).ranking)].map((element, i) => {
								return <AiFillStar color="#63B3ED" size={24} key={i} />;
							})}
						</div>
					</div>

					<Tabs>
						<TabList
							bgColor="white"
							roundedBottom="lg"
							shadow="base"
						>
							<Tab>Tareas publicadas</Tab>
							<Tab>Información personal</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<Box mt={4}>
									{tasks?.map((element, i) => (
										<TaskCard key={i} {...element} />
									))}
								</Box>
							</TabPanel>
							<TabPanel
								p={0}
							>
								<EditProfile
									user={user}
								/>
							</TabPanel>
						</TabPanels>
					</Tabs>
					</Container>
			) : (
				<div className="flex items-center justify-center w-full h-screen">
					<Spinner size={"xl"} />
				</div>
			)}
		</div>
	);
};

export default Profile;
