export async function toggleFollow(targetUserId, token) {
    try {
      const response = await fetch(`https://forgexp-server.onrender.com/user/follow/${targetUserId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Follow request failed with status ${response.status}`);
      }
  
      return await response.json();
    } catch (err) {
      console.error("Follow error:", err);
      throw err;
    }
  }
  
  
  