import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Answers } from './components';

export const Question = () => {
	const [question, setQuestion] = useState('');
	const [questionNumber, setQuestionNumber] = useState(0);
	const [isSelected, setIsSelected] = useState(false);
	const [numberOfcorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
	const [correctAnswer, setCorrectAnswer] = useState(false);

	const questions = useSelector((state) => state.questions);
	const params = useParams();

	useEffect(() => {
		const index = questions.findIndex((el) => el._id === params.id);

		setQuestion(questions[index].title);
		setQuestionNumber(index + 1);
	}, [params.id, questions]);

	const onChange = ({ target }) => {
		const isCorrectAnswer = target.dataset.correct;

		if (isCorrectAnswer === 'true' && !correctAnswer) {
			setNumberOfCorrectAnswers(numberOfcorrectAnswers + 1);
			setCorrectAnswer(true);
		} else if (isCorrectAnswer === 'false' && correctAnswer) {
			setNumberOfCorrectAnswers(numberOfcorrectAnswers - 1);
			setCorrectAnswer(false);
		}

		setIsSelected(true);
	};

	const onReset = () => {
		setIsSelected(false);
		setCorrectAnswer(false);
	};

  const onSave = () => {
    const key = new Date().toISOString().substring(0, 16).replace('T', ' ');

		const value = {
			correct: numberOfcorrectAnswers,
			numberOfQuestions: questions.length
		}
  
    localStorage.setItem(key, JSON.stringify(value))
  }

	const previosQuestion = questionNumber > 1 ? questions[questionNumber - 2]._id : null;
	const nextQuestion = questions[questionNumber] ? questions[questionNumber]._id : null;

	return (
		<>
			<div className="counter">{`${questionNumber} / ${questions.length}`}</div>
			<div className="title">{question}</div>

			<Answers id={params.id} onChange={onChange} />

			<div className="wrap wrap-bottom">
				<Link
					className={`button ${previosQuestion ? "button--yellow" : "button--grey"}`}
					to={`/question/${previosQuestion}`}
				>
					Предыдущий вопрос
				</Link>
				{nextQuestion ? (
					<Link
						className={`button ${isSelected ? "button--yellow" : "button--grey"}`}
						to={`/question/${nextQuestion}`}
						onClick={onReset}
					>
						Следующий вопрос
					</Link>
				) : (
					<Link
						className={`button ${isSelected ? "button--green" : "button--grey"}`}
						to={`/result`} 
            onClick={onSave}
					>
						Завершить тест
					</Link>
				)}
			</div>
		</>
	);
};
