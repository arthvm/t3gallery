"use client";

import { type ComponentRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ComponentRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="h-screen w-screen bg-zinc-900/50 text-white"
      onClose={onDismiss}
    >
      {children}
    </dialog>,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    document.getElementById("modal-root")!,
  );
}
