export default function RemoveAccount({user, navigate}) {

    async function deleteself() {
        const response = await fetch(`http://localhost:3000/user/delete/${user.id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        const result = await response.json()
        
        if(result.error){
            console.log(result.error)
        } else {
            localStorage.removeItem('token')
            navigate("/")
        }
    }

    return ( <div onClick={deleteself} className=" bg-red-500">
        Commit Delete Self 
    </div> );
}
