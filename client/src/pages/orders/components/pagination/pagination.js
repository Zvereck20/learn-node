export const Pagination = ({ page, lastPage, setPage }) => {
	return (
		<div className="pagination">
			<button className="button" disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</button>
			<button className="button" disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</button>
			<div className="pagination-current">Страница: <span>{page}</span></div>
			<button className="button" disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</button>
			<button className="button" disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</button>
		</div>
	);
};