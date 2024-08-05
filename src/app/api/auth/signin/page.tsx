import Footer from "~/app/_components/Footer/footer";
import Image from "next/image";
import login from "@public/Images/login.png";
import AuthProviders from "~/app/_components/Login/authProviders";

export default function SignIn() {
    return (
        <>
            <div className="w-full flex justify-center mt-60">
                <div className=" rounded-2xl w-full  largeLaptop:w-2/3 desktop:w-1/2  bg-darkGray flex overflow-hidden shadow-2xl relative ">
                    <div className="w-1/2  h-full p-10 flex flex-col items-center justify-center">
                        <Image
                            src={login}
                            alt="login"
                            className="w-60 h-60 object-contain"
                        />
                    </div>
                    <div className="w-1/2 p-20 flex flex-col items-center relative">
                        <AuthProviders />
                    </div>
                </div>
            </div>

            <div className="w-full mt-96 ">
                <Footer />
            </div>
        </>
    );
}
