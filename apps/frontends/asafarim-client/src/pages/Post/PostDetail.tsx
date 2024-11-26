import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IBlogPost } from "../../interfaces/IBlogPost";
import Wrapper from "../../layout/Wrapper/Wrapper";

const PostDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<IBlogPost | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const API_URL = (import.meta as any).env.VITE_API_URL;
    console.log(`API URL is: ${API_URL}`, `import.meta.env.VITE_API_URL is: ${(import.meta as any).env.VITE_API_URL}`);

    useEffect(() => {
        axios
            .get(`${API_URL}/blogposts/${slug}`)
            .then((response) => {
                setPost(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load the post");
                setLoading(false);
            });
    }, [slug, API_URL]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error || !post) {
        return <p>{error || "Post not found"}</p>;
    }

    const { title, content, author, publishedDate, tags } = post;
    const formattedDate = new Date(publishedDate).toLocaleDateString();
    const formattedTime = new Date(publishedDate).toLocaleTimeString();
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    const formattedAuthor = author ? `Author: ${author}` : "";
    const formattedPostHeader = `${formattedDateTime} | ${formattedAuthor} `;
    const formattedContentWithBreaks = content.replace(/\n/g, "\n\n");
    const formattedPostHeaderWithBreaks = formattedPostHeader.replace(/\n/g, "\n\n");

    const header = (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-gray-600 mb-6">{formattedPostHeaderWithBreaks}</p>
        </div>
    )
    // Render the post details
    return (
        <Wrapper pageTitle={post.title} header={header}>
            <div className="max-w-3xl mx-auto p-4">
                <div dangerouslySetInnerHTML={{ __html: formattedContentWithBreaks }} />
                <div>
                    <div className="tags space-x-4 mt-4">
                        Tags: {tags?.map(tag => (
                            <a key={tag.id} href={`/tags/${tag.name}`}>{tag?.title ?? tag.name}</a>
                        ))}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default PostDetail;
