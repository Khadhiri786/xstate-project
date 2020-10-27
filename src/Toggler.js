import React from "react";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";


const toggleMachine = Machine({
  id: "toggle",
  initial: "inactive",
  states: {
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      on: { TOGGLE: "inactive" },
    },
  },
});

export const Toggler = () => {
  const [state, send] = useMachine(toggleMachine);
  console.log(state.value)
  const val= toggleMachine.transition(toggleMachine.initialState,'TOGGLE');
  console.log(val);
  return (<>
    <button onClick={() => send("TOGGLE")}>
      {state.value === "inactive"
        ? "Click to activate"
        : "Active! Click to deactivate"}
    </button>        
</>
  );
};
export default Toggler;
