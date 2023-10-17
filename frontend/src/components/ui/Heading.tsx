import { cn } from "../../lib/utils";
import { FC, HTMLProps, PropsWithChildren } from "react";

type HeadingProps = {
	level?: "main" | "section";
	variant?: "small" | "medium" | "large";
	centered?: boolean;
} & HTMLProps<HTMLHeadingElement>;

export const Heading: FC<PropsWithChildren<HeadingProps>> = ({
	level = "section",
	variant = "medium",
	centered,
	children,
	className,
}: PropsWithChildren<HeadingProps>) => {
	const variants = {
		large: "text-4xl text-zinc-950 dark:text-white",
		medium: "text-2xl text-zinc-950 dark:text-white",
		small: "text-xl text-zinc-950 dark:text-white",
	};

	const headingLevels = {
		main: "h1",
		section: "h2",
	};

	const HeadingTag = headingLevels[level];

	return (
		<HeadingTag
			className={cn("font-bold tracking-tight text-primary", variants[variant], className, {
				"text-center": centered,
			})}
		>
			{children}
		</HeadingTag>
	);
};
