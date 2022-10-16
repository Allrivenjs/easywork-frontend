import Link from 'next/link';

import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	Spinner,
} from '@chakra-ui/react';

import { AnimatePresence, motion } from 'framer-motion';

import { useLogin } from '../hooks/useLogin';

export const LoginPage = () => {
	const {
		loading,
		onSubmit,
		register,
	} = useLogin();

	/*
	const handleOnSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		dispatch( startLoginWithEmailAndPassword({ email: 'pello', password: 'loco' }) );

			const token = await loginWithEmailAndPassword(user);
			setLoading(false);
			if (token) {
			  push('/profile');
			} else {
			  toast({
			    title: 'Algo ha salido mal',
			    description: 'Usuario y/o contraseña incorrectos',
			    status: 'error',
			    duration: 9000,
			    isClosable: true,
			  });
			}
		}
	};
	*/

	return (
		<Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<AnimatePresence>
					<motion.div
						animate={{ x: [500, 0], opacity: [0, 1] }}
						transition={{ duration: 0.5 }}
						exit={{ opacity: 0, x: 500 }}
					>
						<Stack align={'center'} mb={6}>
							<Heading fontSize={'4xl'}>
								Inicia sesión en tu cuenta
							</Heading>
							<Text fontSize={'lg'} color={'gray.600'}>
								o si aun no tienes cuenta,{' '}
								<Link
									href='/auth/register'
									className='text-blue-400'
								>
									registrate
								</Link>{' '}
								✌️
							</Text>
						</Stack>
						<Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
							<form onSubmit={onSubmit}>
								<Stack spacing={4}>
									<FormControl id='email'>
										<FormLabel htmlFor='email'>
											Correo electronico
										</FormLabel>
										<Input
											{...register('email')}
											type='email'
											required
											autoComplete={'email'}
											autoFocus
										/>
									</FormControl>
									<FormControl id='password'>
										<FormLabel htmlFor='password'>
											Contraseña
										</FormLabel>
										<Input
											{...register('password')}
											type='password'
											required
											autoComplete={'current-password'}
										/>
									</FormControl>
									<Stack spacing={10}>
										{/* <Stack
									direction={{ base: 'column', sm: 'row' }}
									align={'start'}
									justify={'space-between'}
								>
									<Checkbox>Remember me</Checkbox>
									<Link color={'blue.400'}>
										¿Olvidaste tu contraseña?
									</Link>
								</Stack> */}
										<Button
											isDisabled={loading}
											type='submit'
											bg={'blue.400'}
											color={'white'}
											_hover={{
												bg: 'blue.500',
											}}
										>
											{loading ? (
												<Spinner />
											) : (
												<>Iniciar sesión</>
											)}
										</Button>
									</Stack>
								</Stack>
							</form>
						</Box>
					</motion.div>
				</AnimatePresence>
			</Stack>
		</Flex>
	);
};
