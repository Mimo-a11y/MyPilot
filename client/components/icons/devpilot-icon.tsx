
import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type LogoProps = SVGProps<SVGSVGElement> & {
  variant?: "color" | "mono";
};

export function MyPilotIcon({
  className,
  variant = "color",
  ...props
}: LogoProps) {
  const mono = variant === "mono";
  const foreground = mono ? "var(--background)" : "#FFFFFF";

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <rect
        width="64"
        height="64"
        rx="16"
        fill={mono ? "currentColor" : "#0F766E"}
      />

      {/* Abstract M / navigation path */}
      <path
        d="M15 43V22L26 33L37 22V43"
        stroke={foreground}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* AI connection node */}
      <path
        d="M37 22L47 14"
        stroke={foreground}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="49"
        cy="12"
        r="4"
        fill={foreground}
      />

      {/* Destination point */}
      <circle
        cx="37"
        cy="43"
        r="3"
        fill={foreground}
      />
    </svg>
  );
}

export function MyPilotLogo({
  className,
  variant = "color",
  ...props
}: LogoProps) {
  const mono = variant === "mono";

  return (
    <svg
      viewBox="0 0 240 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <MyPilotIcon
        x="0"
        y="0"
        width="64"
        height="64"
        variant={variant}
      />

      <text
        x="78"
        y="41"
        fill="currentColor"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        fontSize="29"
        fontWeight="700"
        letterSpacing="-1.2"
      >
        MyPilot
      </text>
    </svg>
  );
}
