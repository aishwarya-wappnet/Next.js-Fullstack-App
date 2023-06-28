"use client"

import Profile from '@components/Profile';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';

const page = () => {

    const [myPosts, setMyPosts] = useState([]);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json();
            setMyPosts(data);
        }
        if (session?.user.id) fetchPosts();
    }, [session?.user.id])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = () => {

    }

    return (
        <Profile
            name="My"
            desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
            data={myPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default page
