import { useCookies } from "react-cookie";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

import { AuthProvider } from "../components/GlobalStates";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ProfileWithSlug from "../pages/ProfileWithSlug";

const Router = () => {
	const [cookies] = useCookies(["user-token"]);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={
						<AuthProvider>
							<Layout />
						</AuthProvider>
					}
				>
					<Route path="/" element={<Home />} />

					<Route path="/profile" element={<Profile />} />
					<Route path="/profile/:slug" element={<ProfileWithSlug />} />

					<Route
						path="/register"
						element={
							cookies["user-token"] ? (
								<Navigate to="/" />
							) : (
								<Register />
							)
						}
					/>

					<Route
						path="/login"
						element={
							cookies["user-token"] ? (
								<Navigate to="/" />
							) : (
								<Login />
							)
						}
					/>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
