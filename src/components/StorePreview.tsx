import React from 'react'
import {Link} from 'react-router-dom'

export const StorePreview = (props:any) => {
  const setCurStoreHandler = () => {
    props.setCurStore(props.id)
  }
  return (
    <Link onClick={setCurStoreHandler} to={props.id} className="store-preview">
      <div style={{backgroundColor: props.color}} className='store-back'></div>
      <div className="store-front"></div>
        <h3 className='store-front'>{props.title}</h3>
    </Link>
  )
}

