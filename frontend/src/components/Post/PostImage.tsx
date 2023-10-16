import Image from "next/image";

interface PostImageProps {
	image_url: string;
	title: string;
}

export function PostImage({ image_url, title }: PostImageProps) {
	return <Image className="self-stretch h-[180px] rounded-lg" src={image_url} alt={title} />;
}
