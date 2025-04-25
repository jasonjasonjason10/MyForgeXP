import { useEffect, useState } from "react"
import UserPostCard from "./UserPostCard"

function Uploads({user}) {
const [userPosts, setUserPosts] = useState()
    console.log('posts useState ==> ', userPosts)
    useEffect(() => {
        setUserPosts(user.posts)
    }, [])

    return ( 
        <>
        {userPosts ? 
        userPosts.map((post) => (
            <div key={post.id}>
                <UserPostCard post={post} />
            </div>
        )) :
        <div>no posts :(</div>   
    }
        </>
    );
}

export default Uploads;