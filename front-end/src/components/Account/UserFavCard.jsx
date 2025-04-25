function UserFavCard({post}) {
    return ( 
        <>
        <div>~~post#{post.id}~~</div>
        <div>{post.title}</div>
        <div>~~~~~~~~~~~~~~~~</div>
        </>
    );
}

export default UserFavCard;