import { auth, signIn, signOut } from "@/auth"
import Image from "next/image"
import Link from "next/link"

const NavBar = async ()=>{
    const session =  await auth();
    return(
        <div className="px-5 py-3 bg-white shadow-sm font-work-sans mx-auto">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <Image src='/logo.png' alt="Logo" width={144} height={30}/>               
                </Link>

                <div className="flex items-center gap-5 text-black">
                  {session && session?.user ? (<>
                    <Link href="/startup/create">
                        <span>Create</span>
                    </Link>
                    <form action={async()=>{
                        "use server";
                        await signOut({redirectTo:"/"});
                    }}>
                        <button type="submit">
                                <span>Logout</span>
                        </button>
                    </form>
                    

                    <Link href={`/user/${session?.id}`}>
                        <span>{session?.user?.name}</span>
                    </Link>
                  </>):(
                    <form action={async()=>{
                        "use server";
                        await signIn()
                    }}>
                        <button type="submit">
                             <span>Login</span>
                        </button>
                            
                    </form>
                        
                    
                  )}

                </div>
            </div>
        
        </div>
    )
}

export default NavBar