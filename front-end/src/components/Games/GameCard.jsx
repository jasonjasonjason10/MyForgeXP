function GameCard({game}) {
    return ( 
        <>
        <div>
            {game.gameName}
        </div>
        <div>
            <img src={`http://localhost:3000${game.coverImage}`} alt="" />
        </div>
        <div>
            posts #
        </div>
        <h1>hi</h1>
        </>
    );
}

export default GameCard;