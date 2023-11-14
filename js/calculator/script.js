const output = document.querySelector(".output");
const buttons = document.querySelector(".buttons");

let result = 0;
let action = "";

function actions(action, num1, num2) {
  if (action === "×" || action === "*") {
    return (num1 *= num2);
  }
  if (action === "÷" || action === "/") {
    return (num1 /= num2);
  }
  if (action === "+") {
    return (num1 = Number(num1) + Number(num2));
  }
  if (action === "−" || action === "-") {
    return (num1 -= num2);
  }
}

buttons.addEventListener("click", function (e) {
  if (
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
      e.target.innerText
    )
  ) {
    output.innerText += e.target.innerText;
    output.innerText = Number(output.innerText);
  } else if (["×", "÷", "+", "−"].includes(e.target.innerText)) {
    if (!action && output.innerText !== "0") {
      result = output.innerText;
      action = e.target.innerText;
    } else if (action && result) {
      result = actions(action, result, output.innerText);
      action = e.target.innerText;
    }
    output.innerText = 0;
  } else if (e.target.innerText === "=") {
    if (action) {
      result = actions(action, result, output.innerText);
      output.innerText = result;
      action = "";
      result = 0;
    }
  } else if (e.target.innerText === "C") {
    output.innerText = 0;
    result = 0;
    action = 0;
  } else if (e.target.innerText === "←") {
    if (output.innerText.length > 1) {
      output.innerText = output.innerText.slice(0, -1);
    } else {
      output.innerText = 0;
    }
  }
});

// document.addEventListener("keypress", function (e) {
//   if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.key)) {
//     output.innerText += e.key;
//     output.innerText = Number(output.innerText);
//   } else if (["×", "÷", "+", "−"].includes(e.key)) {
//     if (!action && output.innerText !== "0") {
//       result = output.innerText;
//       action = e.key;
//     } else if (action && result) {
//       result = actions(action, result, output.innerText);
//       action = e.key;
//     }
//     output.innerText = 0;
//   } else if (e.key === "Enter") {
//     if (action) {
//       result = actions(action, result, output.innerText);
//       output.innerText = result;
//       action = "";
//       result = 0;
//     }
//   } else if (e.key === "C") {
//     output.innerText = 0;
//     result = 0;
//     action = 0;
//   } else if (e.key === "←") {
//     if (output.innerText.length > 1) {
//       output.innerText = output.innerText.slice(0, -1);
//     } else {
//       output.innerText = 0;
//     }
//   }
//   console.log(result);
// });
