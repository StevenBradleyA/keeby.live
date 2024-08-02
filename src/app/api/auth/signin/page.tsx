import Footer from "~/app/_components/Footer/footer";
import Image from "next/image";
import login from "@public/Images/login.png";
import LoginForm from "~/app/_components/Login/loginForm";
import AuthProviders from "~/app/_components/Login/authProviders";

export default function SignIn() {
   
    return (
        <>
            <div className="w-full flex justify-center mt-60">
                <div className=" rounded-2xl w-full  largeLaptop:w-2/3 desktop:w-1/2  bg-keebyGray flex overflow-hidden shadow-2xl relative ">
                    <div className="w-1/2  h-full p-10 flex flex-col items-center justify-center">
                        <Image
                            src={login}
                            alt="login"
                            className="w-60 h-60 object-contain"
                        />
                    </div>
                    <div className="w-1/2 p-20 flex flex-col items-center relative">
                        <LoginForm />
                        <AuthProviders />
                    </div>

                    {/* <div className="w-1/3 bg-lightGray h-full p-10 flex flex-col items-center justify-center rounded-l-3xl">
                       
                       </div>
                       <Image src={login} alt="login" className="w-80 h-80 absolute right-40 bottom-10"/> */}
                </div>
            </div>

            <div className="w-full mt-96 ">
                <Footer />
            </div>
        </>
    );
}

// import type {
//     GetServerSidePropsContext,
//     InferGetServerSidePropsType,
// } from "next";
// import { getProviders, signIn } from "next-auth/react";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "~/server/auth";
// import { authSvg } from "~/app/_components/Svgs/auth";
// import { motion } from "framer-motion";
// import TitleScripts from "~/app/_components/TitleScripts";

// export default function SignIn({
//     providers,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//     return (
//         <>
//             <div className="text-3xl text-green-500">
//                 <TitleScripts page={"signin"} />
//             </div>
//             <div className="z-30 mt-10  rounded-3xl bg-keebyGray px-20 py-10">
//                 {Object.values(providers).map((provider) => (
//                     <div key={provider.name}>
//                         <motion.button
//                             onClick={() => void signIn(provider.id)}
//                             className="button-hover-effect mb-5 rounded-2xl bg-black px-6 py-2 text-green-500"
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             <div className="flex items-center gap-5">
//                                 <div className="w-10">
//                                     {authSvg(provider.name)}
//                                 </div>
//                                 <div>Sign in with {provider.name}</div>
//                             </div>
//                         </motion.button>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// }

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const session = await getServerSession(
//         context.req,
//         context.res,
//         authOptions
//     );

//     // If the user is already logged in, redirect.
//     // Note: Make sure not to redirect to the same page
//     // To avoid an infinite loop!
//     if (session) {
//         return { redirect: { destination: "/" } };
//     }

//     const providers = await getProviders();

//     return {
//         props: { providers: providers ?? [] },
//     };
// }

// import { getCsrfToken, signIn } from "next-auth/react";

// const SignIn = async () => {
//     const csrfToken = await getCsrfToken();

//     return (
//         <div>
//             <form method="post" action="/api/auth/callback/credentials">
//                 <input
//                     name="csrfToken"
//                     type="hidden"
//                     defaultValue={csrfToken}
//                 />
//                 <div>
//                     <label>
//                         Username
//                         <input name="username" type="text" />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Password
//                         <input name="password" type="password" />
//                     </label>
//                 </div>
//                 <button type="submit">Sign in</button>
//             </form>
//             <div>
//                 <button>Sign in with Discord</button>
//                 <button>Sign in with Google</button>
//                 <button>Sign in with GitHub</button>
//             </div>
//         </div>
//     );
// };

// export default SignIn;
