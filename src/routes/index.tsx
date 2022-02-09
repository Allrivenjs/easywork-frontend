import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";

import Home from "../pages/Home";

const Router = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route element={<Layout/>}>
					<Route path='/' element={<Home/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
