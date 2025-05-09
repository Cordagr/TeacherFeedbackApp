import React, { useState } from "react";
import cn from "classnames";

export const Select = ({ children, className, ...props }) => {
  return (
    <div className={cn("relative inline-block w-full", className)} {...props}>
      {children}
    </div>
  );
};

export const SelectTrigger = ({ onClick, children, className, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const SelectContent = ({ isOpen, children, className, ...props }) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const SelectItem = ({ value, onClick, children, className, ...props }) => {
  return (
    <div
      onClick={() => onClick(value)}
      className={cn(
        "cursor-pointer px-3 py-2 text-sm hover:bg-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const SelectValue = ({ value, placeholder, className, ...props }) => {
  return (
    <span
      className={cn(
        "block truncate text-sm text-gray-700",
        !value && "text-gray-400",
        className
      )}
      {...props}
    >
      {value || placeholder}
    </span>
  );
};