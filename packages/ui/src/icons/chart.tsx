import * as React from "react";

export type IconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

export function ChartIcon({
  title = "chart-bar-trend-up",
  ...props
}: IconProps) {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   width={props.width ?? 18}
    //   height={props.height ?? 18}
    //   viewBox="0 0 18 18"
    //   aria-hidden={title ? undefined : true}
    //   role={title ? "img" : "presentation"}
    //   {...props}
    // >
    //   {title ? <title>{title}</title> : null}
    //   <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
    //     <rect x={13.25} y={2.75} width={2.5} height={12.5} rx={1} ry={1} />
    //     <rect x={7.75} y={7.75} width={2.5} height={7.5} rx={1} ry={1} />
    //     <rect x={2.25} y={11.75} width={2.5} height={3.5} rx={1} ry={1} />
    //     <polyline points="6.25 2.75 8.75 2.75 8.75 5.25" />
    //     <line x1={8.5} y1={3} x2={2.75} y2={8.75} />
    //   </g>
    // </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 18}
      height={props.height ?? 18}
      viewBox="0 0 18 18"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      {...props}
    >
      <title>chart-bar-trend-up</title>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <rect
          x="12.5"
          y="2"
          width="4"
          height="14"
          rx="1.75"
          ry="1.75"
          fill="currentColor"
        ></rect>
        <rect
          x="7"
          y="7"
          width="4"
          height="9"
          rx="1.75"
          ry="1.75"
          fill="currentColor"
        ></rect>
        <rect
          x="1.5"
          y="11"
          width="4"
          height="5"
          rx="1.75"
          ry="1.75"
          fill="currentColor"
        ></rect>
        <path
          d="M2.75,9.5c.192,0,.384-.073,.53-.22l4.72-4.72v.689c0,.414,.336,.75,.75,.75s.75-.336,.75-.75V2.75c0-.414-.336-.75-.75-.75h-2.5c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h.689L2.22,8.22c-.293,.293-.293,.768,0,1.061,.146,.146,.338,.22,.53,.22Z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
}

export default ChartIcon;
