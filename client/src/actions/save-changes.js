export const saveChanges = (question, answers) => (dispatch) =>
	fetch('/save-changes', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			question,
			answers,
		}),
	});
