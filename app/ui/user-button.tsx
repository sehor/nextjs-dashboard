import { auth } from "@/auth";
import Link from 'next/link';

export default async function UserButton() {
    const session = await auth();

    const buttonClass = "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105";

    if (!session?.user) {
        return (
            <Link
                href="/login"
                className={buttonClass}
            >
                未登录
            </Link>
        );
    }

    return (
        <Link
            href="/session-info"
            className={buttonClass}
        >
            {session.user.name}
        </Link>
    );
}
