import { FC } from 'react';

import {
	Avatar,
	Box,
	Container,
	Heading,
	Spinner,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs
} from '@chakra-ui/react';

import { AiFillStar } from 'react-icons/ai';

{/*
  *import { getTasksByUser } from '../../src/shared/services/tasksService';
  *
  *import { ITask } from '../../src/components/task/components/interface';
  *
  *import { TaskCard } from '../../src/components/task/components';
	*/}

import { IProfile } from '../../store/auth/interfaces';

import { EditProfile } from '../../components/profile/EditProfile';

interface ProfilePageProps {
  userProfile: IProfile;
};

export const ProfilePage: FC<ProfilePageProps> = ({ userProfile }) => {
	// const [tasks, setTasks] = useState<Array<ITask>>();

	return (
		<div className='w-full pt-24 pb-24 bg-slate-100'>
			{userProfile ? (
				<Container maxW='container.xl'>
					<div className='relative bg-red-300 rounded-t-lg h-80'>
						<div className='absolute flex -bottom-16 left-6'>
							<div className='p-2 bg-white rounded-full'>
								<Avatar
									name={`${userProfile.user.name} ${
										userProfile.user.lastname
									}`}
									src={userProfile.user.profile_photo_path}
									size={'2xl'}
								/>
							</div>
						</div>
					</div>

					<div className='px-6 pt-20 pb-6 bg-white shadow'>
						<div className='flex items-center'>
							<Heading className='mb-2'>
								{userProfile.user.name}{' '}
								{userProfile.user.lastname}
							</Heading>
							<p className='ml-2 text-lg text-slate-500'>(Student)</p>
						</div>
						<p className='text-slate-600'>{userProfile.about}</p>
						<h3 className='mt-2 text-xl font-bold'>Valoración</h3>
						<div className='flex'>
							{[...Array(userProfile.ranking)].map((_, i) => (
                <AiFillStar color='#63B3ED' size={24} key={i} />
							))}
						</div>
					</div>

					<Tabs>
						<TabList
							bgColor='white'
							roundedBottom='lg'
							shadow='base'
						>
							<Tab>Tareas publicadas</Tab>
							<Tab>Información personal</Tab>
						</TabList>
						<TabPanels>
							<TabPanel
								p={0}
							>
								{/*
									*<Box mt={4}>
									*  {tasks?.map((element, i) => (
									*    <TaskCard key={i} task={element} fetchTasksData={fetchProfileData} />
									*  ))}
									*</Box>
									*/}
							</TabPanel>
							<TabPanel
								p={0}
							>
								<EditProfile
									user={userProfile}
								/>
							</TabPanel>
						</TabPanels>
					</Tabs>
					</Container>
			) : (
				<div className='flex items-center justify-center w-full h-screen'>
					<Spinner size={'xl'} />
				</div>
			)}
		</div>
	);
};
