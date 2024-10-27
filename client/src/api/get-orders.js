export const getOrders = (isSorting, searchPhrase, page) =>
	fetch(
		`/orders?isSorting=${isSorting}&searchPhrase=${searchPhrase}&page=${page}&limit=10`,
	);
