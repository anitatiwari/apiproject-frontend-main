import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';



export default function Timeline() {
    const [allPosts, setAllPosts] = React.useState([]);


    useEffect(() => {
        fetch('http://localhost:3001/post/getAllPosts')
            .then(response => response.json())
            .then(data => {
                const postFormattedData = data.map((postData) => {
                    const post = postData.posts;
                    const user = postData.users;
                    return {

                        postId: post.id,
                        title: post.title,
                        content: post.content,
                        createdAt: post.created_at,
                        userFirstName: user.firstname,
                        userLastName: user.lastname,
                        numberOfLikes: postData.likeCount,

                    }
                })

                const sortedPost = postFormattedData.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt)
                })
                setAllPosts(sortedPost)
            })
    }
        , [])



    return (
        
        <div className='flex flex-col items-center justify-center p-5'>
            <div className='p-12'>
                
          
            <h1 className='text-2xl font-bold mb-5 text-blue-800'>PostQuilt Timeline</h1>
            </div>
            <div className='flex justify-center items-center mb-5'>
                <div className='w-full grid grid-cols-3 gap-1'>

                    {allPosts.map((post) => {
                        return (
                            <PostCard
                                key={post.id}
                                postId={post.id}
                                firstName={post.firstName}
                                lastName={post.lastName}
                                createdAt={post.createdAt}
                                title={post.title}
                                content={post.content}
                                numberOfLikes={post.numberOfLikes}
                                isAuthor={post.isAuthor}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
