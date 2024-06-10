import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png"
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image width={70}  src={logo} alt="The Wild Oasis logo" />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
