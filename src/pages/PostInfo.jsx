import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Link, useParams } from 'react-router-dom';
import './PostInfo.css';

const PostInfo = ({data}) => {
    let params = useParams();
    const [change, setChange] = useState(false);
    const [post, setPost] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase
                .from('Posts2')
                .select()
                .eq('id', params.postid);
            setPost(data[0]);
            console.log(data[0].comments);
        }

        fetchData().catch(console.error);
    }, [change]);

    const addLike = async () => {
        await supabase
            .from('Posts2')
            .update({
                likes: post.likes + 1
            })
            .eq('id', params.postid);

        setChange(!change);
    };

    const addComment = async () => {
        const comment = document.getElementById('commentInput').value;
        if (post.comments == null) {
            post.comments = [comment];
        } else {
            post.comments.push(comment);
        }
        await supabase
            .from('Posts2')
            .update({
                comments: post.comments
            })
            .eq('id', params.postid);

        setChange(!change);
    };

    const deletePost = async () => {
        await supabase
            .from('Posts2')
            .delete()
            .eq('id', params.postid);
        
        window.location.href = '/';
    };

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

    return (
        <div>
            {post ? (
                <div className='postInfoCont'>
                    <h1 style={{marginTop: "10%"}}>{post.title}</h1>
                    <p>{convertTime(post.created_at)}</p>
                    <h2>{post.description}</h2>
                    <iframe width="560" height="315" src={post.url} />
                    <div className='like-edit-del-Section'>
                        <div className='likeSection'>
                            <img onClick={() => addLike()} src="https://static.vecteezy.com/system/resources/previews/013/743/624/original/favorite-music-heart-icon-png.png" alt="upvote icon" style={{width: "50px", height: "50px"}} />
                            {post.likes > 0 ? (
                                <h2 id='likeCount'>{post.likes} Likes</h2>
                            ) : (
                                <h2 id='likeCount2'>Be the first to like!</h2>
                            )}
                        </div>

                        <div className='edit-del-Section'>
                            <Link to={`/edit/${params.postid}`}>
                                <img id='img1' src='https://cdn-icons-png.flaticon.com/512/6065/6065488.png' alt='edit icon' style={{width: "50px", height: "50px"}} />
                            </Link>

                            <img id='img2' onClick={() => deletePost()} src='https://cdn0.iconfinder.com/data/icons/user-experience-27/48/14_trash_can_rubbish_garbage_button_delete-512.png' alt='delete icon' style={{width: "50px", height: "50px"}} />
                        </div>
                    </div>

                    <h1>Comments</h1>
                    <input type='text' id='commentInput' placeholder='Add a comment...' />
                    <button id='commentButton' onClick={() => addComment()}>Submit</button>
                    
                    {post.comments ? (
                        post.comments.map((comment) => (
                            <p>{comment}</p>
                        ))
                    ) : (
                        <h3>Be the first to comment!</h3>
                    )}
                    
                </div>
            ) : null}
        </div>
    );
}


export default PostInfo;