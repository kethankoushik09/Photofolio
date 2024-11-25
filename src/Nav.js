function Nav(props){
    const { imagepage,toggle_page} = props;
    return(
        <>
            <div className="Nav-container" onClick={()=>{if(imagepage) toggle_page();}}>
                <i class="fa-regular fa-folder-open"></i>
                <h2>PhotoFolio</h2>
            </div>
        </>
    )
}

export default Nav;