import { Route, Routes } from 'react-router-dom';
import './collection.css';
import { Requisition, Orders, Login } from './pages';

export const Collection = () => {
	return (
		<div className="container">
			<Routes>
				<Route path="/" element={<Requisition />} />
				<Route path="/login" element={<Login />} />
				<Route path="/orders" element={<Orders />} />
			</Routes>
		</div>
	);
};
