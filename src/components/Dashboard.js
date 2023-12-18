import React, { useEffect, useState } from 'react'
import Header from './Header'
import CreatePostModal from './CreatePostModal'
import PostCard from './PostCard';
import Users from './Users';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

  const navigate = useNavigate();



  const [posts, setPosts] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://openapi-ncb5.onrender.com/user/listUsers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(response => {
      return response.json()
    }).then(data => {

      setUsers(data)
    }).catch((err) => {
      navigate('/login');
    })
  }, [])



  useEffect(() => {
    fetch('http://localhost:3001/post/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(response => {


      return response.json()
    }).then(data => {
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

        }
      })

      const sortedPost = postFormattedData.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
      setPosts(sortedPost)

    }).catch((err) => {
      navigate('/login');
    })
  }, [])




  return (
    <div>
      <Header />
      <div className='p-2'>



        <div className='flex justify-around w-full'>

          <div className='px-10 py-10 p-2'>
            <div className='flex'>
              <h2 className='text-2xl mb-2 font-bold'>Posts</h2>
              <div className='ml-auto'>
                <CreatePostModal />
              </div>
            </div>

            {posts.map((post) => {
              return <PostCard 
              
                key={post.postId}

                postId={post.postId}

                isAuthor={true}

                firstName={post.userFirstName}

                createdAt={post.createdAt}

                lastName={post.userLastName}

                title={post.title}

                content={post.content}

                numberOfLikes={0}

                
              />
            })}
          </div>

          <div className='px-10 py-50 p-2'>
            {users.map((user) => {
              return <Users key={user.id}
                firstName={user.firstname}
                lastName={user.lastname}
                email={user.email}
                id={user.id}
              />
            })}
          </div>

        </div>

      </div>
    </div>
  )
}
