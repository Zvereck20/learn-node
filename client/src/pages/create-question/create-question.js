import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createQuestion } from '../../actions';
import { Notification } from '../../components';

export const CreateQuestion = () => {
	const [question, setQuestion] = useState('');
	const [answers, setAnswers] = useState([]);
	const [notification, setNotification] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onAnswerTitle = ({ target }) => {
		const newValue = [...answers];
		const element = newValue.findIndex(({ tempId }) => tempId === target.name);

		if (element !== -1) {
			newValue[element].title = target.value;
		} else {
			newValue[target.name] = {
				tempId: target.name,
				title: target.value,
				correct: false,
			};
		}

		setAnswers(newValue);
	};

	const onAnswerCorrect = ({ target }) => {
		const newValue = [...answers];
		const element = newValue.findIndex(({ tempId }) => tempId === target.id);

		newValue.forEach((el) => {
			el.correct = false;
		});

		if (element !== -1) {
			newValue[element].correct = true;
		} else {
			newValue[target.id] = {
				tempId: target.id,
				title: '',
				correct: true,
			};
		}

		setAnswers(newValue);
	};

	const onCreateAnswer = () => {
		const newValue = [
			...answers,
			{
				tempId: '',
				title: '',
				correct: false,
			},
		];

		setAnswers(newValue);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (!answers.length) {
			setNotification('Нужно создать минимум один вариант ответа');
		} else if (answers[0].title === '') {
			setNotification('Нужно зполнить поле ответа');
		} else if (answers.findIndex(({ correct }) => correct === true) === -1) {
			setNotification('Нужно выбрать правильный вариант ответа');
		}

		question === '' && setNotification('Нужно зполнить поле вопроса');

		const newQuestion = {
			question,
			answers,
		};

		dispatch(createQuestion(newQuestion)).then(() => navigate('/'));
	};

	return (
		<form onSubmit={onSubmit} className="edit">
			{notification && <Notification>{notification}</Notification>}
			<label className="edit-item">
				<h2 className="title title--small">Создать вопрос</h2>
				<input
					type="text"
					name="question"
					value={question}
					onChange={(el) => setQuestion(el.target.value)}
				/>
			</label>

			{answers.map(({ title, correct }, index) => (
				<label className="edit-item" key={index}>
					<p>Ответ № {index + 1} </p>
					<input
						type="text"
						name={index}
						value={title}
						onChange={onAnswerTitle}
					/>
					<label className="edit-wrap">
						Correct answer:
						<input
							type="checkbox"
							checked={correct}
							id={index}
							name="correct-answer"
							onChange={onAnswerCorrect}
						/>
					</label>
				</label>
			))}

			<button
				className="button button--icon button--center"
				type="button"
				title="Add answer"
				onClick={onCreateAnswer}
			>
				<img
					width="50"
					height="50"
					src="https://img.icons8.com/ios-filled/50/add--v1.png"
					alt="add--v1"
				/>
			</button>

			<div className="wrap wrap-bottom">
				<Link to="/" className="button">
					Назад
				</Link>
				<button className="button button--green" type="submit">
					Сохранить
				</button>
			</div>
		</form>
	);
};
