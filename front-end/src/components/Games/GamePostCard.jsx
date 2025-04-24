function GamePostCard({post}) {

    return ( 
        <>
            <h1>{post.title}</h1>
            <div>{post.content}</div>
            <div>{post.description}</div>
            <div>{post.createdAt}</div>
            <div>{post.userId}</div>
            <div>
                <h2>LIKE BUTTON</h2>
                <div></div>
            </div>
        </>
    );
}

export default GamePostCard;