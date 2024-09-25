"use client";
import React, { Fragment, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  //DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Logo from "../logo";

interface PropsType {
  isOpen: boolean;
  title: string;
  subTitle?: string;
  showLogo?: boolean;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  onSubmit?: () => void;
}

const Modal: React.FC<PropsType> = ({
  children,
  title,
  subTitle,
  showLogo = true,
  isOpen,
  onClose,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    onClose?.();
  }, [disabled, onClose]);

  return (
    <Fragment>
      <div>{children}</div>

      <Dialog modal open={isOpen} onOpenChange={handleClose}>
        {/* <DialogTrigger asChild>{children}</DialogTrigger> */}
        <DialogContent className="min-h-[350px] max-h-[600px] !max-w-[600px] pt-5 pb-10 !rounded-2xl overflow-y-auto">
          <div className="dialog_top_header w-full">
            {showLogo && (
              <div className="logo_section w-full h-[53px] flex items-center justify-center">
                <Logo width="40px" height="40px" />
              </div>
            )}{" "}
            <div className="pt-5 pb-0 px-5">
              <h1 className="leading-9 font-bold text-[31px]">{title}</h1>
              {subTitle && (
                <p className="text-[14px] text-muted-foreground">{subTitle}</p>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col px-5 items-center justify-start">
            {body}
          </div>

          {footer && (
            <DialogFooter>
              <Button variant="brandPrimary" disabled={disabled}>
                {actionLabel}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Modal;
