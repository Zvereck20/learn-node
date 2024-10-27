export const createRequisition = (requisition) => 
  fetch('/create-requisition', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			...requisition
		}),
	});