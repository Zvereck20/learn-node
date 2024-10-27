import { forwardRef } from "react";

export const Input = forwardRef(({ children, className, ...props }, ref, ) => {	
	return (
		<label className={className}>
			<p>{children}</p>
			<input {...props} ref={ref} />
		</label>
	);
});
