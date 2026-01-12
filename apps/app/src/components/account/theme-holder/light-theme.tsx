import React from "react";

export const LightMode = () => {
  return (
    <svg
      width="282"
      height="193"
      viewBox="0 0 282 193"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="282" height="193" rx="12" fill="#FFFFFF" />

      {/* Sidebar */}
      <rect width="66" height="193" fill="#FAFAFA" />

      {/* Logo */}
      <circle cx="14" cy="14" r="5" fill="#18181B" />
      <rect x="24" y="11" width="30" height="6" rx="2" fill="#18181B" />

      {/* Profile Card */}
      <rect x="8" y="28" width="50" height="18" rx="4" fill="#F4F4F5" />
      <rect x="12" y="32" width="10" height="10" rx="3" fill="#FB923C" /> {/* Avatar */}
      <rect x="26" y="33" width="24" height="3" rx="1.5" fill="#27272A" />
      <rect x="26" y="39" width="16" height="3" rx="1.5" fill="#A1A1AA" />

      {/* Time */}
      <rect x="8" y="52" width="50" height="10" rx="2" fill="#F4F4F5" />
      <rect x="32" y="55" width="22" height="4" rx="1" fill="#18181B" />

      {/* Request Header */}
      <rect x="8" y="68" width="20" height="3" rx="1.5" fill="#A1A1AA" />

      {/* Nav Items */}
      {/* Planned */}
      <g opacity="0.8">
        <circle cx="12" cy="78" r="3" fill="#F59E0B" />
        <rect x="19" y="76" width="24" height="4" rx="2" fill="#52525B" />
        <rect x="49" y="76" width="9" height="4" rx="1" fill="#E4E4E7" />
      </g>
      {/* Progress */}
      <g opacity="0.8">
        <circle cx="12" cy="88" r="3" fill="#3B82F6" />
        <rect x="19" y="86" width="26" height="4" rx="2" fill="#52525B" />
        <rect x="49" y="86" width="9" height="4" rx="1" fill="#E4E4E7" />
      </g>
      {/* Review */}
      <g opacity="0.8">
        <circle cx="12" cy="98" r="3" fill="#A855F7" />
        <rect x="19" y="96" width="22" height="4" rx="2" fill="#52525B" />
        <rect x="49" y="96" width="9" height="4" rx="1" fill="#E4E4E7" />
      </g>
      {/* Completed */}
      <g opacity="0.8">
        <circle cx="12" cy="108" r="3" fill="#22C55E" />
        <rect x="19" y="106" width="25" height="4" rx="2" fill="#52525B" />
        <rect x="49" y="106" width="9" height="4" rx="1" fill="#E4E4E7" />
      </g>
      {/* Pending */}
      <g opacity="0.8">
        <circle cx="12" cy="118" r="3" fill="#71717A" />
        <rect x="19" y="116" width="23" height="4" rx="2" fill="#52525B" />
        <rect x="49" y="116" width="9" height="4" rx="1" fill="#E4E4E7" />
      </g>
      {/* Closed */}
      <g opacity="0.8">
        <circle cx="12" cy="128" r="3" fill="#EF4444" />
        <rect x="19" y="126" width="20" height="4" rx="2" fill="#52525B" />
        <rect x="49" y="126" width="9" height="4" rx="1" fill="#E4E4E7" />
      </g>

      {/* Workspace Header */}
      <rect x="8" y="142" width="24" height="3" rx="1.5" fill="#A1A1AA" />

      {/* Workspace Items */}
      <rect x="12" y="152" width="6" height="6" rx="1" fill="#A1A1AA" />
      <rect x="24" y="153" width="28" height="4" rx="2" fill="#71717A" />

      <rect x="12" y="164" width="6" height="6" rx="1" fill="#A1A1AA" />
      <rect x="24" y="165" width="30" height="4" rx="2" fill="#71717A" />

      <rect x="12" y="176" width="6" height="6" rx="1" fill="#A1A1AA" />
      <rect x="24" y="177" width="26" height="4" rx="2" fill="#71717A" />


      {/* Main Content */}
      <text x="76" y="20" fontFamily="sans-serif" fontSize="10" fontWeight="600" fill="#18181B">Requests</text>

      {/* Top Right Actions */}
      <rect x="216" y="10" width="14" height="14" rx="3" fill="#F4F4F5" />
      <rect x="234" y="10" width="14" height="14" rx="3" fill="#F4F4F5" />
      <rect x="252" y="10" width="14" height="14" rx="3" fill="#F4F4F5" />

      {/* Divider */}
      <line x1="66" y1="0" x2="66" y2="193" stroke="#F4F4F5" />

      {/* List Rows */}
      {/* Item 1 */}
      <g transform="translate(76, 36)">
        <circle cx="8" cy="8" r="4" fill="#71717A" /> {/* Grey Icon */}
        <rect x="20" y="6" width="100" height="4" rx="2" fill="#27272A" />
        <rect x="156" y="6" width="18" height="4" rx="1" fill="#A1A1AA" /> {/* Date */}
        <circle cx="186" cy="8" r="4" fill="#E4E4E7" /> {/* Avatar */}
        <line x1="0" y1="18" x2="190" y2="18" stroke="#F4F4F5" />
      </g>

      {/* Item 2 */}
      <g transform="translate(76, 58)">
        <circle cx="8" cy="8" r="4" fill="#71717A" /> {/* Grey Icon */}
        <rect x="20" y="6" width="80" height="4" rx="2" fill="#27272A" />
        <rect x="156" y="6" width="18" height="4" rx="1" fill="#A1A1AA" />
        <circle cx="186" cy="8" r="4" fill="#E4E4E7" />
        <line x1="0" y1="18" x2="190" y2="18" stroke="#F4F4F5" />
      </g>

      {/* Item 3 */}
      <g transform="translate(76, 80)">
        <circle cx="8" cy="8" r="4" fill="#A855F7" /> {/* Purple Icon */}
        <rect x="20" y="6" width="90" height="4" rx="2" fill="#27272A" />
        <rect x="156" y="6" width="18" height="4" rx="1" fill="#A1A1AA" />
        <circle cx="186" cy="8" r="4" fill="#E4E4E7" />
        <line x1="0" y1="18" x2="190" y2="18" stroke="#F4F4F5" />
      </g>

      {/* Item 4 */}
      <g transform="translate(76, 102)">
        <circle cx="8" cy="8" r="4" fill="#3B82F6" /> {/* Blue Icon */}
        <rect x="20" y="6" width="110" height="4" rx="2" fill="#27272A" />
        <rect x="156" y="6" width="18" height="4" rx="1" fill="#A1A1AA" />
        <circle cx="186" cy="8" r="4" fill="#E4E4E7" />
        <line x1="0" y1="18" x2="190" y2="18" stroke="#F4F4F5" />
      </g>

      {/* Item 5 */}
      <g transform="translate(76, 124)">
        <circle cx="8" cy="8" r="4" fill="#22C55E" /> {/* Green Icon */}
        <rect x="20" y="6" width="95" height="4" rx="2" fill="#27272A" />
        <rect x="156" y="6" width="18" height="4" rx="1" fill="#A1A1AA" />
        <circle cx="186" cy="8" r="4" fill="#E4E4E7" />
        <line x1="0" y1="18" x2="190" y2="18" stroke="#F4F4F5" />
      </g>

      {/* Item 6 */}
      <g transform="translate(76, 146)">
        <circle cx="8" cy="8" r="4" fill="#71717A" /> {/* Grey Icon */}
        <rect x="20" y="6" width="70" height="4" rx="2" fill="#27272A" />
        <rect x="156" y="6" width="18" height="4" rx="1" fill="#A1A1AA" />
        <circle cx="186" cy="8" r="4" fill="#E4E4E7" />
        <line x1="0" y1="18" x2="190" y2="18" stroke="#F4F4F5" />
      </g>

      {/* Item 7 */}
      <g transform="translate(76, 168)">
        <circle cx="8" cy="8" r="4" fill="#A855F7" /> {/* Purple Icon */}
        <rect x="20" y="6" width="85" height="4" rx="2" fill="#27272A" />
        <rect x="156" y="6" width="18" height="4" rx="1" fill="#A1A1AA" />
        <circle cx="186" cy="8" r="4" fill="#E4E4E7" />
      </g>

    </svg>
  );
};