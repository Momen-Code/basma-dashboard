import React from "react";

//Styles
import "./style.scss";

//Assets

const TableRow = ({ index, employee, services, total, cashier, time }) => {
	return (
		<tr>
			<td>{index + 1}</td>
			<td>{employee.name}</td>
			<td className="services">
				<ul>{services && services.map((service, index) => <li key={index}>{service.name + "    " + service.price + "  ج.م"}</li>)}</ul>
			</td>
			<td className="total">{total} ج.م</td>
			<td>{cashier.name}</td>
			<td>
				{new Intl.DateTimeFormat("ar-EG", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
				}).format(Date.parse(time))}
			</td>
		</tr>
	);
};

export default TableRow;
