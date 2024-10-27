import { useEffect, useState, useMemo } from 'react';
import { getOrders } from '../../api';
import { debounce } from '../../utils';
import { Pagination, Search } from './components';
import { useNavigate } from 'react-router-dom';

export const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shuoldSearch, setShuoldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isSorting, setIsSorting] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		getOrders(isSorting, searchPhrase, page)
			.then((req) => {
				if (req.ok) {
					return req.json();
				} else {
					navigate('/login');
					return false;
				}
			})
			.then((loadedOrders) => {
				setOrders(loadedOrders.requisitions);
				setLastPage(loadedOrders.totalPages);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSorting, page, shuoldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShuoldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shuoldSearch);
	};

	return (
		<>
			<h1>Заявки с формы</h1>
			<div className="wrap">
				<Search onChange={onSearch} searchPhrase={searchPhrase} />
			</div>
			<table className="orders-table">
				<thead>
					<tr>
						<th>Дата отправки</th>
						<th>
							Ф.И.О{' '}
							<button
								className="button button--icon"
								alt="сортировка"
								onClick={() => setIsSorting(!isSorting)}
							>
								<img
									src="https://img.icons8.com/?size=100&id=21886&format=png&color=000000"
									alt="sorting"
								/>
							</button>
						</th>
						<th>Телефон</th>
						<th>Проблема</th>
					</tr>
				</thead>

				<tbody>
					{orders.map(({ _id, date, name, phone, description }) => (
						<tr key={_id}>
							<td>{date}</td>
							<td>{name}</td>
							<td>{phone}</td>
							<td>{description}</td>
						</tr>
					))}
				</tbody>
			</table>

			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</>
	);
};
