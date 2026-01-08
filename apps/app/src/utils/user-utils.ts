export interface DisplayUser {
  name: string
  email: string
  image: string
}

export interface User {
  name?: string
  email?: string
  image?: string | null
}

export function getDisplayUser(user: User | null | undefined): DisplayUser {
  if (!user) {
    return {
      name: "Guest",
      email: "",
      image: "",
    }
  }

  const fullName = (user.name || user.email?.split("@")[0] || "User").trim()

  return {
    name: fullName,
    email: user.email || "",
    image: user.image || "",
  }
}


export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

import { randomAvatarUrl } from "./avatar"

export function getPrivacySafeDisplayUser(
  user: User | null | undefined,
  hideIdentity: boolean = false
): DisplayUser {
  const displayUser = getDisplayUser(user)
  
  // If identity is hidden and user is not a Guest (Guest is already anonymous)
  if (hideIdentity && displayUser.name !== "Guest") {
    // Generate a stable anonymous identity
    // We use a prefix to ensure different visual seeds for different posts if needed,
    // but for "Member" anonymity, we might want a uniform look or random-per-session.
    // Here we'll just use a random seed based on the fact it's a member to get a nice bear.
    // Or we could use the user ID if we wanted stable-but-masked, but true anonymity suggests proper masking.
    // Let's use a consistent "member" seed or random per render? 
    // Random per render causes hydration mismatch.
    // Let's use a static seed "member" + some salt or just "member" to keep it simple and consistent.
    // Actually, user might want distinct bears for distinct users? "apibear" suggests fun.
    // For true hiding, all members looking the same is safer. 
    // But "apibear" implies maybe they want distinct ones? 
    // "hiden author profile image" -> singular.
    // Let's stick to a generic "Member" look: seed 'member' or similar.
    return {
      name: "Member",
      email: "",
      image: randomAvatarUrl("member", "avataaars")
    }
  }

  return displayUser
}
