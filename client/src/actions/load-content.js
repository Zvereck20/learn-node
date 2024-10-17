export const loadContent = () => (dispatch) =>
	fetch('/content')
		.then((loadedContent) => loadedContent.json())
		.then(({questions, answers}) => {
			
			dispatch({
				type: 'DOWNLOAD_QUESTIONS',
				payload: questions,
			});

			dispatch({
				type: 'DOWNLOAD_ANSWERS',
				payload: answers,
			});
		});
