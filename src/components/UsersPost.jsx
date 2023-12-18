import React, { useEffect } from 'react'
import Users from './Users'
import PostCard from './PostCard'
import { useParams } from "react-router-dom";
import Header from './Header';

import { useNavigate } from 'react-router-dom';


export default function UsersPost() {
    const navigate = useNavigate();

    let { userId } = useParams();

    const [userPosts, setUserPosts] = React.useState([]);
    const [user, setUser] = React.useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/user/posts/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                const formattedPost = data.map((postData) => {
                    const post = postData.posts;
                    const user = postData.users;
                    return {

                        postId: post.id,
                        title: post.title,
                        content: post.content,
                        createdAt: post.created_at,
                        userFirstName: user.firstname,
                        userLastName: user.lastname,

                    }
                });
                setUserPosts(formattedPost);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3001/user/profile/${userId}`)
            .then((response) => response.json())
            .then((data) => {

                setUser({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    createdAt: data.created_at
                });
            });
    }, []);


    return (
        <div>
            <Header/>
            <div className='flex justify-between pt-2 pr-4 flex-row-reverse'>
                
          

<div className='pt-4'>
    

<button onClick={()=>{
                    navigate('/dashboard')
                }}  className='bg-indigo-700 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded w-full mt-2'>
                    Go to Dashboard
                </button>
                </div>
            <div className='px-10 py-50 p-2'>
                <h1 className='text-2xl mb-2 font-bold'>User Profile</h1>
                <Users firstName={user.firstName} lastName={user.lastName} email={user.email} id={user.id} />
            </div>
            </div>

            <div className='flex justify-left items-center'>


                <div className='px-10 py-50 p-2'>

                    <div className='flex'>
                        <h2 className='text-2xl mb-2 font-bold'>Posts by User</h2>

                    </div>

                    {userPosts.map((post) => {
                        return <PostCard key={post.postId}

                            postId={post.postId}


                            firstName={post.userFirstName}

                            createdAt={post.createdAt}

                            lastName={post.userLastName}

                            title={post.title}

                            content={post.content}

                            numberOfLikes={0}
                        />
                    })}
                </div>



            </div>

        </div>
    )
}
