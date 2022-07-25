import { Route, Routes } from "react-router-dom";
import { Test } from "./components/Test";


export const PaymentMercadoPagoRouter = () => {
	return(
		<Routes>
			<Route path="/" element={<Test />} />
		</Routes>
	);
};
