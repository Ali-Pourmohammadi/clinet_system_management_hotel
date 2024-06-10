import Image from "next/image";
import bgImage from "@/public/others/bg.png"

export default function Home() {
  return (
    
      <main className="mt-24">
    <Image src={bgImage} fill className="object-cover object-top" placeholder="blur" quality={80}  alt="Mountains and forests with two cabins" />

    <div className="relative z-10 text-center">
      <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal my-6">
        Welcome to paradise 
      </h1>
      <a
        href="/cabins"
        className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
      >
        Explore luxury cabins
      </a>
    </div>
  </main>
  

  );
}
