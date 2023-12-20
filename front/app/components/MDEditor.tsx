'use client'
import React, { useState } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import as from '../lib/auth.js'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';


export default function MDedit() {
    const { register, handleSubmit } = useForm();
    const [text, setText] = useState('# Start your new blogpost here...');
    const router = useRouter();

    const goToPostPage = () => {
        router.push('/posts');
        router.refresh()
    };

    const post = async (data: any) => {
        fetch(`http://localhost:8080/api/v1/blogs`, {
            method: "POST",
            body: JSON.stringify({
                title: data.title,
                overview: data.overview,
                text:text,
                //short_link:slug(data.title),
                created:new Date().toISOString(),
                name:as.getId(),
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": as.getToken(),
            }
        })
            .then((response) => goToPostPage()); //response.json())
            //.then((json) => { goToPostPage(); });
    }

    return ( 
    <div >
        {as.getToken()!="" ? 
        <form  onSubmit={handleSubmit(post)} className='flex flex-col'>
        <span className='text-xl'>Title:</span>
        <input type="text"placeholder='Title' {...register('title')}/>
        <span className='text-xl'>Overview:</span>
        <input type="text" placeholder='Overview...' {...register('overview')}/>
        <MdEditor modelValue={text} onChange={setText} theme='dark' language='en-US' />
        <button type="submit" className='bg-teal-700 hover:bg-teal-800'>Post</button>
        </form>:<div className="flex w-full mt-40 font-semibold text-5xl justify-center">Login first!</div>}
    </div>
    );
};