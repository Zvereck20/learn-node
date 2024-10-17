export const deleteQuestion = (questionId) => (dispatch) =>
	fetch(`/delete-question/${questionId}`, {
		method: 'DELETE',
	}).then(() => {
		dispatch({
			type: 'DELETE_QUESTION',
			payload: questionId,
		});

		dispatch({
			type: 'DELETE_ANSWERS',
			payload: questionId,
		});
	});
