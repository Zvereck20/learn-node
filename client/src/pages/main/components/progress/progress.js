import { useEffect, useState } from 'react';

export const Progress = () => {
	const [result, setResult] = useState([]);

	useEffect(() => {
		const answers = { ...localStorage };
		const sortingKeys = Object.keys(answers).sort();

		const resultContainer = [];

		for (let i = 0; i < sortingKeys.length; i++) {
			const passageDate = sortingKeys[i].split(' ');
			const { correct, numberOfQuestions } = JSON.parse(answers[sortingKeys[i]]);

			const row = {
				date: passageDate[0],
				time: passageDate[1],
				correct,
				numberOfQuestions,
			};

			resultContainer.unshift(row);
		}

		setResult(resultContainer);
	}, []);

	return (
		<>
			<h2 className="title">История прохождений:</h2>

			<ul className="progress">
				{result.map(({ date, time, correct, numberOfQuestions }) => (
					<li key={time} className="progress-item">
						<div>
							{date}
							<p className="time">{time}</p>
						</div>
						
						<div className="road">
							<span>0</span>
							<div className="road-length">
								<div className="road-correct" style={{width: correct + "0%"}}></div>
							</div>
							<span>{numberOfQuestions}</span>
						</div>

						<div className="progress-counter">
							Верно: {correct} из {numberOfQuestions}
						</div>
					</li>
				))}
			</ul>
		</>
	);
};
