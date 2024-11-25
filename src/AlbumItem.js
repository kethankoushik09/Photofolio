function AlbumItem(props){
    const {data,toggle_page,select_album_id} = props
    function change(){
      toggle_page();
      console.log(data);
      select_album_id(data.id,data.name);
      
    }
    
    return(
        <>
          <div className="album-item" onClick={change}>
            <div className="album-image">
                <div className="image-icon">
                    <i className="fa-regular fa-image ss"></i>
                </div>

            </div>
            <h2>{data.name}</h2>
          </div>
          {/* <h1>hiii</h1> */}
          
        </>
    )
}
export default AlbumItem;