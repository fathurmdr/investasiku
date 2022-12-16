import React from 'react'
import SubTitlePage from '../../component/SubTitlePage'

export default function SellInvestment() {
    return (
        <div>
            <SubTitlePage subTitle = 'Jual'/>
                <div className='w-full m-auto'>
                    <div className='mx-6 mt-3 p-3 rounded-lg bg-light2 border border-light1 drop-shadow-md text-primary'>
                        <div className='flex items-center'>
                            <div className='font-semibold mr-1'>Suku Bunga</div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 fill-gray-500 " viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className='py-2 text-2xl font-bold mr-3 mb-2'>
                            %
                        </div>
                    </div>
                    <form className='mx-6 mt-10'>
                        <div>
                            <label className='block text-secondary text-sm mb-1'>
                                Buy back (per gram)
                            </label>
                            <div className='flex mb-4'>
                                <div className='px-2 border border-secondary rounded-r-none rounded-md font-semibold text-xs text-gray-500 bg-gray-200 flex items-center'>Rp</div>
                                <input
                                    className='p-2 bg-gray-50 w-full border border-secondary rounded-l-none rounded-md focus:outline-none focus:ring-secondary focus:ring-1 focus:border-secondary text-xs text-primary'
                                />
                            </div>
                        </div>
                        <div>
                            <label className='block text-secondary text-sm mb-1'>
                                Kuantitas
                            </label>
                            <div className='flex mb-4'>
                                <div className='px-2 border border-secondary rounded-r-none rounded-md font-semibold text-xs text-gray-500 bg-gray-200 flex items-center'>gr</div>
                                <input
                                    className='p-2 bg-gray-50 w-full border border-secondary rounded-l-none rounded-md focus:outline-none focus:ring-secondary focus:ring-1 focus:border-secondary text-xs text-primary'
                                />
                            </div>
                        </div>
                        <div>
                            <label className='block text-secondary text-sm mb-1'>
                                Harga jual
                            </label>
                            <div className='flex mb-4'>
                                <div className='px-2 border border-secondary rounded-r-none rounded-md font-semibold text-xs text-gray-500 bg-gray-200 flex items-center'>Rp</div>
                                <input
                                    className='p-2 bg-gray-50 w-full border border-secondary rounded-l-none rounded-md focus:outline-none focus:ring-secondary focus:ring-1 focus:border-secondary text-xs text-primary'
                                />
                            </div>
                        </div>
                        <div>
                            <button className='block py-2 px-6 bg-primary text-white rounded-md text-xs'>Submit</button>
                        </div>
                    </form>
                </div>
        </div>
  )
}
