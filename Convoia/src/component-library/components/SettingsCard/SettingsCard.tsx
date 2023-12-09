import { classNames } from "../../../helpers";
import { ShortCopySkeletonLoader } from "../Loaders/SkeletonLoaders/ShortCopySkeletonLoader";
import { IconSkeletonLoader } from "../Loaders/SkeletonLoaders/IconSkeletonLoader";
import type { SettingsIcon } from "./iconMapping";
import { iconMapping } from "./iconMapping";

interface SettingsCardProps {
  variant?: "primary" | "secondary";
  header: string;
  leftIcon?: SettingsIcon;
  onToggle?: () => void | undefined;
  isLoading?: boolean;
}

const getLeftIconBackground = (leftIcon?: SettingsIcon) =>
  leftIcon ? iconMapping[leftIcon]?.backgroundColor : "";

const getLeftIcon = (leftIcon?: SettingsIcon) =>
  leftIcon ? iconMapping[leftIcon]?.icon : "";

export const SettingsCard = ({
  variant = "primary",
  header = "",
  leftIcon,
  onToggle = undefined,
  isLoading = false,
}: SettingsCardProps) => (
  <div
    className={classNames(
      "w-full",
      "bg-gray-50",
      "p-4",
      "flex",
      "justify-between",
      "items-center",
      variant === "secondary" ? "text-indigo-600" : "",
    )}>
    {isLoading ? (
      <ShortCopySkeletonLoader />
    ) : (
      <div className="flex align-center">
        <div
          className={classNames(
            leftIcon ? getLeftIconBackground(leftIcon) : "",
            "rounded-md",
            "p-1",
            "mr-4",
          )}>
          {leftIcon && getLeftIcon(leftIcon)}
        </div>
        <span className="font-bold flex items-center">{header}</span>
      </div>
    )}

    {isLoading && onToggle ? (
      <IconSkeletonLoader />
    ) : (
      onToggle && (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={onToggle}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500" />
        </label>
      )
    )}
  </div>
);