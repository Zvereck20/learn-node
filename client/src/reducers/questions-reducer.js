export const questionsReducer = (state = [], action) => {
	let newState = [];

	switch (action.type) {
		case 'DOWNLOAD_QUESTIONS':
			return [...action.payload];

		case 'CREATE_QUESTION':
			newState = [...state];
			newState.push(action.payload);

			return newState;

		case 'DELETE_QUESTION':
			newState = state.filter(({ _id }) => _id !== action.payload);

			return newState;

		default:
			return state;
	}
};
