import React from 'react'
import { useNavigate } from 'react-router-dom'
import TitlePage from '../../component/TitlePage'

export default function Profile() {
  const navigate = useNavigate();
    return (
      <div>
        <TitlePage title="Profile" />

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
          <div onClick={()=>navigate('./edit profil')} className='cursor-pointer flex justify-between items-center border-b-2 border-light1 px-4 py-3 hover:bg-light1'>
            <p className='text-primary'>Ubah profil</p>
            <span className='h-3 w-3 border-r-2 border-t-2 border-primary rotate-45'></span>
          </div>
          <div onClick={()=>navigate('./ganti password')} className='cursor-pointer flex justify-between items-center border-b-2 border-light1 px-4 py-3 hover:bg-light1'>
            <p className='text-primary'>Ganti password</p>
            <span className='h-3 w-3 border-r-2 border-t-2 border-primary rotate-45'></span>
          </div>
          <div onClick={()=>navigate('./hapus akun')} className='cursor-pointer flex justify-between items-center border-b-2 border-light1 px-4 py-3 hover:bg-light1'>
            <p className='text-primary'>Hapus akun</p>
            <span className='h-3 w-3 border-r-2 border-t-2 border-primary rotate-45'></span>
          </div>
          <div onClick={()=>navigate('/')} className='cursor-pointer flex justify-between items-center border-light1 px-4 py-2 hover:bg-red-600 bg-red-500 my-3 mx-1 rounded-sm drop-shadow-md'>
            <p className='text-slate-100 mx-auto font-semibold'>Log out</p>
          </div>
        </div>
      </div>
    )
}
