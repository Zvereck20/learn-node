export const answersReducer = (state = [], action) => {
	let newState = [];

	switch (action.type) {
		case 'DOWNLOAD_ANSWERS':
			return [...action.payload];

		case 'DELETE_ANSWERS':
			newState = state.filter(({ question_id }) => question_id !== action.payload);

			return newState;

		case 'DELETE_ANSWER':
			newState = state.filter(({ _id }) => _id !== action.payload);

			return newState;

		default:
			return state;
	}
};
