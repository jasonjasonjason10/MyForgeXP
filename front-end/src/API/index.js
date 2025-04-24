export async function toggleFollow(userIdToFollow, token) {
    try {
      const response = await fetch(`http://localhost:3000/user/follow/${userIdToFollow}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Follow request failed with status " + response.status);
      }
  
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Follow error:", err);
      return { error: "Follow request failed" };
    }
  }
  
  