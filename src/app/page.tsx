import KeebTypeFooter from "./_components/Footer/minimalFooter";
import KeebType from "./_components/Games";

export default function Home() {
    return (
        <div className="w-full h-screen overflow-hidden">
            <div className="h-[95%] w-full flex px-3 laptop:px-16 pt-40 gap-10 relative ">
                <KeebType />
            </div>

            <div className="w-full h-[5%] p-1 flex justify-center items-end relative z-30">
                <KeebTypeFooter />
            </div>
        </div>
    );
}
