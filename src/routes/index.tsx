import { useCookies } from "react-cookie";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

// import { AuthProvider } from "../components/GlobalStates";
import Register from "../pages/Register";

const Router = () => {
	let [cookies] = useCookies(['user-token']);

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

					<Route path="/register" element={
                            cookies["user-token"]
                            ?
                                <Navigate  to='/'/>
                            :
                                <Register />
                    }/>

					<Route path="/login" element={
                            cookies["user-token"]
                            ?
                                <Navigate  to='/'/>
                            :
                                <Login />
                    }/>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
