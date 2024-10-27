import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, Notification } from '../../components';
import { verificationUser } from '../../api';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from './constants/constants';

const loginScheme = yup.object().shape({
	email: yup
		.string()
		.required('Заполните поле электронной почты')
		.matches(EMAIL_REGEXP, 'Неверно заполнено поле электронной почты')
		.min(5, 'Неверно заполнено электронной почты. Минимум 5 символа'),
	password: yup
		.string()
		.required('Заполните поле пароль')
		.matches(
			PASSWORD_REGEXP,
			'Неверный пароль. Должен содержать число, спецсимвол, латинскую букву в нижнем и врехнем регистре',
		)
		.min(6, 'Неверный пароль. Должно быть не меньше 6 символов')
		.max(20, 'Неверный пароль. Должно быть не больше 20 символов'),
});

export const Login = () => {
	const [notification, setNotification] = useState(null);
	const navigate = useNavigate();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(loginScheme),
	});

	const error = errors.email?.message || errors.password?.message;

	const onSubmit = ({ email, password }) => {
		verificationUser(email, password)
			.then((req) => {
				if (req.ok) {
					navigate('/orders');
				} else {
					return req.text();
				}
			})
			.then((errorMessage) => setNotification(errorMessage));
	};

	return (
		<>
			{notification && <Notification status="error">{notification}</Notification>}

			<h1>Login</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="form form--small">
				<Input
					className="form-item"
					type="email"
					placeholder="test@example.com"
					{...register('email')}
				>
					Электронная почта
				</Input>
				<Input className="form-item" type="password" {...register('password')}>
					Пароль
				</Input>

				<button type="submit" className="button" disabled={error}>
					Войти
				</button>
			</form>
		</>
	);
};
