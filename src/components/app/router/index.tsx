import { useCookies } from "react-cookie";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "../../../context/AuthContext";

import Layout from "../layout";
import NotFound from "../../../shared/NotFound";

import { lazy, Suspense } from "react";
import Register from "../../account/Register";
import Login from "../../account/Login";
import Home from "../../home";
import Profile from "../../profile/Profile";
import ProfileWithSlug from "../../profile/ProfileWithSlug";
import CoursesPage from "../../courses/components/CoursesPage";
import CoursePage from "../../courses/components/CoursePage";
import Loader from "../../../shared/Loader";

const TaskRouter = lazy(() => import("../../task"));

const Router = () => {
	const [cookies] = useCookies(["user-token"]);

	return (
		<Suspense fallback={<Loader/>}>
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

					<Route path="/tasks/*" element={<TaskRouter />} />



				</Route>

				<Route path="/course/:slug" element={<CoursePage />} />

				<Route path="*" element={<NotFound />} />

			</Routes>
		</BrowserRouter>
		</Suspense>
	);
};

export default Router;
