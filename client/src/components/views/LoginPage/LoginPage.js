import Axios from 'axios';
import { set } from 'mongoose';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onEmailHandler = (e) => {
		setEmail(e.currentTarget.value);
	};

	const onPasswordHandler = (e) => {
		setPassword(e.target.value);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		let body = {
			email: email,
			password: password,
		};

		dispatch(loginUser(body)) // redux 사용할 때
			.then((res) => {
				if (res.payload.loginSuccess) {
					props.history.push('/');
				} else {
					alert('Error!');
				}
			});
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100vh',
			}}
		>
			<form
				style={{ display: 'flex', flexDirection: 'column' }}
				onSubmit={onSubmitHandler}
			>
				<label>Email</label>
				<input type="email" value={email} onChange={onEmailHandler} />
				<label>Password</label>
				<input type="password" value={password} onChange={onPasswordHandler} />
				<br />
				<button>Login</button>
			</form>
		</div>
	);
}

export default LoginPage;
