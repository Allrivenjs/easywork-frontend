import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";

import Home from "../pages/Home";
import Login from "../pages/Login";

import { AuthProvider } from "../components/GlobalStates";

const Router = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route element={
					<AuthProvider>
						<Layout/>
					</AuthProvider>
				}>
					<Route path='/' element={<Home/>} />
					<Route path='/login' element={<Login/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
