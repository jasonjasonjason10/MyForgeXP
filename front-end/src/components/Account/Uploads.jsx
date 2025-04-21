import { useState } from "react"


function Uploads() {
    const [postImage, setPostImage] = useState();
    console.log("useState image =>", postImage)

    async function submitHandle(e) {
        e.preventDefault()
    if(!postImage){
        return console.log("no image =>", postImage)
    }
    const formData = new FormData();
    formData.append("postImage", postImage)
    try {
        const response = await fetch("http://localhost:3000/post/create", {
            method: "POST",
            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`},
            body: formData
        })
        console.log('it worked? => ', response)
    } catch (error) {
        console.log("OH NO!! => ", error)
    }
    }


    return ( 
        <>
            <form method="POST" onSubmit={submitHandle}  encType="multipart/from-data">
            <input type="file" accept="image/*" name="image" onChange={(e) => setPostImage(e.target.files[0])} />
            <input type="submit" />
        </form>
        </>
    );
}

export default Uploads;