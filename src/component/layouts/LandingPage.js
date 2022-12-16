import React from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className='mb-36'>
        <div className='my-20 text-center'>
            <h1 className='font-bold text-5xl'><span className='text-primary'>Investasi</span><span className='text-secondary'>KU</span></h1>
        </div>

        <Outlet/>
    </div>
  )
}
