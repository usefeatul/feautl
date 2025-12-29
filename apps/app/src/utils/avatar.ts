export function randomAvatarUrl(seed?: string | null, style: 'avataaars' | 'identicon' = 'avataaars') {
  const s = encodeURIComponent((seed || 'anonymous').trim() || 'anonymous')
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${s}`
}
