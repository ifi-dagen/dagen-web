import React from "react";
import OverlayShell from "./OverlayShell";

type OverlayProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function BedriftOverlay({ open, onClose, children }: OverlayProps) {
    return (
        <OverlayShell
        open={open}
        onClose={onClose}
        maxWidthClass="max-w-[1107px]"
        historyKey="__bedriftOverlay"
        >
            {children}
        </OverlayShell>
    );
}