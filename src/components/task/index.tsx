import { Suspense } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";

import Login from "../account/Login";

import CreateTask from "./components/Create";
import TaskPage from "./components/TaskPage";
import TasksPage from "./components/List";

const TaskRouter = () => {
	const [cookies] = useCookies(["user-token"]);

	return(
		<Suspense fallback={<div>loading</div>}>
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

				<Route path="/task/:slug" element={<TaskPage />} />

				<Route
					path="/create-task"
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
