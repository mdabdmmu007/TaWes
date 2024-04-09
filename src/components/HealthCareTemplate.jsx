import React from 'react'
import HealthCareMenuBar from './HealthCareMenuBar'

export default function HealthCareTemplate({ children }) {
    return (
        <div
            className="min-h-screen mx-auto max-w-3xl mobile:px-4 mobile:text-xs tablet:text-md tablet:px-20 tabletxs:px-8
py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-600 bg-purple-200 items-center"
        >
            <HealthCareMenuBar textColor={"text-slate-800"} />
            {/* contents */}
            {children}
        </div>
    )
}
