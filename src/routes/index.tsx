import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

// import { AuthProvider } from "../components/GlobalStates";
import Register from "../pages/Register";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={
						// <AuthProvider>	No pude poner a funcionar el ContextProvider
						// </AuthProvider>	lo hare despues...por ahora, el estado global se maneja en las cookies
						<Layout />
					}
				>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
