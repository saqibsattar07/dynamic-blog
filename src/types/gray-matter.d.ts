declare module 'gray-matter' {
    export interface GrayMatterFile<T> {
        content: string;
        data: T;
        excerpt?: string;
        isEmpty?: boolean;
        matter?: string;
    }

    export default function matter<T>(
        input: string
    ): GrayMatterFile<T>;
}
