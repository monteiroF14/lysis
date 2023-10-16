interface PostBodyProps {
	body: string;
	created_at: Date;
}

export function PostBody({ body, created_at }: PostBodyProps) {
	return (
		<main className="self-stretch text-black text-xs sm:text-sm md:text-base font-normal">
			<p>{body}</p>
			<p className="text-neutral-400 text-xs sm:text-sm md:text-base">
				{created_at.toLocaleString()}
			</p>
		</main>
	);
}
