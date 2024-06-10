import { auth } from "@/app/_lib/auth";
import Link from "next/link";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex  items-center gap-4 ">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>{session?.user?.image ?   
         <Link
            href="/account"
            className="hover:text-accent-400 transition-colors px-5  gap-4 flex"
          >
            <img className="h-8 rounded-full" src={session.user.image} alt={session.user.name} referrerPolicy="no-referrer">
            </img>
            <span>
            Guests
            </span>
          </Link>:   <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            Guests
          </Link>
          }
        </li>
      </ul>
    </nav>
  );
}
