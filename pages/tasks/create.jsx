import { useEffect } from 'react';

import {
  Create,
} from '../../src/components/task';

import { useRouter } from 'next/router';

import { useCookies } from 'react-cookie';

import { Layout } from '../../src/components/app/layout';

const CreatePage = () => {
	const [cookies] = useCookies(['user-token']);

  const { push } = useRouter();

  useEffect(() => {
    if (cookies['user-token']) return;
    console.log('no user-token in cookie');
    push('/tasks');
  }, []);

  return (
	  <Layout>
      <Create
      />
		</Layout>
  );
};

export default CreatePage;

