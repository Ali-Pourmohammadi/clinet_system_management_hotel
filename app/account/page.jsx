import { auth } from "../_lib/auth"

export const metadata = {
    title:"guest area"
}
export default async function Page(){
    const session = await auth();
    const {user} = session;
    const firstName = user?.name.split(" ").at(0)
return <h1> hello {firstName}</h1>
}