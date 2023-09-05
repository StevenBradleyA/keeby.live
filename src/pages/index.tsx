import CreatePost from "../components/Posts/Create";
import Post from "./posts";

export default function Home() {
    return (
        <>
            <h1 className="text-6xl text-white">Home Page</h1>
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <CreatePost />
                <Post />
            </div>
        </>
    );
}
