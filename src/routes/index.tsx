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
import CoursesPage from "../pages/CoursesPage";
import CoursePage from "../pages/CoursePage";
import TasksPage from "../pages/TasksPage";

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

					<Route path="/" element={<Home />} />

					<Route path="/profile" element={<Profile />} />
					<Route path="/profile/:slug" element={<ProfileWithSlug />} />

					<Route path="/courses" element={<CoursesPage />} />
					<Route path="/course/:slug" element={<CoursePage />} />

					<Route path="/tasks" element={<TasksPage />} />

				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
