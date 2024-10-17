import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Result = () => {
	const firstQuestion = useSelector((store) => store.questions[0]._id);
	
	const lastAnswer = Object.keys(localStorage).sort().reverse()[0]
	const {correct, numberOfQuestions} = JSON.parse(localStorage[lastAnswer]);
	
	return (
		<>
			<h1 className="title">Правльных ответов:</h1>
      <div className="counter counter-result">{`${correct} / ${numberOfQuestions}`}</div>

			<div className="wrap wrap-bottom">
				<Link className="button" to="/">
					На главную
				</Link>
				<Link className="button" to={`/question/${firstQuestion}`}>
					Пройти еще раз
				</Link>
			</div>
		</>
	);
};
