import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useCookies } from 'react-cookie';

import {
  Task,
} from '../../src/components/task';

import { Layout } from '../../src/components/app/layout';

const TaskPage = () => {
	const [cookies] = useCookies(['user-token']);

  const { push } = useRouter();

  useEffect(() => {
    if (cookies['user-token']) return;
    console.log('no user-token in cookie');
    push('/tasks');
  }, []);


  return (
		<Layout>
      <Task

      />
		</Layout>
  );
};


export default TaskPage;
