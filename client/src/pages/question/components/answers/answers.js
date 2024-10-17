import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Answers = ({ id, onChange }) => {
	const [answers, setAnswers] = useState([]);
	const answersData = useSelector((state) => state.answers);

	useEffect(() => {
		const answersList = answersData.filter(({ question_id }) => question_id === id);

		setAnswers(answersList);
	}, [answersData, id]);

	return (
		<div className="answers">
			{answers.map(({ _id, title, correct }) => (
				<label htmlFor={_id} key={_id} className="answers-item">
					<input type="radio" name="answer" id={_id} data-correct={correct} onChange={onChange} />
					<span>{title}</span>
				</label>
			))}
		</div>
	);
};
