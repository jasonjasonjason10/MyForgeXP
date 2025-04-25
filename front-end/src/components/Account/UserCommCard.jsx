function UserCommCard({comm}) {
    return ( 
        <>
            <div className="flex gap-6 items-start">
                <img
                    src={comm.coverImage}
                    alt={comm.gameName}
                    className="w-28 h-28 object-cover rounded-lg border border-cyan-300 shadow-inner"
                />

                <div className="flex-1">
                    <h4 className="text-2xl font-semibold text-cyan-200 mb-2 drop-shadow-[0_0_6px_#67e8f9]">
                    {comm.gameName}
                    </h4>
                    <p className="text-cyan-100 text-sm mb-3">
                    {comm.description || "No description available."}
                    </p>
                </div>
            </div>
        </>
    );
}

export default UserCommCard;