import { collection, doc, updateDoc } from "firebase/firestore";
import { IoCloseOutline } from "react-icons/io5";
import { db } from "../../firebase";
import { useState } from "react";

const Modal = ({ isOpen, onClose, patient }) => {

    const [plan, setPlan] = useState(patient.treatmentPlan || '')

    const handleClose = () => {
        onClose();
    };

    const updateTreatmentPlan = async () => {
        const ginaRef = collection(db, "users");
        const docRef = doc(ginaRef, patient.userId);
        await updateDoc(docRef, {
            treatmentPlan: plan
        })
       onClose()
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

                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                                <textarea
                                    onChange={(e) => setPlan(e.target.value)}
                                    value={plan}
                                    id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                <button
                                    onClick={updateTreatmentPlan}
                                    type="button"
                                    className="mt-5 w-full inline-flex justify-center  items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    {/* Action Button */}
                                    Treatment Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


export default Modal;