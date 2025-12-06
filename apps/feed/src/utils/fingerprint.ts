export async function getBrowserFingerprint(): Promise<string> {
  if (typeof window === "undefined") return "";

  const components = [
    navigator.userAgent,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen.width,
    screen.height,
    screen.colorDepth,
    navigator.hardwareConcurrency,
    (navigator as any).deviceMemory,
  ].map(c => String(c ?? ""));

  const str = components.join("|");

  // Use SHA-256 for a deterministic hash
  try {
    const msgBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback for non-secure contexts or older browsers (simple DJB2 variant)
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
    }
    return (hash >>> 0).toString(16);
  }
}
