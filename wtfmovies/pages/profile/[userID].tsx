import { useRouter } from 'next/router';
import { GetServerSidePropsResult } from 'next';
import { useState } from 'react';

interface User {
    name: string;
    avatar: string;
    birthDate: string;
    // Add other user properties here
}

export async function getServerSideProps(context: {
    params: { userID: string };
}): Promise<GetServerSidePropsResult<User>> {
    const { userID } = context.params;

    // Fetch user data from an API or database (replace with your logic)
    const res = await fetch(`http://localhost:3000/api/profile?id=${userID}`);

    const userData: User = await res.json();

    // If user not found, redirect to a 404 page (optional)
    if (!userData) {
        return {
            notFound: true,
        };
    }

    return {
        props: userData,
    };
}

export default function Profile({ name, avatar, birthDate }: User) {
    const router = useRouter();

    const [a, setA] = useState('');

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{name}</h1>
            <p>avatar: {avatar}</p>
            <p>birthDate: {birthDate}</p>
            {/* Display other user information from props */}
        </div>
    );
}
