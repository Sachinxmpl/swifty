"use client";

import { ReactNode } from "react";

interface ButtonProps {
        children: ReactNode;
        className?: string;
        appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
        return (
                <>
                        <button
                                className={className}
                                onClick={() => alert(`Hello from your ${appName} app!`)}
                        >
                                {children}
                        </button>
                        <div className="bg-blue-500 text-white border-2 ">
                                This is from the ui folder
                        </div>
                </>

        );
};
