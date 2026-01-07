import React from 'react'

interface FileExportIconProps {
  className?: string
  size?: number
}

export const FileExportIcon: React.FC<FileExportIconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      className={className}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
    >
      <path
        d="m6.75,4.25h3.5c0-.321-.127-.627-.353-.853l-2.295-2.295c-.226-.226-.532-.353-.851-.353v3.5Z"
        fill="currentColor"
        strokeWidth="0"
      />
      <polyline
        points="6.75 .75 6.75 4.25 10.25 4.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="m7.603,1.103l2.294,2.294c.226.226.353.532.353.852v5.001c0,1.105-.895,2-2,2H3.75c-1.105,0-2-.895-2-2V2.75C1.75,1.645,2.645.75,3.75.75h3.001c.32,0,.626.127.852.353Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default FileExportIcon
