import React from 'react'

export default function TitlePage(props) {
  return (
    <div className='z-10 fixed top-0 w-full max-w-[425px] bg-light2 py-4 text-center text-primary text-2xl font-medium border-b-4 border-light1'>{props.title}</div>
  )
}
