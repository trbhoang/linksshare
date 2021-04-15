import React from "react";
// import React, { useState, useContext } from 'react';
// import { useMutation, gql } from '@apollo/client';
// import { Form, Button } from 'semantic-ui-react';

// import { useForm } from '../utils/hooks'
// import { AuthContext } from '../context/auth';

function Register(props) {
	return (
		<>
			<h3>
				Registrations are currently disabled. This is temp, running some tests!
			</h3>
			<p>
				I am still working on making the site scalable, need help from more
				experienced developers with UI and specially pagination in UI. Have any
				suggestions, want to help contact me on
				<a href="https://twitter.com/realArcherL"> twitter</a>.
				<br />
				<br />
				Aslo, would like to fund this project? Read more about this project{" "}
				<a href="https://leviwof.medium.com/linkshare-many-problems-one-solution-3f7c85d150e6">
					here
				</a>
			</p>
		</>
	);
	//   const context = useContext(AuthContext)
	//   const [errors, setErrors] = useState({})

	//   const { onChange, onSubmit, values } = useForm(registerUser, {
	//     username: '',
	//     email: '',
	//     password: '',
	//     confirmPassword: '',
	//   })

	//   const [addUser, { loading }] = useMutation(REGISTER_USER, {
	//     update(_, result) {
	//       context.login(result.data.signup)
	//       props.history.push('/')
	//     },
	//     onError(err) {
	//       setErrors(err.graphQLErrors);
	//     },
	//     variables: values
	//   })

	//   function registerUser() {
	//     addUser();
	//   }

	//   return (
	//     <div className="form-container">
	//       <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
	//         <h1>Register</h1>
	//         <Form.Input
	//           label="Username"
	//           placeholder="Username..."
	//           name="username"
	//           value={values.username}
	//           onChange={onChange}
	//         />
	//         <Form.Input
	//           label="Email"
	//           placeholder="Email..."
	//           name="email"
	//           value={values.email}
	//           onChange={onChange}
	//         />
	//         <Form.Input
	//           label="Password"
	//           placeholder="Password..."
	//           name="password"
	//           type="password"
	//           value={values.password}
	//           onChange={onChange}
	//         />
	//         <Form.Input
	//           label="Confim Password"
	//           placeholder="Confim Password..."
	//           name="confirmPassword"
	//           type="password"
	//           value={values.confirmPassword}
	//           onChange={onChange}
	//         />
	//         <Button type="submit" primary>
	//           Register
	//         </Button>
	//       </Form>
	//       {/* err.graphQLErrors[0].message */}
	//       {Object.values(errors).map(error =>
	//         <div className="ui error message">{error.message}</div>
	//       )}
	//     </div>
	//   );
}

// const REGISTER_USER = gql`
//   mutation signUp(
//     $username: String!
//     $email: String!
//     $password: String!
//     $confirmPassword: String!
//   ){
//     signup(
//     username: $username
//     email: $email
//     password: $password
//     confirmPassword: $confirmPassword
//   ) {
//     token
//     user {
//       id
//       name
//     }
//   }
// }`

export default Register;
