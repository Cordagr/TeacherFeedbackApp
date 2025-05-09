import React from "react";
import cn from "classnames";

export const Dialog = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={cn(
          "relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg",
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className }) => (
  <div className={cn("p-4", className)}>{children}</div>
);

export const DialogHeader = ({ children, className }) => (
  <div className={cn("mb-4 text-lg font-semibold", className)}>{children}</div>
);

export const DialogTitle = ({ children, className }) => (
  <h2 className={cn("text-xl font-bold", className)}>{children}</h2>
);

export const DialogDescription = ({ children, className }) => (
  <p className={cn("text-sm text-gray-500", className)}>{children}</p>
);

export const DialogFooter = ({ children, className }) => (
  <div className={cn("flex justify-end space-x-2", className)}>{children}</div>
);