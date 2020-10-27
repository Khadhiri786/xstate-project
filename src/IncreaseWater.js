//This project is to add a liter of water
import { useMachine } from '@xstate/react';
import { Button, message } from 'antd';
import React from 'react';
import { Machine, assign } from 'xstate';

// Action to increment the context amount
const addWater = assign({
  amount: (context, event) => context.amount + 1
});

// Guard to check if the glass is full
function glassIsFull(context, event) {
  console.log(context.amount)
  return context.amount >= 10;

}

const glassMachine = Machine(
  {
    id: 'glass',
    // the initial context (extended state) of the statechart
    context: {
      amount: 0
    },
    initial: 'empty',
    states: {
      empty: {
        on: {
          FILL: {
            target: 'filling',
            actions: 'addWater'
          }
        }
      },
      filling: {
        // Transient transition
        always: {
            target: 'full',
            cond: 'glassIsFull'
        },
        on: {
          FILL: {
            type: 'filling',
            actions: 'addWater'
          }
        }
      },

      full: {
          type:'final'
      }
    }
  },
  {
    actions: { addWater },
    guards: { glassIsFull }
  }
);
export default function IncreaseWater(){
    const [value,setValue]=useMachine(glassMachine);
return(<div><Button onClick={()=>setValue('FILL')} disabled={value.matches('full')} >Click to add Water</Button><br/><br/>{value.context.amount}liter{value.matches('full')?(<>{message.error('you have exceeded maximum limit 10')}</>):null}</div>)}