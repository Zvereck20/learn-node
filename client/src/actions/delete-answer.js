export const deleteAnswer = (answerId) => (dispatch) =>
	fetch(`/delete-answer/${answerId}`, {
		method: 'DELETE',
	}).then(() => {
		dispatch({
			type: 'DELETE_ANSWER',
			payload: answerId,
		});
	});