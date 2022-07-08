import React from 'react'
import { useNavigate } from 'react-router-dom'
import SubTitlePage from '../../component/SubTitlePage'

export default function InvestmentDetail() {
    const navigate = useNavigate();
    return (
        <div>
            <SubTitlePage subTitle='Tabungan Emas'/>
            <p className='m-4 text-xs text-secondary font-medium'>Data terakhir: 07/08/2022</p>
            <div className='grid grid-cols-2 w-[85%] m-auto'>
                <div className='col-span-2'>
                    <form className='mb-4'>
                        <label className='block mb-1 text-secondary'>
                            Buy back <span className='text-sm'>(per gr)</span>
                        </label>
                        <input className='text-right w-32 px-2 text-xs py-1 rounded-md border border-secondary focus:outline-none focus:ring-secondary focus:ring-1 focus:border-secondary'/>
                        <button className='ml-2 py-1 px-4 bg-primary rounded-full text-xs text-white font-medium'>Perbarui</button>
                    </form>
                </div>
                <div>
                    <p className='text-secondary'>Stok</p>
                    <p className='text-primary font-medium mb-2'>15 gr</p>
                    <p className='text-secondary'>Total pembelian</p>
                    <p className='text-primary font-medium mb-2'>Rp 18.296.647,5</p>
                    <p className='text-secondary'>Total penjualan</p>
                    <p className='text-primary font-medium mb-2'>Rp 4.300.000,-</p>
                </div>
                <div className='flex flex-col justify-between items-center mb-2'>
                    <div>
                        <p className='text-md font-medium text-primary mb-1'>Suku bunga</p>
                        <p className='p-2 bg-warning rounded-md text-white font-medium w-fit m-auto'>-3.26%</p>
                    </div>
                    <div>
                        <p className='text-md font-medium text-primary mb-1'>Stock to Buy back</p>
                        <p className='p-2 bg-warning rounded-md text-white font-medium w-fit m-auto'>Rp 12.930.000,-</p>
                    </div>
                </div>
                <div className='justify-self-center mt-6'>
                    <button className='p-1 w-28 rounded-full bg-primary text-white' onClick={()=>navigate('./beli')}>
                        Beli
                    </button>
                </div>
                <div className='justify-self-center my-6'>
                    <button className='p-1 w-28 rounded-full bg-primary text-white' onClick={()=>navigate('./jual')}>
                        Jual
                    </button>
                </div>
                <div className='group col-span-2 overflow-auto scrolltable max-h-[11.5rem]'>
                    <table className='relative w-[30rem] border-separate border-spacing-0'>
                        <thead className=''>
                            <tr>
                                <th className='bg-light1 border-y border-secondary top-0 sticky text-sm font-medium p-1'>Tanggal</th>
                                <th className='bg-light1 border-y border-secondary top-0 sticky text-sm font-medium p-1'>Kuantitas Beli/Jual</th>
                                <th className='bg-light1 border-y border-secondary top-0 sticky text-sm font-medium p-1'>Beli/Jual</th>
                                <th className='bg-light1 border-y border-secondary top-0 sticky text-sm font-medium p-1'>Buy back <span>(per gr)</span></th>
                                <th className='bg-light1 border-y border-secondary top-0 sticky text-sm font-medium p-1'>Suku bunga</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {[...Array(20).keys()].map(e=>
                                <tr>
                                    <td className='text-xs font-normal py-1'>10/01/2022</td>
                                    <td className='text-xs font-normal py-1'>10 gr</td>
                                    <td className='text-xs font-normal py-1'>Rp 9.000.000,-</td>
                                    <td className='text-xs font-normal py-1'>Rp 827.000,-</td>
                                    <td className='text-xs font-normal py-1'>-4.6%</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
