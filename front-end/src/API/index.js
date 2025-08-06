// src/API/index.js
import { address } from "../../address";

export async function toggleFollow(targetUserId, token) {
  try {
    const response = await fetch(`${address}/user/follow/${targetUserId}`, {
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


  
  
  