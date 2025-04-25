function UserPostCard({post}) {
    return ( 
    <>
        <div>---</div>
        <h1>POST # {post.id}</h1>
        <div>{post.title}</div>
        <div>---</div>
    </>
    );
}

export default UserPostCard;