interface PostHeaderProps {
	title: string;
	created_at?: Date;
	created_by?: string;
	synopsis?: string;
}

export function PostHeader({ title }: PostHeaderProps) {
	return (
		<h2 className="self-stretch text-zinc-950 text-sm sm:text-base md:text-lg font-semibold">
			{title}
		</h2>
	);
}
