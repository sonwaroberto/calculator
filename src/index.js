import {useEffect, useState,useReducer} from "react"
import ReactDOM from "react-dom/client"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Plus = () => {
  const initialState = {result: 0}
  const reducer = (state,action) => {
    if (isNaN(number1) || isNaN(number2)) return initialState;
    // const num1 = number1 || 0
    // const num2 = number2 || 0
    switch(action.sign) {
      case '+':
        return {result : number1 + number2}
      case '-': 
        return {result : number1 - number2}
      case '*':
        return {result : number1 * number2}
      case '/':
        return {result : number1 / number2}
      case '^':
        return {result : Math.pow(number1,number2)}
      default:
        return state
    }
  } 

  const [number1, setNumber1] = useState(0)
  const [number2, setNumber2] = useState(0)
  const [sign, setSign] = useState('+')
  const operators = ['+','-','*','/','^']
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({sign,number1,number2})
  }, [number1, number2,sign])
  
  return (
    <Box sx={{display:"flex",alignItems:"center"}}>
      <TextField 
        required 
        label="number 1" 
        placeholder="enter number to sum" 
        type="number"
        variant="outlined"
        onChange={(e) => setNumber1(parseFloat(e.target.value))}
      />  
      <Select
        value={sign}
        label="Sign"
        onChange={(e) => setSign((e.target.value))}
      >
        {operators.map((opr,index)=>{
          return <MenuItem value={opr} key={index}>{opr}</MenuItem>
        })}
      </Select>
      <TextField 
        required 
        label="number 2" 
        type="number"
        placeholder="enter number to sum" 
        variant="outlined"
        onChange={(e) => setNumber2(parseFloat(e.target.value))}
      /> 
      <span>=</span>  
      <Box component="span" sx={{ p: 2, border: '1px solid rgba(0, 0, 0, 0.23)' }}>
        {state.result}
      </Box>
    </Box>

  )
}

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<Plus/>)