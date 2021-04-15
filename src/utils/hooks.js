import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
	const [values, setValues] = useState(initialState);

	// const onChange = (event) => {
	//     setValues({ ...values, [event.target.name]: event.target.value })
	// }

	const onChange = (event, result) => {
		const { name, value } = result || event.target;
		setValues({ ...values, [name]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		callback();
	};

	return {
		onChange,
		onSubmit,
		values,
	};
};
