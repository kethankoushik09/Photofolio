import { useState } from "react";

function ImageItem(props){
    const {data,delete_image,edit_form} = props;
    // console.log(data.url);
    
    const [index,setIndex] = useState(null);
    return(
        <>
            <div className="image-item"
            onMouseOver={() =>{setIndex(1)}}
            onMouseLeave={() =>{setIndex(null)}}>
                <div className="image-icn" >
                    <img src ={`${data.temp_url}`} alt="img"  onerror="this.src='https://cdn-icons-png.flaticon.com/512/552/552871.png';"/>

                </div>
                {/* <h3>hiii</h3> */}
                <span>{data.title}</span>
                {/* <span>hiiiii</span> */}
                <div className={`tolls edit ${index ? `on_mood` : ""} `}  onClick={()=>edit_form(data)}><i className="fa-solid fa-pen-to-square"></i></div>
                <div className={`tolls delete ${index ? `on_mood` : ""} `} id="delete" onClick={() =>delete_image(data.id)}>
                    <i className="fa-solid fa-trash"></i>
                </div>
            </div>
        </>
    )
}
export default ImageItem;