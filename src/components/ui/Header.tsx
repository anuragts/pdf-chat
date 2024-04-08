import Link from "next/link";
import { auth } from "@clerk/nextjs";

export default function Header() {
  const { userId }: { userId: string | null } = auth();

  return (
    <nav className="flex items-center h-12 px-4 border-b bg-gray-100 dark:bg-black">
      <Link className="font-semibold mr-auto" href="/">
        chatPDF
      </Link>
      <div className="flex ml-auto space-x-4">
        {userId ? (
          <>
            {" "}
            <Link
              className="inline-flex h-8 items-center justify-center rounded-md bg-white px-3 text-sm font-medium hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-900 dark:hover:text-gray-50"
              href="/upload"
            >
              Upload
            </Link>
            <Link
              className="inline-flex h-8 items-center justify-center rounded-md bg-white px-3 text-sm font-medium hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-900 dark:hover:text-gray-50"
              href="/chat"
            >
              Chat
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Link
              className="inline-flex h-8 items-center justify-center rounded-md bg-white px-3 text-sm font-medium hover:bg-gray-100 hover:text-gray-900 dark:bg-white dark:hover:bg-gray-200 dark:hover:text-black text-black"
              href="/sign-up"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
