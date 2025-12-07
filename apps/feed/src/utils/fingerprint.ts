
function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export async function getBrowserFingerprint(): Promise<string> {
  if (typeof window === "undefined") return "";

  const COOKIE_NAME = "visitor_id";
  const existing = getCookie(COOKIE_NAME);
  if (existing) return existing;

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

  let fingerprint = "";

  // Use SHA-256 for a deterministic hash
  try {
    const msgBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    fingerprint = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback for non-secure contexts or older browsers (simple DJB2 variant)
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
    }
    fingerprint = (hash >>> 0).toString(16);
  }

  setCookie(COOKIE_NAME, fingerprint, 365);
  return fingerprint;
}
