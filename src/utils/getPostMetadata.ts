import fs from "fs";
import matter from "gray-matter";

interface PostMetadata {
  title: string;
  prep_time: string;
  cook_time: string;
  bio: string;
  slug: string;
}

export default function getPostMetadata(basePath: string): PostMetadata[] {
  const folder = `${basePath}/`;

  if (!fs.existsSync(folder)) return [];

  return fs
    .readdirSync(folder)
    .filter((file) => file.endsWith(".md"))
    .map((filename) => {
      const fileContents = fs.readFileSync(`${folder}/${filename}`, "utf8");
      const { data } = matter(fileContents) as {
        data: {
          title: string;
          prep_time: string;
          cook_time: string;
          description: string;
        };
      };

      if (data.title && data.prep_time && data.cook_time && data.description) {
        return {
          title: data.title,
          prep_time: data.prep_time,
          cook_time: data.cook_time,
          bio: data.description,
          slug: filename.replace(".md", ""),
        };
      }
      return null;
    })
    .filter(Boolean) as PostMetadata[];
}
