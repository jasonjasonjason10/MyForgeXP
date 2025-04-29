import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SingleUserAdmin({user, isAdmin}) {
    const navigate = useNavigate()

    console.log('user id', user.username);
    

    const address = 'http://localhost:3000/'
    async function deleteHandle() {
        try {
            const response = await fetch(`${address}user/delete/${user.id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            const result = await response.json()
            console.log('result => ', result)
            if(response.ok) {
                navigate("/account")
            } else {
                console.log("error", response)
                
            }
        } catch (error) {
            console.log(error)
        }
        
    }


    return ( 
        
        <div>
            {/* { grab id of user and see if === to user array [2(deleted user)]} */}

            <div>
            {(isAdmin && (user.username !== 'Deleted User' && user.username !== "admin" )) && 
                <button onClick={deleteHandle} className=" bg-red-500">KILL THIS FUCKER!!!</button>
            }
            </div>
        </div>
     );
}

export default SingleUserAdmin;