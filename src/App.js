import Nav from "./Nav";
import AlbumForm from "./AlbumForm";
import Album from "./Album";
import { useState ,useEffect, useReducer} from "react";
import { db } from "./firebaseinit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, getDocs ,doc, onSnapshot } from "firebase/firestore";
import ImageList from "./ImagesList";



function albumReducer(state,action){
    switch(action.title){
      // case "Add":
      //   console.log(action.blog);
        
      //   return [action.blog,...state];
      case "Set":
        return {
          arr:action.data
        }
      default:
        return [];
    }

}

function App() {
  const [addingalbum,setAddingalbum] = useState(false);
  const [albums,dispatch] = useReducer(albumReducer,{arr : []});
  const [add_image,setAdd_image] = useState(false);
  const [imagepage,setImagepage] = useState(false);
  const [albumpage,setAlbumpage] = useState(true);
  const [albumdata,setAlbumdata] = useState({id:"",name:""});
  useEffect(()=>{
    // async function fetching(params) {      
      // const docREf =await  getDocs(collection(db,"albums"));
      // const bg = docREf.docs.map((doc)=>{
      //   return{
      //   id: doc.id,
      //   ...doc.data()
      //   }
      // })
      const docRef = onSnapshot(collection(db,"albums"),(snap)=>{
          const bg = snap.docs.map((doc)=>{
            return{
            id: doc.id,
            ...doc.data()
            }
          })
          // console.log(bg);
          
          dispatch({title:"Set",data:bg})
      })
    }
    // fetching();
    ,[])


  async function addAlbum(name){
    console.log("kethan");
    const albumRef = await addDoc(collection(db, "albums"), {
      name: name
    });

    const subCollectionRef = collection(db, "albums", albumRef.id, name); // "songs" as the sub-collection
    // await addDoc(subCollectionRef, {
    //   title: "Sample Song",
    //   artist: "Unknown Artist"
    // });
    // dispatch({title:"Add",blog:{id : albumRef.id ,name:name}})
    console.log(albums);
    toast.success("Album added sucessfully");
    
  }


  function toggle_album(){
    setAddingalbum(!addingalbum);
  }
  function toggle_image(){
    setAdd_image(!add_image);
  }
  function toggle_page(){
    setAlbumpage(!albumpage)
    setImagepage(!imagepage)
    setAlbumdata({id:"",name:""});
  }
  function select_album_id(id,name){
    // console.log(id);
    // console.log(name);
    setAlbumdata({id,name})
    console.log("selcet_ablem id");
  }


  
  return (
    <>
      <ToastContainer/>
      <Nav 
      imagepage = {imagepage}
      toggle_page = {toggle_page}
      />
      {imagepage &&
      <ImageList
        add_mood = {add_image}
        toggle_image = {toggle_image}
        toggle_page = {toggle_page}
        albumdata = {albumdata}
      />}

      {albumpage && <>{addingalbum &&
      <AlbumForm
      addAlbum = {addAlbum}
      />}
      <Album
       add_mood = {addingalbum}
      //  setAddingalbum = {setAddingalbum} 
      toggle_page = {toggle_page}
      toggle_add = {toggle_album}
      albums = {albums.arr}
      select_album_id = {select_album_id}
      /></>}
    </>
  );
}

export default App;
