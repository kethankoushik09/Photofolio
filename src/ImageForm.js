import { useEffect, useRef } from "react";
function ImageForm(props){
    const titleRef = useRef();
    const urlRef = useRef();
    const {toggle,add_image,editdata,update_image} = props;
    useEffect(()=>{
        if(editdata){
            console.log("in useEffect");
            titleRef.current.value = editdata.title
            urlRef.current.value = editdata.url
        }

    },[editdata])
    const defaultImage = "https://cdn-icons-png.flaticon.com/512/552/552871.png";
    // function isValidUrl(url) {
    //     try {
    //       new URL(url); // Will throw if URL is invalid
    //       return true;
    //     } catch (error) {
    //       return false;
    //     }
    // }
    // function isValidUrl(url) {
    //     try {
    //         // Attempt to create a new URL object; if invalid, it will throw an error
    //         const parsedUrl = new URL(url);
            
    //         // Ensure the protocol is one that browsers commonly accept for navigation
    //         const supportedProtocols = ['http:', 'https:', 'ftp:'];
    //         return supportedProtocols.includes(parsedUrl.protocol);
    //     } catch (error) {
    //         // If creating a URL object fails, it's not a valid URL
    //         return false;
    //     }
    // }
    function checkUrl(url) {
        return new Promise((resolve) => {
          const img = new Image();
      
          img.onload = function() {
            resolve(true);  // URL is working
          };
      
          img.onerror = function() {
            resolve(false);  // URL is not working
          };
      
          img.src = url;
        });
    }
    // function SubmitHandler(e){
    //     e.preventDefault();
    //     console.log("jp");
    //     var title = titleRef.current.value;
    //     var url = urlRef.current.value;
    //     var temp_url = urlRef.current.value;
    //     console.log(isValidUrl(url));
        

    //     if(!isValidUrl(url)){
    //         temp_url = defaultImage;
    //     }
    //     if(editdata){
    //         console.log("updated phase...");
    //         update_image(title,url,temp_url);
    //     }
    //     else{
    //         add_image(title,url,temp_url);
    //     }
    //     clearInput();
    // }
    async function SubmitHandler(e) {
        e.preventDefault(); // Prevent the form from reloading the page
        console.log("Form submission started");
    
        const title = titleRef.current.value;
        const url = urlRef.current.value;
        let temp_url = url;
    
        // Check if the URL is working
        const isWorking = await checkUrl(url);
    
        if (!isWorking) {
            console.log("URL is not working, using default image.");
            temp_url = defaultImage; // Use default image if URL is not working
        } else {
            console.log("URL is valid and working.");
        }
    
        // Check if we are in edit mode or add mode
        if (editdata) {
            console.log("Update phase...");
            update_image(title, url, temp_url); // Update image
        } else {
            add_image(title, url, temp_url); // Add new image
        }
    
        // Clear the input fields after submission
        clearInput();
    }
    
    function clearInput(){
        console.log("clearing................");
        
        titleRef.current.value="";
        urlRef.current.value = "";
    }

    return(
    <>
        <div className="Image-form">
            <span>Add image to this album</span><br/>
            <form onSubmit={SubmitHandler}>
                <input placeholder="Title"  ref={titleRef} required
                 onChange={(e) => titleRef.current.value = e.target.value}/><br/>
                <input placeholder="Image URL"  ref={urlRef}required
                 onChange={(e) => urlRef.current.value = e.target.value}
                />
                <div className="btns">
                    <button id="clear" type="button" onClick={clearInput}>clear</button>
                    <button id="create" type="submit">{editdata?"update":"Add"}</button>
                </div>
            </form>

        </div>

    </>
    )
}
export default ImageForm;