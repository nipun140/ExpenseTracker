import React from "react";
import "../css/app.css";

export default function Transaction(props) {
  return (
    <>
      <div
        className={`transaction-container flex-row ${
          props.transtype === "Income" ? "income" : "expense"
        } `}
      >
        <p>{props.billtype}</p>
        <p>${props.amount}</p>
      </div>
    </>
  );
}
