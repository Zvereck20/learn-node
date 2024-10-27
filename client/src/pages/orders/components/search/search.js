import { Input } from '../../../../components';

export const Search = ({ searchPhrase, onChange }) => {
	return (
		<div className="search">
			<Input value={searchPhrase} onChange={onChange} placeholder="Введите слово целиком...">
				Поиск по описанию или имени.
			</Input>
		</div>
	);
};
