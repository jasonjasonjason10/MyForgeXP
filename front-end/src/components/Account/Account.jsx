import { useState } from "react";

function Account() {
const [avatar, setAvatar] = useState();

async function avatarHandle(e) { 
  e.preventDefault();
  
}

    return (
      <div>
        <h1>My Account</h1>
        {/* Your account page content goes here */}

{/* ================avatar=handling=================== */}
      <div>
        <form onSubmit={avatarHandle} >
          <input type="file" accept="images/*" onChange={(e) => {e.target.files[0]}} className="border-solid border bg-amber-700"/>
          <button type="submit" className="border-solid border m-25">Submit</button>
        </form>
      </div>
{/* ====================DO NOT TOUCH================== */}
      </div>
    );
  }
  
  export default Account;
  