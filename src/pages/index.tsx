import KeebType from "~/components/KeebType";
import CreatePost from "../components/Posts/Create";
import Post from "./posts";





export default function Home() {

// Todo going to need different components for different games 
// speed (word count changes)
// Quote (punctuation)
// paragraph type
// lets just start with paragraph type for now and try to get it working 

// for generate type we are going to need a first parent component that generates the sentence then passes it to another component that uses it. 



    return (
        <>
            <div className="w-full p-10">
                <KeebType />
            </div>
        </>
    );
}
