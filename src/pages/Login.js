import React, { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Form, Button } from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

function Login(props) {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		email: "",
		password: "",
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, result) {
			// console.log(result.data.login)
			context.login(result.data.login);
			props.history.push("/");
		},
		onError(err) {
			setErrors(err.graphQLErrors);
		},
		variables: values,
	});

	function loginUserCallback() {
		loginUser();
	}

	return (
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
				<h1>Login</h1>
				<Form.Input
					label="Email"
					placeholder="Email..."
					name="email"
					value={values.email}
					onChange={onChange}
				/>
				<Form.Input
					label="Password"
					placeholder="Password..."
					name="password"
					type="password"
					value={values.password}
					onChange={onChange}
				/>
				<Button type="submit" primary>
					Login
				</Button>
			</Form>
			{/* err.graphQLErrors[0].message */}
			{Object.values(errors).map((error) => (
				<div className="ui error message">{error.message}</div>
			))}
		</div>
	);
}

const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				id
				name
			}
		}
	}
`;

export default Login;
