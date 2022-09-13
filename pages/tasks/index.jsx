import { Suspense } from 'react';

import { useCookies } from 'react-cookie';

{/*
  *import Login from '../account/Login';
	*/}

import { Layout } from '../../src/components/app/layout';

import {
	List
} from '../../src/components/task';

import { Loader } from '../../src/shared/Loader';

const TasksPage = () => {
  return (
		<Suspense fallback={<Loader/>}>
			<Layout>
				<List
				/>
			</Layout>
		</Suspense>
  );
};

export default TasksPage;
