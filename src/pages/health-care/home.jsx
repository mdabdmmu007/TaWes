import React from 'react'
import { WiDayHail } from "react-icons/wi";
import { RiUserHeartFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import HealthCareTemplate from '../../components/HealthCareTemplate';

export default function HealthCareHomePage() {
    return (
        <HealthCareTemplate>
            {/* contents */}
            <div className='flex gap-10 w-full justify-between px-3'>
                <div className='w-40 h-40 rounded-md bg-[#fdfbd2] flex flex-col justify-center items-center'>
                    <WiDayHail className='w-16 h-16' />
                    <Link to={'/weather'} className='font-semibold text-lg text-center'> View Current Weather</Link>
                </div>
                <div className='w-40 h-40 rounded-md bg-[#fdfbd2] flex flex-col justify-center items-center'>
                    <RiUserHeartFill className='w-16 h-16' />
                    <Link to={'/patients'} className='font-semibold text-lg text-center'> View Patients</Link>
                </div>
            </div>
        </HealthCareTemplate>
    )
}
