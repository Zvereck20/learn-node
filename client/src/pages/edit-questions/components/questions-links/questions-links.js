import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export const QuestionsLinks = () => {
	const questions = useSelector((state) => state.questions);
	const params = useParams();

	return (
		<div className="questions-list">
			{questions.map(({ _id: id }, i) => (
				<Link
					to={`/edit-questions/${id}`}
					className={
						params.id === id
							? `questions-item ${'questions-item--active'}`
							: 'questions-item'
					}
					key={id}
				>
					Вопрос № {i + 1}
				</Link>
			))}
			<Link to="/create-question" className="questions-item questions-item--create">
				Добавить вопрос
			</Link>
		</div>
	);
};
