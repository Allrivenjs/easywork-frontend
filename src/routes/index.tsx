import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";

import Home from "../pages/Home";
import Login from "../pages/Login";

import { AuthProvider } from "../components/GlobalStates";
import Register from "../pages/Register";

const Router = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route element={
					<AuthProvider>
						<Layout/>
					</AuthProvider>
				}>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
