import React from 'react';
import { Machine } from 'xstate';
import {Button} from 'antd';
import {useMachine} from '@xstate/react'

const CheckboxMachine= Machine({
  id:'checkbox',
  initial:'switched_off',
  states:{
    switched_off:{
      on:{
        TOGGLE_SWITCH:'switched_on'
      }
    },
    switched_on:{
      on:{
        TOGGLE_SWITCH:'switched_off'
        
      }
    }
    }
});
export default function Checkbox()
{
  const [state,setState]=useMachine(CheckboxMachine);
  console.log(state.value)
  console.log(state.matches())
  return(<>Checkbox<div><Button type="dashed" onClick={()=>setState("TOGGLE_SWITCH")}>SWITCH ON</Button>
 </div>
  <input type="checkbox" style={{marginLeft:'140px'}}checked={state.value==='switched_on'}/></>)
}