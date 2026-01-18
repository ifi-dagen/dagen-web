import React from "react";
import Image from "next/image";
import OverlayShell from "@/components/OverlayShell";

type StandkartOverlayProps = {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
  alt?: string;
};

export default function StandkartOverlay({
  open,
  onClose,
  imageSrc,
  alt = "Standkart",
}: StandkartOverlayProps) {
  return (
    <OverlayShell
      open={open}
      onClose={onClose}
      maxWidthClass="max-w-[1440px]"
      historyKey="__standkartOverlay"
    >
      <div className="bg-background">
        <Image
          src={imageSrc}
          alt={alt}
          width={1440}
          height={3000}
          priority
          className="block w-full h-auto"
        />
      </div>
    </OverlayShell>
  );
}
