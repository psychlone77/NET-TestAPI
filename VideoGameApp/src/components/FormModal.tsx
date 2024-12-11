import { ReactNode } from "react";

export default function FormModal({ onClose, children }: { onClose: (state: boolean) => void, children: ReactNode }) {
    return (
        <div className="relative flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity">
                <div className="fixed inset-0 z-100 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center items-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <button
                                onClick={() => onClose(false)}
                                className="absolute top-0 right-0 p-4"
                            >
                                <svg
                                    className="w-6 h-6 text-gray-700 hover:text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}