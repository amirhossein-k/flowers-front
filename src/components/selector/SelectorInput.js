import React from 'react'
import { SingleSelect } from 'react-select-material-ui'

const SelectorInput = ({options,handler,value}) => {
  return (
    <>
       <SingleSelect options={options}  onChange={handler}/>
    </>
  )
}

export default SelectorInput
