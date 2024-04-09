import React from 'react'
import { RiUserHeartFill } from "react-icons/ri";
import { MdHealthAndSafety } from "react-icons/md";
import { Link } from 'react-router-dom';
import AdminTemplate from '../../components/AdminTemplate';

export default function AdminHomePage() {
    return (
        <AdminTemplate>
            {/* contents */}
            <div className='flex gap-10 w-full justify-between px-3'>
                <div className='w-40 h-40 rounded-md bg-[#fdfbd2] flex flex-col justify-center items-center'>
                    <MdHealthAndSafety className='w-16 h-16' />
                    <Link to={'/healthcare-management'} className='font-semibold text-lg text-center'> Healthcare Management</Link>
                </div>
                <div className='w-40 h-40 rounded-md bg-[#fdfbd2] flex flex-col justify-center items-center'>
                    <RiUserHeartFill className='w-16 h-16' />
                    <Link to={'/patients-management'} className='font-semibold text-lg text-center'> View Patients</Link>
                </div>
            </div>
        </AdminTemplate>
    )
}
