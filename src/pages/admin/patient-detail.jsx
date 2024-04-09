import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import PatientGinaRecord from "./patient-gina-record";

const Modal = ({ isOpen, onClose, patient }) => {
    const [viewGina, setViewGina] = useState(false)

    const handleClose = () => {
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto border">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="flex justify-end p-2">
                                <IoCloseOutline className="w-10 h-10 cursor-pointer hover:text-red-400" onClick={handleClose} />
                            </div>
                            <div className="bg-white px-4 pt-5 w-96 pb-4 sm:p-6 sm:pb-4">

                                <div className=''>
                                    <label htmlFor="patient-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
                                    <input type="text" id="patient-id"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder='ID'
                                        disabled
                                        value={patient.userId}
                                        required />
                                </div>
                                <div className=''>
                                    <label htmlFor="patient-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" id="patient-id"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder='Name'
                                        disabled
                                        value={patient.username}
                                        required />
                                </div>
                                <div className=''>
                                    <label htmlFor="patient-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                    <input type="text" id="patient-id"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder='Gender'
                                        disabled
                                        value={patient.gender}
                                        required />
                                </div>
                                <div className=''>
                                    <label htmlFor="patient-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dob</label>
                                    <input type="text" id="patient-id"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder='Dob'
                                        disabled
                                        value={patient.dob}
                                        required />
                                </div>
                                <div className=''>
                                    <label htmlFor="patient-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="text" id="patient-id"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder='Email'
                                        disabled
                                        value={patient.email}
                                        required />
                                </div>
                                <div className=''>
                                    <label htmlFor="patient-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                    <input type="text" id="patient-id"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder='Phone'
                                        disabled
                                        value={patient.phone}
                                        required />
                                </div>
                            </div>
                            <div className="bg-gray-50 p-3 flex gap-3">
                                <button
                                    onClick={() => setViewGina(true)}
                                    type="button"
                                    className="w-full inline-flex justify-center  items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    {/* Action Button */}
                                    View GINA
                                </button>
                            </div>
                        </div>
                    </div>
                    <PatientGinaRecord isOpen={viewGina} onClose={() => setViewGina(false)} patient={patient} />
                </div>
            )}
        </>
    );
};


export default Modal;