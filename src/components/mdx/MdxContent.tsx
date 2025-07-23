import { promises as fs } from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const CustomImage = (props: any) => (
    <span className="block my-8">
        <Image
            {...props}
            width={1200}
            height={675}
            className="rounded-lg object-contain w-full h-auto"
        />
    </span>
);

const components = {
    img: CustomImage,
};

export async function MdxContent({ slug }: { slug: string }) {
    const filePath = path.join(process.cwd(), 'src', 'content', 'devlog', `${slug}.mdx`);
    
    let source;
    try {
        source = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        notFound();
    }

    const { content } = await compileMDX({
        source,
        components,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    [rehypePrettyCode, { theme: 'github-dark' }],
                ],
            },
        },
    });

    return (
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-indigo-400 hover:prose-a:text-indigo-300">
            {content}
        </div>
    );
}
