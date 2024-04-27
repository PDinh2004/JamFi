import React from 'react';
import { useState } from 'react';
import './Share.css';
import { supabase } from '../client';

const Share = () => {
    const [post, setPost] = useState({title: '', description: '', url: '', likes: 0, comments: []});

    const handleSubmit = async () => {
        // Add post to database
        await supabase
            .from("Posts2")
            .insert({title: post.title, description: post.description, url: post.url, likes: post.likes, comments: post.comments})
            .select();

        window.location = "/";
    }

    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    return (
        <div className='sharePage'>
            <h1>Share</h1>
            <input
                className='titleInput'
                type="text"
                placeholder="Title"
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})}
            />
            <br/>
            <textarea
                type="text"
                className='descriptionInput'
                placeholder="Description"
                align='top'
                value={post.description}
                onChange={(e) => setPost({...post, description: e.target.value})}
            />
            <br/>
            <input
                type="text"
                className='titleInput'
                placeholder="URL"
                value={post.url}
                onChange={(e) => setPost({...post, url: "https://www.youtube.com/embed/" + youtube_parser(e.target.value)})}
            />
            <br/>
            <button style={{backgroundColor: "#FF7D7D"}} onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Share;