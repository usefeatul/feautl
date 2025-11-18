import React from "react";

type FeatherIconProps = React.SVGProps<SVGSVGElement> & { opacity?: number };

export function FeatherIcon({
  width = 18,
  height = 18,
  opacity = 0.4,
  ...rest
}: FeatherIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={width} height={height}
      {...rest}
    >
      <title>feather-filled</title>
      <g fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
        <path
          d="m10.125,11.167s3.167.688,5.214-.86c.706-.49,1.286-1.223,1.576-2.337.158-.692.258-1.359.354-2.004.148-.993.289-1.93.598-2.468.186-.323.176-.722-.024-1.036-.2-.313-.555-.489-.93-.458C3.722,3.158,2.022,16.75,2.007,16.887c-.062.549.331,1.044.88,1.107.038.004.077.006.114.006.502,0,.935-.376.992-.887.004-.037.151-1.192.682-2.802,1.634.375,3.085.574,4.34.574,1.731,0,3.113-.357,4.171-1.072.322-.217.6-.476.854-.757-3.002-.561-3.914-1.89-3.914-1.89Z"
          strokeWidth="0"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
}

export default FeatherIcon;
