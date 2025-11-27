export function randomAvatarUrl(seed?: string | null, style: 'identicon' | 'shapes' | 'initials' = 'identicon', size = 64) {
  const s = encodeURIComponent((seed || 'anonymous').trim() || 'anonymous')
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${s}&size=${size}&backgroundType=gradient&radius=50`
}
