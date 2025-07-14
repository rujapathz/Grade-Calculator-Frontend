import React, { useState } from "react";

interface StepNameProps {
    name: string;
    setName: (name: string) => void;
    onNext: () => void;
}

export default function StepName({ name, setName, onNext }: StepNameProps) {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleNext = () => {
        if (name.trim() !== "") {
            setErrorMessage("");
            onNext();
        } else {
            setErrorMessage("Please enter your name.");
        }
    };

    return (
        <div>
            <label htmlFor="stepname-name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
            </label>
            <input
                type="text"
                id="stepname-name"
                name="stepname-name"
                value={name}
                onChange={e => {
                    setName(e.target.value);
                    if (errorMessage) {
                        setErrorMessage("");
                    }
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
            />
            {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}

            <button
                onClick={handleNext}
                className={`mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm 
            text-sm font-medium text-white
            ${
                name.trim() !== ""
                    ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2"
                    : "bg-gray-300 cursor-not-allowed text-gray-600"
        } 
            focus:outline-none focus:ring-2`}
                disabled={name.trim() === ""}
            >
                Next
            </button>
        </div>
    );
}
