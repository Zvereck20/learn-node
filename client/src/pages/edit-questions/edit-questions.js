import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createAnswer, saveChanges, deleteQuestion, deleteAnswer } from '../../actions';
import { QuestionsLinks } from './components';

export const EditQuestions = () => {
	const [question, setQuestion] = useState({ id: '', title: '' });
	const [questionNumber, setQuestionNumber] = useState('');
	const [questionAnswers, setQuestionAnswers] = useState([]);
	const [wasChanged, setWasChanged] = useState([]);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();
	const questions = useSelector((state) => state.questions);
	const answers = useSelector((state) => state.answers);

	const saveChangedId = (changedId) => {
		if (!wasChanged.includes(changedId)) {
			const changedIds = [...wasChanged];
			changedIds.push(changedId);
			setWasChanged(changedIds);
		}
	};

	useEffect(() => {
		const correctQuestionIndex = questions.findIndex(({ _id }) => _id === params.id);
		const { _id: id, title } = questions[correctQuestionIndex];
		const correctQuestionAnswers = answers.filter(
			({ question_id }) => question_id === id,
		);

		setQuestion({
			id,
			title,
		});
		setQuestionNumber(correctQuestionIndex + 1);
		setQuestionAnswers([...correctQuestionAnswers]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.id]);

	const onQuestionChange = ({ target }) => {
		const newValue = {
			...question,
			title: target.value,
		};

		saveChangedId(question.id);
		setQuestion(newValue);
	};

	const onTitleAnswersChange = ({ target }) => {
		const newValue = [...questionAnswers];
		const element = newValue.findIndex(({ _id }) => _id === target.name);

		newValue[element].title = target.value;

		saveChangedId(target.name);
		setQuestionAnswers(newValue);
	};

	const onCorrectAnswersChange = ({ target }) => {
		const newValue = [...questionAnswers];
		const element = newValue.findIndex(({ _id }) => _id === target.id);

		newValue.forEach((el) => {
			el.correct = false;
		});

		newValue[element].correct = true;
		saveChangedId('correct');
		setQuestionAnswers(newValue);
	};

	const onCreateAnswer = () => {
		const newValue = [...questionAnswers];
		const newAnswer = {
			_id: 'new',
			title: '',
			question_id: newValue[0].question_id,
			correct: false,
		};

		newValue.push(newAnswer);

		setQuestionAnswers(newValue);
	};

	const onQuestionDelete = ({ target }) => {
		const questionId = target.dataset.question;

		dispatch(deleteQuestion(questionId)).then(() =>
			navigate(`/edit-questions/${questions[0]._id}`),
		);
	};

	const onAnswerDelete = ({ target }) => {
		const answerId = target.dataset.answer;
		const newValue = questionAnswers.filter(({ _id }) => _id !== answerId);

		dispatch(deleteAnswer(answerId)).then(() => setQuestionAnswers(newValue));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		let newQuestion = {};
		let newAnswers = [];

		if (wasChanged.includes(question.id)) {
			newQuestion = { ...question };
		}

		if (wasChanged.includes('new')) {
			const newAnswer = questionAnswers[questionAnswers.length - 1];
			delete newAnswer._id;

			dispatch(createAnswer(newAnswer));
		}

		if (wasChanged.includes('correct')) {
			newAnswers = [...questionAnswers];
		} else if (newAnswers.length < questionAnswers.length) {
			questionAnswers.forEach(({ _id }, index) => {
				if (wasChanged.includes(_id)) {
					newAnswers.push(questionAnswers[index]);
				}
			});
		}

		dispatch(saveChanges(newQuestion, newAnswers));
	};

	return (
		<>
			<h1 className="title">Выберите вопрос для редактирования</h1>
			<QuestionsLinks />

			<form onSubmit={onSubmit} className="edit">
				<label className="edit-item">
					{questions.length > 1 && (
						<button
							className="button button--icon button--position"
							type="button"
							title="Delete question"
							data-question={question.id}
							onClick={onQuestionDelete}
						>
							<img
								width="24"
								height="24"
								src="https://img.icons8.com/material-rounded/24/filled-trash.png"
								alt="filled-trash"
							/>
						</button>
					)}
					<h2 className="title title--small">Вопрос № {questionNumber} </h2>
					<input
						type="text"
						name="question"
						value={question.title}
						onChange={onQuestionChange}
					/>
				</label>

				{questionAnswers.map(({ _id, title, correct }, index) => (
					<label className="edit-item" key={_id}>
						<p>Ответ № {index + 1} </p>
						<input
							type="text"
							name={_id}
							value={title}
							onChange={onTitleAnswersChange}
						/>
						<div className="wrap">
							<label className="edit-wrap">
								Correct answer:
								<input
									type="checkbox"
									checked={correct}
									id={_id}
									name="correct-answer"
									onChange={onCorrectAnswersChange}
								/>
							</label>
							<button
								className="button button--icon"
								type="button"
								title="Delete answer"
								data-answer={_id}
								onClick={onAnswerDelete}
							>
								<img
									width="24"
									height="24"
									src="https://img.icons8.com/material-rounded/24/filled-trash.png"
									alt="filled-trash"
								/>
							</button>
						</div>
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
		</>
	);
};
