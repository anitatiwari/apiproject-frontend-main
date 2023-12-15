import React from "react";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import EditPostModal from "./EditPostModal";
import en from "javascript-time-ago/locale/en";
import toast from "react-hot-toast";

TimeAgo.addDefaultLocale(en);

export default function PostCard({
  postId,
  firstName,
  lastName,
  createdAt,
  title,
  content,
  numberOfLikes,
  isAuthor = false,
}) {
  const [editModalOpen, setEditModalOpen] = React.useState(false);

  const handleLike = () => {
    fetch(`http://localhost:3001/post/like/`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        id: postId,
        like: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Post liked successfully");
        } else {
          if (response.status === 401) {
            toast.error("You need to be logged in to like a post");
          }
        }
      })
      .catch(
        (error) => {
          toast.error("Something went wrong");
        }
      );
  };

  const handleDeletePost = () => {
    fetch(`http://localhost:3001/post/posts/${postId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Post deleted successfully");
        }
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div
      className="border mb-2 text-card-foreground bg-white rounded-lg shadow-md p-6  w-full "
      data-v0-t="card"
    >
      <EditPostModal
        postId={postId}
        isOpen={editModalOpen}
        setIsOpen={setEditModalOpen}
        existingTitle={title}
        existingDescription={content}
      />
      <div className="flex space-x-4">
        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <img
            className="aspect-square h-full w-full"
            alt="User Avatar"
            src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
          />
        </span>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold text-lg">{title}</h4>
              <p className="text-gray-500 "></p>
            </div>
            <p className="text-gray-500 ">
              <ReactTimeAgo date={createdAt} timeStyle="twitter" />
            </p>
          </div>
          <p className="mt-2 p-2 text-gray-800">{content}</p>

          <div className=" flex mt-2">
            <button
              onClick={handleLike}
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <svg
                class="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a.914.914 0 01-.494-.149l-7-4a1 1 0 010-1.702l7-4a1 1 0 011 1.702L4.236 10 11 13.447l1.74-1.002a1 1 0 011 1.702l-7 4A.914.914 0 0110 18zm8-10a1 1 0 10-2 0 1 1 0 002 0zM2 8a1 1 0 112-2h11a1 1 0 110 2H4a1 1 0 01-2 0z"
                  clip-rule="evenodd"
                />
              </svg>
              Like ({numberOfLikes})
            </button>

            {isAuthor ? (
              <button
                onClick={handleDeletePost}
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-2"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a.914.914 0 01-.494-.149l-7-4a1 1 0 010-1.702l7-4a1 1 0 011 1.702L4.236 10 11 13.447l1.74-1.002a1 1 0 011 1.702l-7 4A.914.914 0 0110 18zm8-10a1 1 0 10-2 0 1 1 0 002 0zM2 8a1 1 0 112-2h11a1 1 0 110 2H4a1 1 0 01-2 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Delete
              </button>
            ) : (
              <></>
            )}

            {isAuthor ? (
              <button
                onClick={() => setEditModalOpen(true)}
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-2"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a.914.914 0 01-.494-.149l-7-4a1 1 0 010-1.702l7-4a1 1 0 011 1.702L4.236 10 11 13.447l1.74-1.002a1 1 0 011 1.702l-7 4A.914.914 0 0110 18zm8-10a1 1 0 10-2 0 1 1 0 002 0zM2 8a1 1 0 112-2h11a1 1 0 110 2H4a1 1 0 01-2 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Edit
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
