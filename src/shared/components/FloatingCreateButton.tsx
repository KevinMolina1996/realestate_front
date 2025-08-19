import { PlusIcon } from "@heroicons/react/24/outline";
import { MouseEventHandler } from "react";

interface FloatingCreateButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export const FloatingCreateButton = ({ onClick }: FloatingCreateButtonProps) => {
    return (
        <div className="fixed bottom-6 right-6 z-40">
            <button
                onClick={onClick}
                className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                <PlusIcon className="h-6 w-6" />
            </button>
        </div>
    );
};