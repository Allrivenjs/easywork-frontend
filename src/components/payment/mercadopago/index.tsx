import { Route, Routes } from "react-router-dom";
import { Test } from "./components/Test.jsx";


export const PaymentMercadoPagoRouter = () => {
	return(
		<Routes>
			<Route path="/" element={<Test />} />
		</Routes>
	);
};
