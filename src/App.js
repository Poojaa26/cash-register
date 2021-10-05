import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [cashReceived, setCashReceived] = useState(0);
  const [message, setMessage] = useState("");
  const [chkHide, setChkHide] = useState("none");
  const [tableHide, settableHide] = useState("none");
  const [amtReturned, setAmtReturned] = useState("");
  const denomination = [2000, 500, 100, 20, 10, 5, 1];
  const [number, setNumber] = useState([]);

  function balanceAmount(balance) {
    denomination.map(function (note) {
      var noOfNotes = Math.trunc(balance / note);
      setNumber((number) => [...number, noOfNotes]);

      balance = balance % note;
      return number;
    });
  }
  function nextClickHandler(bill) {
    setMessage("");
    setNumber([]);

    if (+bill > 0) {
      setChkHide("block");
    } else {
      setChkHide("none");
      settableHide("none");
      setMessage("Bill Amount should be a positive number");
    }
  }
  function checkClickHandler(bill, cash) {
    setMessage("");
    setNumber([]);

    if (+cash >= +bill) {
      if (+cash === +bill) {
        settableHide("none");
        setMessage("Exact cash given. No balance amount");
      } else {
        settableHide("");
        setAmtReturned(+cash - +bill);
        balanceAmount(+cash - +bill);
      }
    } else {
      settableHide("none");
      setMessage(
        "Bill amount is higher. Cash given should at least be equal to the bill amount."
      );
    }
  }

  return (
    <div className="App">
      <div className="contents">
        <h1 className="heading">Cash Register</h1>
        <p className="description">
          Enter the bill amount and cash received and know the change to be
          returned in minimum number of notes
        </p>
        <label htmlFor="bill-amount">Enter Bill Amount: </label>
        <input
          type="text"
          id="bill-amount"
          onChange={(event) => {
            setBillAmount(event.target.value);
          }}
        />
        <br />
        <button onClick={() => nextClickHandler(billAmount)}>NEXT</button>
        <br />
        <div style={{ display: chkHide }}>
          <label htmlFor="cash-received">Enter Cash Received: </label>
          <input
            type="text"
            id="cash-received"
            onChange={(event) => {
              setCashReceived(event.target.value);
            }}
          />
          <br />
          <br />
          <button
            id="btn-chk"
            onClick={() => checkClickHandler(billAmount, cashReceived)}
          >
            CHECK
          </button>
        </div>
        <p>{message}</p>
        <br />
        <table style={{ display: tableHide }}>
          <tbody>
            <tr>
              <th colSpan="8">Return Balance Amount: {amtReturned}</th>
            </tr>
            <tr>
              <th>No. Of Notes</th>
              {number.map((noOfNotes, index) => (
                <td className="noOfNotes" key={index}>
                  {noOfNotes}
                </td>
              ))}
            </tr>
            <tr>
              <th>Denomination</th>
              {denomination.map((note) => (
                <td className="denomination" key={note}>
                  {note}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
