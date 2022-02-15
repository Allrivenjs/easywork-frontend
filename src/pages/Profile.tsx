import { useContext, useEffect, useState } from "react";

import { Avatar, Container, Heading, Spinner } from "@chakra-ui/react";

import { AuthContext } from "../components/GlobalStates";
import { AiFillStar } from "react-icons/ai";

const Profile = () => {
	const context = useContext(AuthContext);

	return (
		<div className="w-full pt-24 pb-24 bg-slate-100">
			{context?.userData?.state === "auth" ? (
				<Container maxW="container.xl">
					<div className="relative bg-red-300 rounded-t-lg h-80">
						<div className="absolute flex -bottom-16 left-6">
							<div className="p-2 bg-white rounded-full">
								<Avatar
									name={`${context?.userData?.name} ${context?.userData?.lastname}`}
									size={"2xl"}
								/>
							</div>
						</div>
					</div>

					<div className="px-6 pt-20 pb-6 bg-white rounded-b-lg">
						<div className="flex items-center">
							<Heading className="mb-2">
								{context?.userData?.name}{" "}
								{context?.userData?.lastname}
							</Heading>
							<p className="ml-2 text-lg text-slate-500">(Student)</p>
						</div>
						<p className="text-slate-600">
							{context?.userData?.profile.about}
						</p>
						<h3 className="mt-2 text-xl font-bold">Valoración</h3>
						<div className="flex">
							{[...Array(context?.userData?.profile.ranking)].map(
								(element, i) => {
									return (
										<AiFillStar
											color="#63B3ED"
											size={24}
											key={i}
										/>
									);
								}
							)}
						</div>
						{/* <Button className="mt-4" colorScheme={"blue"}>
							Contactar
						</Button> */}
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

export default Profile;
