import { useRef } from "react";

function AlbumForm(props){
    const {addAlbum} = props
    const nameRef = useRef("");
    function clearInput(){
        nameRef.current.value = "";
    }
    function SubmitHandler(e){
        e.preventDefault();
        addAlbum(nameRef.current.value);
        clearInput();
    }
    return(
        <>
            <div className="album-form">
                <h1>create an album</h1>
                <form onSubmit={SubmitHandler}>
                    <input placeholder="Album Name" className="album-input"  ref={nameRef} required/>
                    <button id= "clear" type="button" onClick={clearInput}>Clear</button>
                    <button id= "create" type="submit">create</button>
                </form>

            </div>
        </>
    )
}
export default AlbumForm;