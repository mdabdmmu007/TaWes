import { collection, getDocs, } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import HealthCareDetail from './healthcare-detail';
import { db } from "../../firebase";
import AdminTemplate from '../../components/AdminTemplate';

export default function HealthCareManagementPage() {
    const [open, setOpen] = useState(false);
    const [healthCare, setHealthCare] = useState({})
    const [healthCares, setHealthCares] = useState([])
    const getHealthCares = async () => {
        const tmpData = []
        const healthCaresRef = collection(db, "healthcare");
        // const q1 = query(healthCaresRef, where("role", "==", "healthcare"));
        const docs = await getDocs(healthCaresRef);

        // const querySnapshot = await getDocs(q1);
        docs.forEach((doc) => {
            tmpData.push(doc.data())
        })
        setHealthCares(tmpData)
    }
    useEffect(() => {
        getHealthCares()
    }, [])
    return (
        <AdminTemplate>
            {/* contents */}
            <div className='flex flex-col gap-10 w-full'>
                {/* header */}
                <div className='w-full flex justify-center items-center'>
                    <div className='w-3/6 bg-[#ffc34a] rounded-md p-2'>
                        <h1 className=' text-center text-3xl font-bold'>HealthCares</h1>
                    </div>
                </div>
                {/* HealthCare list */}
                <div className='w-full bg-white rounded-md'>


                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        HealthCare ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Name
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {healthCares?.map((item, index) => (
                                    <tr className="border-b border-gray-200 dark:border-gray-700" key={item.userId}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 cursor-pointer"
                                            onClick={() => {
                                                setHealthCare(item)
                                                setOpen(true)
                                            }}
                                        >
                                            {item.userId}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.name}
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <HealthCareDetail
                        healthcare={healthCare}
                        isOpen={open}
                        onClose={() => setOpen(false)}
                    />
                </div>
            </div>
        </AdminTemplate>
    )
}
