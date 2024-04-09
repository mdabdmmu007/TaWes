import { getDocs } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import { collection, doc, updateDoc } from "firebase/firestore";
import { IoCloseOutline } from "react-icons/io5";
import { db } from "../../firebase";
import RecordCard from "../../components/RecordCard";
import { useState } from "react";

const Modal = ({ isOpen, onClose, patient }) => {

    const [ginaRecord, setGinaRecord] = useState([])

    const handleClose = () => {
        onClose();
    };

    const getGinaRecords = async () => {
        const ginaRef = collection(db, "records");
        const q = query(ginaRef, where("userId", "==", patient.userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setGinaRecord((prev) => [...prev, doc.data()])
        })
    }

    useState(() => {
        getGinaRecords()
    }, [])

    const handleRemovePatient = async (e) => {
        e.preventDefault()
        const patientRef = collection(db, "users");
        const docref = doc(patientRef, patient.userId);
        await updateDoc(docref, {
            healthcare: ''
        })
        handleClose()
    }

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
                            className="inline-block align-bottom bg-[#f0caff] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="flex justify-end p-2">
                                <IoCloseOutline className="w-10 h-10 cursor-pointer hover:text-red-400" onClick={handleClose} />
                            </div>
                            <div className="bg-[#f0caff] px-4 pt-5 w-96 pb-4 sm:p-6 sm:pb-4">
                                {ginaRecord?.length === 0 && (
                                    <p className='text-center '>No records found!</p>
                                )}
                                {ginaRecord?.map((data, index) => (
                                    <RecordCard key={data?.id} record={data} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


export default Modal;