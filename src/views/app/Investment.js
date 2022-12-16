import React from 'react'
import { useNavigate } from 'react-router-dom'
import TitlePage from '../../component/TitlePage'

export default function Investment() {
  let navigate = useNavigate();
  return (
    <div>
      <TitlePage title="Investment" />

      {/* Add button */}
      <div className='fixed bottom-20 flex flex-row-reverse w-full max-w-[425px]'>
        <div className='w-20 text-center flex justify-center'>
          <button type='button' onClick={()=>navigate('./add')} className='pb-2 text-4xl h-12 w-12 rounded-full mx-4 drop-shadow-lg bg-primary text-white'>
            +
          </button>
        </div>
      </div>

      {/* Investment List */}
      <div className='mt-24'>
        <div onClick={()=>navigate('./detail/Tabungan Emas')} className='cursor-pointer flex justify-between items-center border-b-2 border-light1 px-4 py-3 hover:bg-light1'>
          <p className='text-primary'>Tabungan Emas</p>
          <span className='h-3 w-3 border-r-2 border-t-2 border-primary rotate-45'></span>
        </div>
        <div onClick={()=>navigate('./detail/Saham BCA')} className='cursor-pointer flex justify-between items-center border-b-2 border-light1 px-4 py-3 hover:bg-light1'>
          <p className='text-primary'>Saham BCA</p>
          <span className='h-3 w-3 border-r-2 border-t-2 border-primary rotate-45'></span>
        </div>
        <div onClick={()=>navigate('./detail/Investasi bagi hasil')} className='cursor-pointer flex justify-between items-center border-b-2 border-light1 px-4 py-3 hover:bg-light1'>
          <p className='text-primary'>Investasi bagi hasil</p>
          <span className='h-3 w-3 border-r-2 border-t-2 border-primary rotate-45'></span>
        </div>
        <div onClick={()=>navigate('./detail/Investasi dana beli mobil')} className='cursor-pointer flex justify-between items-center border-b-2 border-light1 px-4 py-3 hover:bg-light1'>
          <p className='text-primary'>Investasi dana beli mobil</p>
          <span className='h-3 w-3 border-r-2 border-t-2 border-primary rotate-45'></span>
        </div>
      </div>
    </div>
  )
}
