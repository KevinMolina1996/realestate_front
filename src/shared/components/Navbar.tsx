import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-gray-900 text-2xl font-bold tracking-wide">
                    REALESTATE
                </Link>

                <div className="hidden md:flex space-x-8 items-center">
                    <Link href="/properties" className="text-gray-700 hover:text-blue-600 transition font-medium">
                        PROPIEDADES
                    </Link>
                </div>

                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-700 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white px-6 py-4 space-y-3 border-t border-gray-200">
                    <Link
                        href="/properties"
                        className="block text-gray-700 hover:text-blue-600 transition font-medium"
                        onClick={() => setIsOpen(false)}
                    >
                        PROPIEDADES
                    </Link>
                </div>
            )}
        </nav>
    );
}
