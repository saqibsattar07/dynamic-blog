import SearchView from "@/components/SearchView";
import getPostMetadata from "@/utils/getPostMetadata";

export default async function Home() {
  const postMetadata = await getPostMetadata("src/recipes");

  return (
    <main>
      {postMetadata?.length > 0 ? (
        <SearchView postMetadata={postMetadata} />
      ) : (
        <p>No posts found.</p>
      )}
    </main>
  );
}
