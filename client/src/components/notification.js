export const Notification = ({ children, status }) => {
	return (
		<div className={status ? `notification notification--${status}` : 'notification'}>
			<h3 className="notification-title">{children}</h3>
		</div>
	);
};
