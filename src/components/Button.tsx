import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    children,
    className,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button
        type={type}
        className={twMerge("w-full rounded-full bg-green-500 border border-transparent px-3 py-3 text-black font-bold hover:placeholder-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition", className)}
        disabled={disabled}
        ref={ref}
        {...props}>
            {children}
        </button>
    )
})

Button.displayName = "Button";
