import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIn() {
    let navigate = useNavigate();
    return (
        <div className='w-[80%] mx-auto'>
            <form>
                <div>
                    <label 
                        className='text-xs text-secondary block mb-1'
                    >
                        Username / Email
                    </label>
                    <input 
                        className='mb-6 p-1.5 text-xs w-full rounded-md border border-secondary focus:outline-none focus:ring-secondary focus:ring-1 focus:border-secondary'
                    />
                </div>
                <div>
                    <label 
                    className='text-xs text-secondary block mb-1'
                    >
                        Password
                    </label>
                    <input 
                        className='mb-4 p-1.5 text-xs w-full rounded-md border border-secondary focus:outline-none focus:ring-secondary focus:ring-1 focus:border-secondary'
                    />
                </div>
                <div>
                    <button
                        type='button'
                        onClick={()=>navigate('/app/dashboard')}
                        className='mb-4 w-full bg-primary rounded-full text-xs text-white py-1.5'
                    >
                        Log in
                    </button>
                </div>
                <div>
                    <p className='text-primary text-xs text-center'>Don’t have  an account? <Link to='/auth/signup' className='font-bold' >Sign up</Link></p>
                </div>
            </form>
        </div>
    )
}
