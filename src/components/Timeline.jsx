import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';
import { Link } from 'react-router-dom';



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
        
        <div className='bg-violet-500' >
            <div className=' flex justify-around items-center p-12 w-full h-96'>
                
           
            <div className='text-center'>
                
          
            <h1 className='text-6xl font-bold  text-white'>FeedFrenzy Timeline</h1>

            </div>
            <div className='flex justify-around items-center justify-end p-4 gap-2'>
                
            <Link to="/register" className='text-xl border-2 rounded-md text-white hover:text-rose-300 px-4'> Register </Link> 

           
            <Link to="/login" className='text-xl border-2 rounded-md text-white  hover:text-rose-300 px-4 '> Login </Link>
             
                </div>
                </div>
            <div className='flex justify-center flex-col items-center  justify-center items-center mb-5 p-4'>
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
