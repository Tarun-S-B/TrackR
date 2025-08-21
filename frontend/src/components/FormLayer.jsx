import { X } from "lucide-react";

const FormLayer = ({showForm, children}) => {

    return (
        <>
            {/* // Blurring the background */}
            <div
                className="fixed inset-0 trans bg-opacity-0 z-40"  
                onClick={() => {showForm(false);}}  
            >

            </div>

            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-2xl p-6 w-full h-[550px] max-w-md">
                    <button 
                        onClick={() => {showForm(false);}}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
                        aria-label="Close Form"
                        >
                        <X color="black" size={30} />
                    </button>

                        {children}
                </div>
            </div>
        </>
    )
}

export default FormLayer;