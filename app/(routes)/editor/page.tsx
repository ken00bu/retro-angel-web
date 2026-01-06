import Editor from "./Editor"
import NoSSRWrapper from "./NoSSRWrapper"


export default function page(){
    
    return (
        <NoSSRWrapper>
            <Editor/>
        </NoSSRWrapper>
    )
}