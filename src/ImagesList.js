import { db } from "./firebaseinit";
import { useEffect, useState } from "react";
import ImageForm from "./ImageForm";
import ImageItem from "./ImageItem";
import { addDoc, collection, deleteDoc, doc,onSnapshot, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
function ImageList(props){
    const [images,setImages] =useState([]);
    const [editdata,SetEditdata] = useState(null);
    const {toggle_image,add_mood,toggle_page,albumdata} = props;
    useEffect(()=>{
        const docRef = onSnapshot(collection(db, "albums",albumdata.id,albumdata.name),(snap) =>{
            const bg = snap.docs.map((doc)=>{
                return{
                    id:doc.id,
                    ...doc.data()
                }
            })
            setImages(bg);

        })
        return () => docRef();
    },[albumdata.id, albumdata.name])
    
    async function update_image(title,url,temp_url){
        const docRef = doc(db,"albums",albumdata.id,albumdata.name,editdata.id);
        await updateDoc(docRef,{
            title,
            url,
            temp_url
        })
        SetEditdata(null);
        toast.success("image updated sucessfully");


    }
    async function add_image(title,url,temp_url){
        const docRef = await addDoc(collection(db, "albums",albumdata.id,albumdata.name),{
            title,
            url,
            temp_url
        })
        toast.success("image added sucessfully");

    }
    function delete_image(id){
        const docRef = doc(db,"albums",albumdata.id,albumdata.name,id);
        deleteDoc(docRef);
        toast.success("image deleted sucessfully");

    }
    function edit_form(data){
        console.log("hiii");
        console.log(data.id);
        
        
        if(!add_mood){
            toggle_image();
        }
        SetEditdata(data);
    }

    return(
        <>
            {add_mood && 
            <ImageForm 
            add_image = {add_image}
            editdata = {editdata}
            update_image = {update_image}
            />}
            <div className="Image-sec">
                <div className="Image-header">
                    <div className="backward-icon" onClick={toggle_page}>
                       <i class="fa-solid fa-rotate-left" ></i>
                    </div>
                    <div className="images-content">
                        {images.length == 0?"No images found in the album.":`Images in ${albumdata.name}`}
                    </div>
                </div>
                <div className="btn-area">
                    <button onClick={toggle_image} className={add_mood?"image-can":"image-add"}> {add_mood?"cancel":"Add Image"}</button>
                </div>

            </div>
            <div className="Images-section">
                {images.map((item,indx) => <ImageItem 
                edit_form = {edit_form}
                data = {item} key={indx} 
                delete_image = {delete_image}
                />)} 
                {/* <ImageItem/> */}

            </div>
        </>
    )
}
 
export default ImageList;