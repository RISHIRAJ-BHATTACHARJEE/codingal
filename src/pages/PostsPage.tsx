import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      
      if (!response.ok) throw new Error("Failed to fetch posts");
      
      const data = await response.json();
      setPosts(prev => [...prev, ...data]);
      setHasMore(data.length > 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop < 
          document.documentElement.offsetHeight - 100 ||
        loading ||
        !hasMore
      ) return;
      setPage(prev => prev + 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => {
            setError(null);
            fetchPosts();
          }}
          className="px-4 py-2 text-white bg-[#FF5A44] rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl px-4 mx-auto mt-8">
      <h1 className="mb-6 text-2xl font-semibold text-center">Posts</h1>
      
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 mb-4 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="mt-2 text-zinc-600">{post.body}</p>
            <p className="mt-2 text-sm text-zinc-400">User ID: {post.userId}</p>
          </motion.div>
        ))}
      </AnimatePresence>

      {loading && (
        <div className="flex justify-center my-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF5A44]" />
        </div>
      )}

      {!hasMore && (
        <p className="py-4 text-center text-zinc-500">No more posts to load</p>
      )}
    </div>
  );
};

export default PostsPage;