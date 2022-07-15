import { Route, Routes } from "react-router-dom";

const ChatRouter = () => {
	return(
		<Routes>
            <Route
				path="/"
				element={<>chat</>}
			/>
        </Routes>
	);
};

export default ChatRouter;
