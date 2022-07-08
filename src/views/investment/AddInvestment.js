import React, { useState } from 'react'
import SubTitlePage from '../../component/SubTitlePage'

function IDRFormatter(number){
    return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
}


export default function AddInvestment() {
    return (
        <div>
            <SubTitlePage subTitle='Add Investment'/>
                <div className='w-full m-auto'>
                    <form className='mx-6 mt-10'>
                        <div>
                            <label className='block text-secondary text-sm mb-1'>
                                Nama Investasi
                            </label>
                            <input 
                                placeholder='jenis investasi/tujuan investasi/dll'
                                className='p-2 bg-gray-50 w-full border border-secondary rounded-md focus:outline-none focus:ring-secondary focus:ring-1 focus:border-secondary text-xs text-primary mb-4'
                            />
                        </div>
                        <div>
                            <label className='block text-secondary text-sm mb-1'>
                                Suku bunga yang diharapkan
                            </label>
                            <div className='flex mb-4'>
                                <div className='px-2 border border-secondary rounded-r-none rounded-md font-semibold text-xs text-gray-500 bg-gray-200 flex items-center'>%</div>
                                <input
                                    className='p-2 bg-gray-50 w-full border border-secondary rounded-l-none rounded-md focus:outline-none focus:ring-secondary focus:ring-1 focus:border-secondary text-xs text-primary'
                                />
                            </div>
                        </div>
                        <div>
                            <label className='block text-secondary text-sm mb-1'>
                                Total keuntungan yang diharapkan
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
                                Satuan investasi
                            </label>
                            <input 
                                placeholder='gr/slot/%/dll'
                                className='block p-2 w-full border border-secondary rounded-md focus:outline-none focus:ring-secondary focus:ring-1 focus:border-secondary text-xs mb-4 text-primary'
                            />
                        </div>
                        <div>
                            <button className='block py-2 px-6 bg-primary text-white rounded-md text-xs'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
    )
}
