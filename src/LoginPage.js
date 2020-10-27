import React, { useEffect, useMemo, useState } from "react";
import { Card, Input, Button, message} from "antd";
import "antd/dist/antd.css";
import { interpret, Machine } from "xstate";
import { useMachine } from "@xstate/react";
import { assign } from "xstate";

export function UseMachine(machine) {
  const [current, setCurrent] = useState(machine.initialState);

  const service = useMemo(
    () =>
      interpret(machine)
        .onTransition((state) => {
          if (state.changed) {
            setCurrent(state);
          }
        })
        .start(),
    [machine]
  );

  useEffect(() => {
    return () => service.stop();
  },);
}

function fakePayment() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("yay"), 0);
  });
}
const stateMachine = Machine({
  initial: "idle",
  context: {
    msg: "",
  },
  states: {
    idle: {
      on: {
        SUBMIT: [
          {
            target: "loading",
            cond: (ctx, event) =>
              event.data.name !== "" && event.data.password !== "",
          },
          {
            target: "error",
          },
        ],
      },
    },
    loading: {
      invoke: {
        id: "doPayment",
        src: () => fakePayment(),
        onDone: {
          target: "success",
           actions: assign({ msg: (ctx, event) => event.data }),
        },
        onError: {
          target: "error",
            actions: assign({ msg: (ctx, event) => event.data }),
        },
      },
    },
    error: {
      on: {
        SUBMIT: [
          {
            target: "loading",
            cond: (ctx, event) =>
              event.data.name !== "" && event.data.password !== "",
          },
        ],
      },
    },
    success: {
      target:'loading'

    },
  },
 
});

const LoginPage = () => {
  const [machine, send] = useMachine(stateMachine);
  const [form, updateForm] = useState({ name: "", password: "" });
  console.log(machine.value)
  return (
    <>
      {machine.matches("error") ? (
        <div className="alert error">Fill all the details</div>
      ) : null}
      {machine.matches("success") ? <>{message.success('Login Successfully')}</> : null}
      <Card style={{ width: "300px", margin: "10px" }}>
        Username:
        <Input
          type="text"
          placeholder="Username"
          value={form.name}
          onChange={(e) => updateForm({ ...form, name: e.target.value })}
        />
        Password:
        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => updateForm({ ...form, password: e.target.value })}
        />
        <Button
          type="primary"
          onClick={() => {
            send({ type: "SUBMIT", data: { ...form } });
          }}
        >
          Login
        </Button>
      </Card>
    </>
  );
};
export default LoginPage;
