import { Link } from "react-router-dom";

const CreateNewTaskBtn = () => {
	return (
		<Link to="/create-task" className="fixed z-50 right-12 bottom-12">
			<div className="px-5 py-3 text-lg font-semibold text-white bg-blue-400 rounded-full shadow-lg hover:bg-blue-500">
				✏️ Publica tu tarea!
			</div>
		</Link>
	);
};

export default CreateNewTaskBtn;
