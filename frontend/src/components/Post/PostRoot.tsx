import { ReactNode } from "react";

interface PostRoot {
	children: ReactNode;
}

export function PostRoot({ children }: PostRoot) {
	return (
		<article className="flex-col justify-start items-start gap-2 inline-flex bg-zinc-500 hover:bg-zinc-400">
			{children}
		</article>
	);
}
