import { useEffect, useState } from "react";
import useScript from "./useScript";
import { formConfig } from "../components/payment/mercadopago/components/formConfig";
import {config} from "../config";

export default function useMercadoPago() {
	const [resultPayment, setResultPayment] = useState(undefined);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { MercadoPago } = useScript(
		"https://sdk.mercadopago.com/js/v2",
		"MercadoPago"
	);

	useEffect(() => {
		if (MercadoPago) {
			const mp = new MercadoPago(config.MERCADO_PAGO_KEY);
			const cardForm = mp.cardForm({
				amount: "100.5",
				autoMount: true,
				form: formConfig,
				callbacks: {
					onFormMounted: (error:any) => {
						if (error)
							return console.warn(
								"Form Mounted handling error: ",
								error
							);
					},

					onSubmit: (event:any) => {
						event.preventDefault();
						console.log("Form Submitted");
						const {
							paymentMethodId: payment_method_id,
							issuerId: issuer_id,
							cardholderEmail: email,
							amount,
							token,
							installments,
							identificationNumber,
							identificationType,
						} = cardForm.getCardFormData();

						fetch('http://127.0.0.1:8000/api/payments/pay',
							{
								// entry point backend
								method: "POST",
								headers: {
									"Access-Control-Allow-Origin": "*",
									"Access-Control-Request-Method":
										"GET, POST, DELETE, PUT, OPTIONS",
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									token,
									issuer_id,
									payment_method_id,
									transaction_amount: 1000,
									installments: Number(installments),
									description: "Descripción del producto",
									email:email,
									identificationType: identificationType,
									identificationNumber: identificationNumber,

								}),
							}
						)
							.then((res) => res.json())
							.then((data) => {
								setResultPayment(data)
								console.log(data)
							})
							.catch((err) => {
								setResultPayment(err);
								console.log(err);
							});
					},
					onFetching: (resource:any) => {
						// Animate progress bar
						const progressBar = document.querySelector(".progress-bar");
						progressBar?.removeAttribute("value");

						return () => {
							progressBar?.setAttribute("value", "0");
						};
					},
				},
			});
		}
	}, [MercadoPago]);

	return resultPayment;
}
