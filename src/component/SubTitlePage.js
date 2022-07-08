import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SubTitlePage(props) {
    let navigate = useNavigate()
    return (
        <div className='flex items-center px-4 py-[18px] border-b-4 border-light1'>
            <span onClick={()=>navigate(-1)} className='cursor-pointer h-3 w-3 border-l-2 border-t-2 border-primary -rotate-45 mt-[0.2rem]'></span>
            <p onClick={()=>navigate(-1)} className='cursor-pointer text-primary text-xl font-medium ml-1'>{props.subTitle}</p>
        </div>
    )
}
