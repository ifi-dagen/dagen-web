import React from "react";
import OverlayShell from "./OverlayShell";

type OverlayProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function AboutUsOverlay({ open, onClose, children }: OverlayProps) {
    return (
        <OverlayShell
        open={open}
        onClose={onClose}
        maxWidthClass="max-w-7xl"
        historyKey="__aboutUsOverlay"
        >
            {children}
        </OverlayShell>
    )
}