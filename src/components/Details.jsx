import React from "react";
import "../css/app.css";
export default function Details(props) {
  return (
    <>
      <div className="details-container flex-row">
        <div className="detail-box flex-column">
          <p>Expense</p>
          <p style={{ color: "red" }} className="amount">
            ${props.expense}
          </p>
        </div>
        <div className="detail-box flex-column">
          <p>Income</p>
          <p style={{ color: "green" }} className="amount">
            ${props.income}
          </p>
        </div>
      </div>
    </>
  );
}
