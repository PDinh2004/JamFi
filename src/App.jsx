import { useEffect, useState } from 'react'
import './App.css'
import { Link } from "react-router-dom";
import { supabase } from './client';

function App() {
  const [data, setData] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const now = Date.now();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('Posts2')
        .select()
        .order('created_at', {ascending: true});

      setData(data);
      console.log(data);
    };

    fetchPosts().catch(console.error);

  }, []);

  const convertTime = (time) => {
    const date = new Date(time);
    const postDate = date.getDate();
    const postMonth = date.getMonth() + 1;
    const postHour = date.getHours();
    const postMinute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

    const months = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    }

    return `Posted on ${months[postMonth]} ${postDate} at ${postHour}:${postMinute}`;
  }

  const createList = (data, title) => {
    return (data ? (data.map((post) => {
      if (post.title.toLowerCase().includes(title.toLowerCase())) {
        return (
          <Link id='postCardOut' to={`/post/${post.id}`}>
            <div className='postCard'>
              <p>{convertTime(post.created_at)}</p>
              
              <h1 id='pTitle'>{post.title}</h1>
              
              {post.likes > 0 ? (
                <p>{post.likes} Likes</p>
              ): (
                <p>No Likes</p>
              )}
            </div>
          </Link>
        )
      }
    })) : null);
  }

  return (
    <>
      <br/>
      <br/>
      <input type='text' placeholder='Search Post By Title' onChange={(e) => setPostTitle(e.target.value)}/>
      <button onClick={() => {
        const sortedData = [...data].sort((a, b) => b.likes - a.likes);
        setData(sortedData);
      }}>Sort by Likes</button>

      {data ? (
        <div className='postContainer'>
          {createList(data, postTitle)}
        </div>
      ) : null}

    </>
  )
}

export default App
