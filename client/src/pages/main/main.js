import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Progress } from './components';

export const Main = () => {
	const firstQuestion = useSelector((state) => state.questions[0]);

	return (
		<>
			<div className="wrap">
				<Link className="button" to={`/question/${firstQuestion._id}`}>
					Запустить тест
				</Link>
				<Link className="button" to={`/edit-questions/${firstQuestion._id}`}>
					Редактировать тест
				</Link>
			</div>
			<Progress />
		</>
	);
};
