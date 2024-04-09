import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import PatientDetail from './patient-detail';
import HealthCareTemplate from '../../components/HealthCareTemplate';
import { query, where } from 'firebase/firestore';
import { db } from "../../firebase";
import { useAuth } from '../../services/AuthService';

export default function HealthCarePatientsPage() {
    const { currentUser } = useAuth()
    const [open, setOpen] = useState(false);
    const [searchPatientId, setSearchPatientId] = useState('')
    const [addPatientId, setAddPatientId] = useState('')
    const [patient, setPatient] = useState({})
    const [patients, setPatients] = useState([])
    const getPatients = async () => {
        const tmpData = []
        const patientsRef = collection(db, "users");
        const q1 = query(patientsRef, where("role", "==", "user"));
        const q2 = query(q1, where("healthcare", "==", currentUser?.uid));

        const querySnapshot = await getDocs(q2);
        querySnapshot.forEach((doc) => {
            tmpData.push(doc.data())
        })
        setPatients(tmpData)
    }
    const getPatient = async (id) => {
        const patientsRef = collection(db, "users");
        const docref = doc(patientsRef, id);
        const docSnap = await getDoc(docref)
        setPatients([docSnap.data()])
    }
    const handleAddPatient = async (e) => {
        e.preventDefault()
        const patientRef = collection(db, "users");
        const docref = doc(patientRef, addPatientId);
        await updateDoc(docref, {
            healthcare: currentUser?.uid
        })

        getPatients()
    }
    const handleSearchPatient = async (e) => {
        e.preventDefault()
        getPatient(searchPatientId)
    }
    useEffect(() => {
        getPatients()
    }, [])
    return (
        <HealthCareTemplate>
            {/* contents */}
            <div className='flex flex-col gap-10 w-full'>
                {/* header */}
                <div className='w-full flex justify-center items-center'>
                    <div className='w-3/6 bg-[#ffc34a] rounded-md p-2'>
                        <h1 className=' text-center text-3xl font-bold'>Patients</h1>
                    </div>
                </div>
                {/* Patient action */}
                <div className='flex justify-between'>
                    <form className='w-1/3' onSubmit={handleSearchPatient} autoComplete='off'>
                        <label htmlFor="patient-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search Patient</label>
                        <input type="text" id="patient-id"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setSearchPatientId(e.target.value)}
                            placeholder='Patient ID'
                            required />
                        <button type='submit'></button>
                    </form>
                    <form className='w-1/3' onSubmit={handleAddPatient} autoComplete='off'>
                        <label htmlFor="patient-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add a New Patient</label>
                        <input type="text" id="patient-id"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setAddPatientId(e.target.value)}
                            placeholder='Patient ID'
                            required />
                        <button type='submit'></button>
                    </form>
                </div>
                {/* Patient list */}
                <div className='w-full bg-white rounded-md'>


                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Patient ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gender
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    patients?.map((item, index) => (

                                        <tr className="border-b border-gray-200 dark:border-gray-700" key={item.userId}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 cursor-pointer"
                                                onClick={() => {
                                                    setPatient(item)
                                                    setOpen(true)
                                                }}
                                            >
                                                {item.userId}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.username}
                                            </td>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                {item?.gender}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <PatientDetail
                        patient={patient}
                        isOpen={open}
                        onClose={() => setOpen(false)}
                    />
                </div>
            </div>
        </HealthCareTemplate>
    )
}
