export * from './components';


/*
import { Suspense } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";

import Login from "../account/Login";

import CreateTask from "./components/Create";
import Task from "./components/TaskPage";
import TasksPage from "./components/List";
import Loader from "../../shared/Loader";

const TaskRouter = () => {
	const [cookies] = useCookies(["user-token"]);

	return(
		<Suspense fallback={<Loader/>}>
			<Routes>
				<Route
					path="/"
					element={
						cookies["user-token"] ? (
							<TasksPage />
						) : (
							<Login />
						)
					}
				/>

				<Route path="/:slug" element={<Task />} />

				<Route
					path="/create"
					element={
						cookies["user-token"] ? (
							<CreateTask />
						) : (
							<Login />
						)
					}
				/>
			</Routes>
		</Suspense>
	);
};

export default TaskRouter;
*/
