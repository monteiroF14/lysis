import { Post } from "./Post";
import { fetchAllPosts } from "@/hooks/fetchPosts";

export const revalidate = 60;

export async function PostsList() {
	try {
		const { data: posts, error } = await fetchAllPosts();

		if (error) {
			console.error("Error fetching posts:", error);
			return <div>Error fetching posts!</div>;
		}

		if (!posts || posts.length === 0) {
			return <div>There are no posts!</div>;
		}

		return (
			<section className="group">
				{posts.map(({ id, title, body, created_at, image_url }) => (
					<Post.Root key={id}>
						<Post.Image image_url={image_url} title={title} />
						<Post.Header title={title} />
						<Post.Body body={body} created_at={created_at} />
					</Post.Root>
				))}
			</section>
		);
	} catch (error) {
		console.error("Error fetching posts:", error);
		return <div>Error fetching posts!</div>;
	}
}
