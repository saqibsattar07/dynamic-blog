import Markdown from "markdown-to-jsx";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import getPostMetadata from "@/utils/getPostMetadata";

interface PostContent {
  content: string;
  data: {
    title: string;
    prep_time: string;
    cook_time: string;
    description: string;
  };
}

// Function to get the content of a single post
function getPostContent(slug: string): PostContent {
  const folder = path.join(process.cwd(), "src", "recipes");
  const file = path.join(folder, `${slug}.md`);

  if (!fs.existsSync(file)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);

  return {
    content: matterResult.content,
    data: matterResult.data as {
      title: string;
      prep_time: string;
      cook_time: string;
      description: string;
    },
  };
}

// Generate static paths for dynamic routes
export const generateStaticParams = async () => {
  const posts = getPostMetadata("src/recipes");
  return posts.map((post) => ({ slug: post.slug }));
};

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug ?? "";
  return {
    title: `The Bubbly Baker ⋅ ${slug.replaceAll("_", " ")}`,
  };
}

// Main Recipe Page component
export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = getPostContent(slug);

  return (
    <main>
      <article>
        <h1>{post.data.title}</h1>
        <div>
          <p>
            <strong>Prep Time:</strong> {post.data.prep_time}
          </p>
          <p>
            <strong>Cook Time:</strong> {post.data.cook_time}
          </p>
          <p>{post.data.description}</p>
        </div>
        <Markdown>{post.content}</Markdown>
      </article>
    </main>
  );
}
