import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
	const [values, setValues] = useState(initialState);

	const onChange = (event, result) => {
		const { name, value } = result || event.target;
		values[name] = value;
		setValues({...values});
		callback({ variables: values });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		callback({ variables: values });
	};

	return {
		onChange,
		onSubmit,
		values,
	};
};
