import SideNavigation from "../_components/SideNavigation";
import "@/app/_styles/globals.css"

export default function Layout({children}){
    return (<div className="grid grid-cols-[16rem_1fr] h-full gap-12">
        <SideNavigation/>
        <div className="py-1">{children}</div>
        </div>)
}