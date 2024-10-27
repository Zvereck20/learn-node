import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputMask } from '@react-input/mask';
import * as yup from 'yup';
import { Input, Notification } from '../../components';
import { createRequisition } from '../../api';
import {generateDate} from '../../utils';

const requisitionSchema = yup.object().shape({
	name: yup
		.string()
		.required('Заполните ФИО')
		.matches(
			/^[,.а-яА-ЯёЁ\s]+$/,
			'Неверно заполнено поле ФИО, допускаются только буквы',
		)
		.min(3, 'Неверно заполнено поле ФИО. Минимум 3 символа'),
	phone: yup
		.string()
		.required('Введите номер телефона')
		.min(18, 'Номер телефона введен не полностью'),
	description: yup.string(),
});

export const Requisition = () => {
	const [notification, setNotification] = useState(null);
	const [disabledSubmit, setDisabledSubmit] = useState(false);
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			phone: '',
			description: '',
		},
		resolver: yupResolver(requisitionSchema),
	});

	const error =
		errors.name?.message || errors.phone?.message || errors.description?.message;

	const onSubmit = ({ name, phone, description }) => {
		const date = generateDate();
		setDisabledSubmit(true);

		createRequisition({ date, name, phone, description }).then(() => {
			setNotification('Ваша заявка была отправлена');
			reset();
			setDisabledSubmit(false);
		});
	};

	return (
		<>
			<h1>Запишитесь к врачу</h1>
			{error && <Notification status="error">{error}</Notification>}

			{notification && <Notification>{notification}</Notification>}

			<form onSubmit={handleSubmit(onSubmit)} className="form">
				<Input
					className="form-item"
					type="text"
					placeholder="Иванов И.И."
					{...register('name')}
				>
					ФИО
				</Input>

				<label className="form-item">
					<p>Номер телефона</p>
					<InputMask
						mask="+7 (___) ___-__-__"
						replacement={{ _: /\d/ }}
						{...register('phone')}
						placeholder="+7 (___) ___-__-__"
					/>
				</label>

				<label className="form-item">
					<p>Опишите вашу проблему</p>
					<textarea {...register('description')}></textarea>
				</label>
				<button type="submit" className="button" disabled={disabledSubmit}>
					Отправить
				</button>
			</form>
		</>
	);
};
