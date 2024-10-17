export const createAnswer = (newAnswer) => (dispatch) =>
	fetch('/create-answer', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			...newAnswer
		}),
	});