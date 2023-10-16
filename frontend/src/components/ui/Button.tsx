import { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "default" | "secondary";
	size?: "default" | "sm" | "lg" | "icon";
	className?: string;
};

export const Button: FC<ButtonProps> = ({
	variant = "default",
	size = "default",
	className,
	...props
}) => {
	const variants = {
		variant: {
			default:
				"bg-zinc-100 text-zinc-950 hover:bg-zinc-300 text-xs md:text-sm p-2 border-current border-solid border-4 uppercase",
			secondary: "bg-zinc-100 text-zinc-950 hover:bg-zinc-300 text-xs md:text-sm p-2 uppercase",
		},
		size: {
			default: "h-10 px-4 py-2",
			sm: "h-9 rounded-md px-3",
			lg: "h-11 rounded-md px-8",
			icon: "h-10 w-10",
		},
	};

	return (
		<button
			className={`${(variants.variant[variant], variants.size[size], className)}`}
			{...props}
		/>
	);
};
