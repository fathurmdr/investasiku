import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
    let navigate = useNavigate()
    return (
        <div className='w-[80%] mx-auto'>
            <form>
                <div>
                    <label 
                        className='text-xs text-secondary block mb-1'
                    >
                        Full Name
                    </label>
                    <input 
                        className='mb-6 p-1.5 text-xs w-full rounded-md border border-secondary focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary'
                    />
                </div>
                <div>
                    <label 
                        className='text-xs text-secondary block mb-1'
                    >
                        Email
                    </label>
                    <input 
                        className='mb-6 p-1.5 text-xs w-full rounded-md border border-secondary focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary'
                    />
                </div>
                <div>
                    <label 
                        className='text-xs text-secondary block mb-1'
                    >
                        Username
                    </label>
                    <input 
                        className='mb-6 p-1.5 text-xs w-full rounded-md border border-secondary focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary'
                    />
                </div>
                <div>
                    <label 
                    className='text-xs text-secondary block mb-1'
                    >
                        Password
                    </label>
                    <input 
                        className='mb-4 p-1.5 text-xs w-full rounded-md border border-secondary focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary'
                    />
                </div>
                <div>
                    <button
                        type='button'
                        onClick={()=>navigate('/')}
                        className='mb-4 w-full bg-primary rounded-full text-xs text-white py-1.5'
                    >
                        Sign up
                    </button>
                </div>
                <div>
                    <p className='text-primary text-xs text-center'>Go back to <Link to='/' className='font-bold' >Log in</Link></p>
                </div>
            </form>
        </div>
    )
}
