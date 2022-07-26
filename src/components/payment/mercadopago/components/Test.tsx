
import React, {Component, useEffect, useState} from "react";
import Cards from 'react-credit-cards';
import useMercadoPago from "../../../../hooks/useMercadoPago";
import {Helmet} from "react-helmet";
import 'react-credit-cards/es/styles-compiled.css';



const INITIAL_STATE = {
	cvc: "",
	cardExpirationMonth: "",
	cardExpirationYear: "",
	focus: "cardNumber",
	cardholderName: "",
	cardNumber: "",
	issuer: "",
};
type State = typeof INITIAL_STATE;


export const Test = () => {
	let timeoutID: any;
	const [state, setState] = useState(INITIAL_STATE);
	const resultPayment = useMercadoPago();
	// console.log(resultPayment);


	const goInactive = ()  =>{
		// alerting about session expiration and clearing session data
		alert("Your Session expired.Please refresh the page.");

		sessionStorage.clear();
	}
	const goActive = () => {
		//starting timer
		startTimer();
	}

	const resetTimer = () => {
		window.clearTimeout(timeoutID);
		//calling goactive to again starts the timer once it gets reset
		goActive();
	}
	const startTimer = () => {
		//checking after every 1 min
		// wait 30 min before calling goInactive
		timeoutID = window.setTimeout(goInactive, 60000 * 30);
	}

	const removeSpecial = (e:any) => {
		const invalidChars = ["-", "+", "e", "E", " ", "."];
		if (invalidChars.includes(e.key)) {
			e.preventDefault();
		}
	};

	//function to add space after every 4 character in card number
	const addSpace = (e: any) => {
		const { value, id } = e.target;
		const ele = document.getElementById(id) as HTMLInputElement;
		if (value.length === 4 || value.length === 9 || value.length === 14)
			ele.value = ele.value.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
	};

	//function to validate the length of input in case of cvv and replace invalid characters in case of card number
	const validateInput = (e: any) => {
		const { value, maxLength, id } = e.target;
		let temp, ele;
		if (id === "cvv") {
			if (value.length > maxLength) {
				temp = value.slice(0, maxLength);
				ele = document.getElementById(id) as HTMLInputElement;
				ele.value = temp;
				setState({...state,
					[e.target.dataset.name || e.target.name]: ele.value});
			} else {
				setState({ ...state,
					[e.target.dataset.name || e.target.name]: value});
			}
		}
		//works when function is invoked by cardNumber input
		else {
			ele = document.getElementById(id) as HTMLInputElement;
			//if user enters any invalid characters it gets replaced
			ele.value = ele.value.replace(
				/[A-Za-z}"`~_=.\->\]|<?+*/,;[:{\\!@#\/'$%^&*()]/g,
				""
			);
			setState({...state,
				[e.target.dataset.name || e.target.name]: ele.value });
		}
	};

	//function to handle focus on inputz
	const handleInputFocus = (e: any) => {
		setState({...state ,focus: e.target.name });
	};

	//function to handle  input and update the state of variable
	const	handleInputChange = (e :  any ) => {
		const { value, id } = e.target;
		if (id === "cardholderName") {
			const ele = document.getElementById(id) as HTMLInputElement;
			//if user enters any invalid characters it gets replaced
			ele.value = ele.value.replace(
				/[}"`~_=.\->\]|<?+*/,\d;\[:{\\!@#\/'$%^&*()]/g,
				""
			);



			setState({ ...state,
				[e.target.dataset.name || e.target.name]: ele.value });

		} else setState({ ...state,
			[e.target.dataset.name || e.target.name]: value });
	};

		return (
			<div>
				<Helmet>
					<link rel="stylesheet" href="./src/styles/cardstyles/bootstrap.min.css"/>
					<link rel="stylesheet" href="./src/styles/cardstyles/credit-card.css"/>
					<link rel="stylesheet" href="./src/styles/cardstyles/form-style.css"/>
					</Helmet>
				<div className="credit-card ">
					<Cards

						locale={{ valid: "Expires" }}
						placeholders={{ name: "FULL NAME" }}
						cvc={state.cvc}
						expiry={state.cardExpirationMonth + state.cardExpirationYear}
						name={state.cardholderName}
						number={state.cardNumber}
						focused={state.focus}
						brand={state.issuer}
					/>
				</div>
				<div className="card">
					<form id="form-checkout" className="payment-form">

						<div className="form-group">

							<label htmlFor="cardNumber" className="card-label">
								Card Number
							</label>
							<input
								type="number"
								onChange={validateInput}
								value={state.cardNumber}
								onKeyDown={removeSpecial}
								// onPaste={(e) => e.preventDefault()}
								// onKeyPress={addSpace}
								onFocus={handleInputFocus}
								name="cardNumber"
								maxLength={19}
								id="cardNumber"
								className="form-control form-control-lg"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="cardHolder" className="card-label">
								Card holder
							</label>
							<input
								type="text"
								name="cardholderName"
								spellCheck="false"
								value={state.cardholderName}
								maxLength={20}
								autoComplete="off"
								onChange={handleInputChange}
								onFocus={handleInputFocus}
								id="cardholderName"
								className="form-control form-control-lg"
							/>
						</div>
						<div className="date-cvv-box">
								<div className="expiry-class">
									<div className="form-group card-month ">
										<label htmlFor="cardMonth" className="card-label">
											Expiration Date
										</label>

										<select
											id="cardMonth"
											data-ref="cardDate"
											value={state.cardExpirationMonth}
											name="cardExpirationMonth"
											onChange={handleInputChange}
											onFocus={handleInputFocus}
											className="form-control form-control-lg"
										>
											<option value="" defaultChecked={true}>
												Month
											</option>
											<option value="01">01</option>
											<option value="02">02</option>
											<option value="03">03</option>
											<option value="04">04</option>
											<option value="05">05</option>
											<option value="06">06</option>
											<option value="07">07</option>
											<option value="08">08</option>
											<option value="09">09</option>
											<option value="10">10</option>
											<option value="11">11</option>
											<option value="12">12</option>
										</select>
									</div>
									<div className="form-group card-year">
										<select
											id="cardYear"
											data-ref="cardDate"
											value={state.cardExpirationYear}
											name="cardExpirationYear"
											onChange={handleInputChange}
											onFocus={handleInputFocus}
											className="form-control form-control-lg"
										>
											<option value="" defaultChecked={true}>
												Year
											</option>
											<option value="2020">2020</option>
											<option value="2021">2021</option>
											<option value="2022">2022</option>
											<option value="2023">2023</option>
											<option value="2024">2024</option>
											<option value="2025">2025</option>
											<option value="2026">2026</option>
											<option value="2027">2027</option>
											<option value="2028">2028</option>
											<option value="2029">2029</option>
											<option value="2030">2030</option>
											<option value="2031">2031</option>
										</select>
									</div>
								</div>

								<div className="cvv-class form-group">
								<label htmlFor="cardNumber" className="card-label cvv-label">
									CVV
								</label>
								<input
									type="number"
									onChange={validateInput}
									onKeyDown={removeSpecial}
									onPaste={(e) => e.preventDefault()}
									onFocus={handleInputFocus}
									name="cvc"
									id="cvv"
									value={state.cvc}
									className="form-control form-control-lg "
									maxLength={4}
								/>
							</div>
							</div>
						<div className="form-row ">
							<div className="col">
								<label htmlFor="cardMonth" className="card-label">
									Type
								</label>
								<select
									id="form-checkout__identificationType"
									data-ref="IdentificationType"
									name="identificationType"
									onChange={handleInputChange}
									onFocus={handleInputFocus}
									className="form-control form-control-lg"
								>
									<option value="" defaultChecked={true} disabled={true} selected={true}>
										Type
									</option>
									<option value="CC">CC</option>
									<option value="TI">TI</option>

								</select>
							</div>
							<div className="col-8">
								<label htmlFor="cardIdent" className="card-label">
									Identification Number
								</label>
								<input
									type="text"
									name="identificationNumber"
									data-ref="cardDate"
									className="form-control form-control-lg"
									id="form-checkout__identificationNumber"
								/>
							</div>
							<div className="col">
								<select
									name="installments"
									id="form-checkout__installments"
								></select>
							</div>
						</div>

						<div className="form-group">
							<label htmlFor="cardEmail" className="card-label">
								Email
							</label>
							<input
								type="email"
								name="cardholderEmail"
								className="form-control form-control-lg"
								id="form-checkout__cardholderEmail"
								onFocus={handleInputFocus}
							/>
						</div>
						<button
							className="btn btn-primary btn-lg btn-block"
							type="submit"
						>
							Submit
						</button>
						<progress value="0" className="progress-bar">
							Cargando...
						</progress>
					</form>
					{/*{resultPayment && <p>{JSON.stringify(resultPayment)}</p>}*/}
				</div>
			</div>
		);


}
