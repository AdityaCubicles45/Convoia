import { ChevronRightIcon } from "@heroicons/react/outline";
import { classNames } from "../../../helpers";
import { ShortCopySkeletonLoader } from "../Loaders/SkeletonLoaders/ShortCopySkeletonLoader";
import { IconSkeletonLoader } from "../Loaders/SkeletonLoaders/IconSkeletonLoader";
import type { InfoCardIcon } from "./iconMapping";
import { iconMapping } from "./iconMapping";

interface InfoCardProps {

  header: string;

  subtext?: string;

  leftIcon?: InfoCardIcon;

  isLoading?: boolean;

  onClick?: () => void;

  styles?: string;

  testId?: string;

  url?: string;
}

const getLeftIconBackground = (leftIcon?: InfoCardIcon) =>
  leftIcon ? iconMapping[leftIcon]?.backgroundColor : "";

const getLeftIcon = (leftIcon?: InfoCardIcon) =>
  leftIcon ? iconMapping[leftIcon]?.icon : "";

export const InfoCard = ({
  header,
  subtext,
  leftIcon,
  isLoading = false,
  onClick = undefined,
  styles,
  testId = "",
  url,
}: InfoCardProps) => (
  <div
    className={classNames(
      "w-full",
      "flex",
      "p-3",
      "flex",
      "items-center",
      "justify-between",
      "border-y",
      "border-gray-300",
      "cursor-pointer",
      styles || null,
    )}>
    {isLoading ? (
      <ShortCopySkeletonLoader lines={2} />
    ) : (
      <a
        href={url}
        target="blank"
        className="flex"
        onClick={onClick}
        data-testid={`${testId}-section-link`}>
        <div
          className={classNames(
            getLeftIconBackground(leftIcon),
            "p-2",
            "mr-4",
            "rounded-md",
            "h-fit",
          )}
          data-testid={`${testId}-icon`}>
          {getLeftIcon(leftIcon)}
        </div>
        <div className="flex flex-col">
          <div className="font-bold" data-testid={`${testId}-header`}>
            {header}
          </div>
          <p
            className="text-gray-500 text-md"
            data-testid={`${testId}-subheader`}>
            {subtext}
          </p>
        </div>
      </a>
    )}
    <div>
      {isLoading && onClick ? (
        <IconSkeletonLoader />
      ) : (
        (onClick || url) && (
          <ChevronRightIcon
            width="24"
            color="gray"
            className="ml-4"
            data-testid={`${testId}-arrow`}
          />
        )
      )}
    </div>
  </div>
);