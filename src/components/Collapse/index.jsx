import React, { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const iconClass = (isCollapse, size, isHide = false) =>
  `${isCollapse ? "" : "rotate-180"} ${size === "md" ? "text-3xl" : "text-xl"} ${isHide && "invisible"} duration-300 flex items-center justify-center`;

const TITLE_CONTAINER_PADDING = {
  md: "px-6 py-4",
  sm: "px-4 py-3"
};

export default function Collapse({
  title,
  children,
  bgWhite,
  value = true,
  className,
  position = "left",
  setValue,
  onDelete,
  disabled = false,
  description,
  contentClassName,
  subTitle,
  titleContainerClassName,
  size = "md",
  isChild = false,
  disableToggle = false,
  disableTitleClick = false,
  isHideIcon = false
}) {
  const [isCollapse, setIsCollapse] = useState(value);

  useEffect(() => {
    setIsCollapse(value);
  }, [value]);

  return (
    <div className={className}>
      <div
        className={`flex cursor-pointer items-center justify-between gap-2 leading-[26px] hover:bg-[var(--hover-background)] rounded-lg 
          ${TITLE_CONTAINER_PADDING[size]} 
          ${titleContainerClassName}
          ${disableToggle ? "cursor-default" : "cursor-pointer"}`}
        onClick={(e) => {
          if (disabled || disableToggle) {
            return;
          }
          setIsCollapse(!isCollapse);
          setValue && setValue(!isCollapse);
        }}
      >
        {position === "left" && (
          <div className={iconClass(isCollapse, size)}>
            <KeyboardArrowUpIcon />
          </div>
        )}
        <div
          className="flex-1 text-xl font-bold truncate"
          onClick={(e) => disableTitleClick && e.stopPropagation()}
        >
          {title}
        </div>
        {description && (
          <p className="w-fit truncate text-[14px]">{description}</p>
        )}
        {position === "right" && !disabled && (
          <div className={iconClass(isCollapse, size)}>
            <KeyboardArrowUpIcon />
          </div>
        )}
      </div>
      {!!subTitle && (
        <div className="flex-1 truncate px-6 pb-4 text-[18px] font-bold">
          {subTitle}
        </div>
      )}
      <div
        className={`
          grid
          transition-all
          duration-500
          ${isCollapse ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
      >
        {isCollapse ? (
          disabled ? null : (
            <div className="flex flex-col gap-6 overflow-hidden">
              <div className={`pb-6 ${contentClassName}`}>{children}</div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}
