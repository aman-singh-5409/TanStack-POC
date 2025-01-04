import {
  usePrefetchQuery,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { api } from "../api/apiClient";
import { CommentResponse } from "../types/Comment";
import { Suspense } from "react";
import Loader from "../components/Loader";
import { Post as PostModel } from "../types/Post";
import { getRandomColor } from "../utils/colors";

const getPostComments = async (id: number) => {
  try {
    const res = await api.get<CommentResponse>(`/posts/${id}/comments`);

    if (res.status === 200) {
      return res.data;
    }

    throw new Error("Failed to fetch comments!");
  } catch (error) {
    throw error;
  }
};

const Prefetching = () => {
  const postId = 1;

  // Prefetching the comments of the post, before fetch post's data;
  usePrefetchQuery({
    queryKey: ["post-comments", postId],
    queryFn: () => getPostComments(postId),
    staleTime: 5000,
  });

  return (
    <Suspense fallback={<Loader />}>
      <Post id={postId.toString()} />
    </Suspense>
  );
};

export default Prefetching;

const Post = ({ id }: { id: string }) => {
  const getPostData = async () => {
    try {
      const res = await api.get<PostModel>(`/posts/${id}`);

      if (res.status === 200) {
        return res.data;
      }

      throw new Error("Failed to fetch post!");
    } catch (error) {
      throw error;
    }
  };

  const { data } = useSuspenseQuery({
    queryKey: ["post", id],
    queryFn: getPostData,
  });

  console.log({ postData: data });

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Post with comments</h1>
      <div className="w-full bg-[#222] p-4 rounded-xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{data.title}</h1>
          <div className="flex items-center gap-1">
            {data.tags.map((tag) => (
              <div
                className="border-2 border-black py-1 px-2 capitalize rounded-xl text-sm font-bold text-black"
                style={{ backgroundColor: getRandomColor() }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm font-thin text-justify">{data.body}</p>
        <div className=""></div>
      </div>
      <Comments id={id} />
    </div>
  );
};

const Comments = ({ id }: { id: string }) => {
  const { data } = useQuery({
    queryKey: ["post-comments", id],
    queryFn: () => getPostComments(Number(id)),
  });

  console.log({ commentData: data });

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Comments</h1>
      <div className="flex flex-col gap-2">
        {data?.comments.map((comment) => (
          <div className="bg-[#222] p-3 rounded-xl flex items-center justify-between gap-2">
            <p className="font-thin text-sm">
              <span className="font-bold text-sm">{comment.user.fullName}</span>{" "}
              {comment.body}
            </p>

            <div
              className="border-2 border-black w-max py-1 px-2 capitalize rounded-lg text-sm font-bold text-black"
              style={{ backgroundColor: getRandomColor() }}
            >
              {comment.likes} Likes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
