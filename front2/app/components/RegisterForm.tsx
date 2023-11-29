'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'
import as from '../lib/auth.js'


export default function LoginForm() {

    const { register, handleSubmit } = useForm();
    const [isLoading, setLoading] = useState(false);
    const [token, setToken] = useState('')
    const router = useRouter();

    const goToUserPage = () => {
        router.push('/');
        router.refresh()
    };

    const login = async (data: any) => {
        fetch(`http://localhost:8080/api/v1/auth/register`, {
            method: "POST",
            body: JSON.stringify({
                email: data.email,
                firstname: data.name,
                lastname: data.username,
                password: data.password,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then((json) => { if (json) { as.setUserInfo(data.email, json.token); goToUserPage();} }).catch(console.error);

    }



    return (
        <div className='mt-10 flex flex-col items-center justify-center rounded-lg'>
            <form className='flex justify-center items-start flex-col text-black dark:text-white text-right' onSubmit={handleSubmit(login)}>
                <span>Last Name:</span>
                <input type="text" id="login" placeholder='username' className='w-full bg-teal-500 placeholder-teal-900' {...register('username')} />
                <span>First Name:</span>
                <input type="text" id="name" placeholder='Display Name' className='w-full bg-teal-500 placeholder-teal-900' {...register('name')} />
                <span>Email:</span>
                <input type="text" id="email" placeholder='email' className='w-full bg-teal-500 placeholder-teal-900' {...register('email')} />
                <span>Password:</span>
                <input type="password" id="password" placeholder='password' className='w-full bg-teal-500 placeholder-teal-900' {...register('password')} />
                <button type="submit" className='mt-2 w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-primary-800 bg-teal-600 hover:bg-teal-950' disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                </button>

            </form>
        </div>
    )
}
