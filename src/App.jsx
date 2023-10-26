import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

const App = () => {
  const [answer, setAnswer] = React.useState("");
  const [expression, setExpression] = React.useState("0");

  const trimmed = expression.trim();
  const exToArr = trimmed.split(" ");
  const lastChar = exToArr[exToArr.length - 1];
  const secondLast = exToArr[exToArr.length - 2];
  const validOperators = ["+", "/", "*", "-"];

  const handleNumber = (e) => {
    const number = e.target.textContent;

    if (expression === "0") {
      setExpression(number);
    } else if (validOperators.includes(lastChar)) {
      setExpression(expression + " " + number);
    } else {
      setExpression(expression + number);
    }
  };

  const handleOperator = (e) => {
    const operator = e.target.textContent;

    if (
      lastChar !== "-" &&
      operator === "-" &&
      !validOperators.includes(secondLast)
    ) {
      setExpression(expression + " " + operator);
    } else if (
      validOperators.includes(secondLast) &&
      validOperators.includes(lastChar)
    ) {
      setExpression(expression.slice(0, expression.length - 3) + operator);
    } else if (validOperators.includes(lastChar)) {
      setExpression(expression.slice(0, expression.length - 1) + operator);
    } else {
      setExpression(expression + " " + operator);
    }
  };

  const handleClear = () => {
    setExpression("0");
    setAnswer("");
  };

  const handleEquals = () => {
    if (!validOperators.includes(trimmed.charAt(0)) && answer !== "") {
      // if first character in expression state is not an operator and answer has already been declared, add next operation to the answer state by default
      setAnswer(eval(answer + "+" + expression));
    } else {
      setAnswer(eval(answer + expression));
    }

    setExpression("");
  };

  const handleDecimal = (e) => {
    const decimal = e.target.textContent;

    if (!lastChar.includes(decimal)) {
      // if last character is not a number, meaning we clicked an operator sign, add a 0 before the dot
      if (isNaN(parseInt(lastChar))) {
        setExpression(expression + "0" + decimal);
      } else {
        setExpression(expression + decimal);
      }
    }
  };

  return (
    <>
      <div id="calculator">
        <div id="display">
          <div id="answer">{answer}</div>
          <div id="expression">{expression}</div>
        </div>
        <div className="btns-wrapper">
          <button id="clear" className="btn action" onClick={handleClear}>
            AC
          </button>
          <button
            id="divide"
            className="btn operation"
            onClick={handleOperator}
          >
            /
          </button>
          <button
            id="multiply"
            className="btn operation"
            onClick={handleOperator}
          >
            *
          </button>
          <button id="seven" className="btn digit" onClick={handleNumber}>
            7
          </button>
          <button id="eight" className="btn digit" onClick={handleNumber}>
            8
          </button>
          <button id="nine" className="btn digit" onClick={handleNumber}>
            9
          </button>
          <button
            id="subtract"
            className="btn operation"
            onClick={handleOperator}
          >
            -
          </button>
          <button id="four" className="btn digit" onClick={handleNumber}>
            4
          </button>
          <button id="five" className="btn digit" onClick={handleNumber}>
            5
          </button>
          <button id="six" className="btn digit" onClick={handleNumber}>
            6
          </button>
          <button id="add" className="btn operation" onClick={handleOperator}>
            +
          </button>
          <button id="one" className="btn digit" onClick={handleNumber}>
            1
          </button>
          <button id="two" className="btn digit" onClick={handleNumber}>
            2
          </button>
          <button id="three" className="btn digit" onClick={handleNumber}>
            3
          </button>
          <button id="equals" className="btn action" onClick={handleEquals}>
            =
          </button>
          <button id="zero" className="btn digit" onClick={handleNumber}>
            0
          </button>
          <button
            id="decimal"
            className="btn digit"
            onClick={handleDecimal}
          >
            .
          </button>
        </div>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
