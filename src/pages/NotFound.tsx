import { Link, useNavigate } from "react-router-dom";

import cat from "../assets/svg/404.svg";

const NotFound = () => {
	const navigate = useNavigate();
	return(
		<div className="flex items-center w-screen h-screen bg-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row">
                <div className="max-w-md">
                    <div className="text-5xl font-bold font-dark">404</div>
                    <p
                        className="text-2xl font-light leading-normal md:text-3xl"
                    >
                        Lo sentimos, no pudimos encontrar esta página
                    </p>
                    <p className="mb-8">Pero no te preocupes, puedes encontrar muchas otras cosas en nuestra <Link to={"/"} className="text-blue-500 hover:underline">homepage</Link></p>

                    <button
                        className="inline px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue active:bg-blue-600 hover:bg-blue-700"
                        onClick={() => navigate("/")}
                    >
                        Go to home
                    </button>
                </div>
                <div className="max-w-lg">
                    <img className='w-96' src={cat} alt='404'></img>
                </div>
            </div>
        </div>
	);
};

export default NotFound;
