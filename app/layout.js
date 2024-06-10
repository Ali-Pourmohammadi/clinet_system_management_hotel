import Logo from "@/app/_components/Logo";
import NavigationLinks from "./_components/navigation-links";
import "@/app/_styles/globals.css"
import {Josefin_Sans} from "next/font/google"
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
const josefin = Josefin_Sans({
  subsets:["latin"],
  display:'swap'
});
export const metadata = {
  title:{
    template: "%s  |  The Wild Oasis",
    default :  "Welcome |  The Wild Oasis"
  },
  description:"luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark  forests "
}
export default function RootLayout({children}){

  return <html>
    <body className = {`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}>
      <Header/>
      <div className="flex-1 px-8 py-12">
      <main className="mx-auto  max-w-7xl">
        <ReservationProvider>
      {children}
        </ReservationProvider>

      </main>
      </div>
    
    </body>
  </html>
}