import type React from "react";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import { ButtonLoader } from "../Loaders/ButtonLoader";
import { classNames } from "../../../helpers";

interface GhostButtonProps {

  label: React.ReactNode;

  variant?: "primary" | "secondary";

  size?: "small" | "large";

  isLoading?: boolean;

  isDisabled?: boolean;

  onClick?: () => void;

  srText?: string;

  icon?: React.ReactNode;

  testId?: string;
}

const colorClassMapping = {
  primary: {
    backgroundColor: "white",
    fontColor:
      "text-indigo-600 hover:text-indigo-800 focus:outline-none focus-visible:ring focus-visible:ring-indigo-800",
  },
  secondary: {
    backgroundColor: "white",
    fontColor:
      "text-red-600 hover:text-red-800 focus:outline-none focus-visible:ring focus-visible:ring-red-800",
  },
};

const sizeClassMapping = {
  large: "text-lg p-0",
  small: "text-sm p-0",
};

/**
 * Ghost button component that includes text
 */

export const GhostButton = ({
  label,
  variant = "primary",
  isLoading = false,
  isDisabled = false,
  size = "large",
  srText = "",
  onClick,
  icon = <ArrowCircleRightIcon width={size === "large" ? 24 : 16} />,
  testId,
}: GhostButtonProps) => {
  const disabled = isDisabled ? "opacity-50 cursor-not-allowed" : "";
  const sizeClass = sizeClassMapping[size];

  const { backgroundColor, fontColor } =
    variant === "primary"
      ? colorClassMapping.primary
      : colorClassMapping.secondary;

  const minWidth = size === "large" ? 25 : 20;

  return (
    <button
      data-testid={testId}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={classNames(
        backgroundColor,
        fontColor,
        disabled,
        sizeClass,
        `min-w-[${minWidth}%]`,
        "h-fit",
        "font-bold",
        "rounded-full",
        "m-1",
        "p-1",
      )}
      aria-label={srText}>
      <div className="flex justify-center items-center h-fit space-x-2">
        <div>{label}</div>
        {isLoading ? <ButtonLoader color="primary" size={size} /> : icon}
      </div>
    </button>
  );
};