import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Main, Question, EditQuestions, Result, CreateQuestion } from './pages';
import { loadContent } from './actions';
import './quiz.css';

export const Quiz = () => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadContent()).then(() => setIsLoading(false));
	}, [dispatch]);

	if (isLoading) {
		return (
			<div className="container">
				<div className="loader"></div>
			</div>
		);
	}

	return (
		<div className="container">
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path='/result' element={<Result />} />
				<Route path='/create-question' element={<CreateQuestion />} />
				<Route path="/question/:id" element={<Question />} />
				<Route path="/edit-questions/:id" element={<EditQuestions />} />
				<Route path="*" element={'Страница не существует'} />
			</Routes>
		</div>
	);
};
