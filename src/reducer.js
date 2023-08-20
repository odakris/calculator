import ActionTypes from "./Actions";

const reducer = (state, action) => {
  switch (action.type) {
    //  CLEAR
    case ActionTypes.CLEAR:
      return {
        ...state,
        current: "0",
        previous: null,
        operation: null,
      };
    case ActionTypes.DELETE:
      if (state.equals) {
        return { ...state, current: "0" };
      }
      // If current value.lenght > 1 then remove last digit
      if (state.current.length > 1) {
        return {
          ...state,
          current: state.current
            .split("")
            .slice(state.current.lenght - 1, -1)
            .join(""),
        };
      }
      // If user did not insert any numbers yet or current value.lenght === 1 ==> do nothing
      return { ...state, current: "0" };
    case ActionTypes.NUMERIC:
      //  Prevent user to insert zeros as first digits in prompt
      if (state.current === "0" && action.payload.input === "0") {
        return state;
      }
      // Replace "0" if input is a num => [1-9]
      if (state.current === "0" && /[1-9]/.test(action.payload.input)) {
        return { ...state, current: action.payload.input, equals: false };
      }
      if (state.current === "-") {
        return {
          ...state,
          current: `${state.current}${action.payload.input}`,
          equals: false,
        };
      }
      /////////////////////////// HANDLES RIGHT AFTER PRESSING EQUALS //////////////////////
      // Replace current value after pressing equals by "0." if user enter input == "."
      if (state.equals === true && action.payload.input === ".") {
        return {
          ...state,
          current: "0.",
          previous: null,
          operation: null,
          equals: false,
        };
        // Replace current value after pressing equals by user input
      } else if (state.equals === true && action.payload.input !== ".") {
        return {
          ...state,
          current: action.payload.input,
          equals: false,
        };
      }
      // Prevent user to add more than one dot in a float input
      if (action.payload.input === "." && state.current.includes(".")) {
        return state;
      }
      return { ...state, current: `${state.current}${action.payload.input}` };

    case ActionTypes.OPERATOR:
      // Prevent user to input severals operator
      if (action.payload.input === state.operation) {
        return state;
      }
      ///////////////////////////////////// Handle change operator ////////////////////////
      if (state.operation !== null && state.current === "-") {
        return {
          ...state,
          current: "0",
          operation: action.payload.input,
        };
      }
      if (
        action.payload.input === "-" &&
        state.previous !== null &&
        state.current === "0"
      ) {
        return { ...state, current: `${action.payload.input}` };
      }
      if (state.current === "-") {
        return { ...state, current: "0", operation: action.payload.input };
      }

      ///////////////////////////////////// Handle change operator ////////////////////////
      // Handle chain calculation
      if (state.operation !== null && state.current !== "0") {
        return {
          ...state,
          current: "0",
          previous: Number.isInteger(calculation(state))
            ? calculation(state)
            : parseFloat(calculation(state)),
          operation: action.payload.input,
        };
      }
      if (action.payload.input !== "-" && state.operation !== null) {
        return { ...state, operation: action.payload.input };
      }
      return {
        ...state,
        current: "0",
        previous: state.current,
        operation: action.payload.input,
      };

    case ActionTypes.EQUALS:
      if (state.previous === null && state.operation === null) {
        return state;
      }
      if (state.equals) {
        return state;
      }
      return {
        ...state,
        current: Number.isInteger(calculation(state))
          ? calculation(state)
          : parseFloat(calculation(state)),
        previous: `${state.previous} ${state.operation} ${state.current} = `,
        operation: null,
        equals: true,
      };

    default:
      return state;
  }
};

const calculation = ({ current, previous, operation }) => {
  const curr = parseFloat(current);
  const prev = parseFloat(previous);
  let calc = 0;

  switch (operation) {
    case "+":
      calc = prev + curr;
      break;
    case "-":
      calc = prev - curr;
      break;
    case "*":
      calc = prev * curr;
      break;
    case "/":
      calc = prev / curr;
      break;
    default:
      break;
  }

  return calc.toString();
};

export default reducer;
