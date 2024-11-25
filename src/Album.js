import AlbumItem from "./AlbumItem";
function Album(props){
    const {toggle_add,add_mood,albums,toggle_page,select_album_id} = props;
    
    
    return(
        <>
        <div className="album-container">
            <div className="album-header">
                <h1>Your albums</h1>
                <div className="album-btn">
                    <button className={add_mood?"album-can":"album-add"} onClick={toggle_add}>
                        {add_mood?"cancel":"Add album"}
                    </button>
                </div>
            </div>
            <div className="album-section">
                {albums.map((item,idx)=> <AlbumItem data = {item} key= {idx} toggle_page = {toggle_page}
                select_album_id = {select_album_id}
                />)}
                {/* <AlbumItem/> */}
            </div>
        </div>
        
        
        </>
    )
}
export default Album;
