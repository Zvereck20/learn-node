export const createQuestion = (newQuestion) => (dispatch) =>
	fetch('/create-question', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			...newQuestion,
		}),
	})
		.then((res) => res.json())
		.then(({ question, answers }) => {
			dispatch({
				type: 'CREATE_QUESTION',
				payload: question,
			});

			dispatch({
				type: 'DOWNLOAD_ANSWERS',
				payload: answers,
			});
		});
