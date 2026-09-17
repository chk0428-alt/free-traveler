"use client";

import { useEffect, useState } from "react";

type ToastMessage = {
  id: number;
  message: string;
};

type ToastListener = (toasts: ToastMessage[]) => void;

const TOAST_DURATION_MS = 3000;

let nextToastId = 0;
let currentToasts: ToastMessage[] = [];
const listeners = new Set<ToastListener>();

function notifyListeners(): void {
  for (const listener of listeners) {
    listener(currentToasts);
  }
}

/** 화면 어디서든 Toast를 띄운다(참가 요청 접수, 저장 완료 등 상태 변경 확인용). */
export function showToast(message: string): void {
  const id = ++nextToastId;
  currentToasts = [...currentToasts, { id, message }];
  notifyListeners();

  setTimeout(() => {
    currentToasts = currentToasts.filter((toast) => toast.id !== id);
    notifyListeners();
  }, TOAST_DURATION_MS);
}

/** 트리 어딘가에 한 번 마운트하면 이후 `showToast` 호출을 전부 렌더한다. */
export function ToastViewport() {
  const [toasts, setToasts] = useState<ToastMessage[]>(currentToasts);

  useEffect(() => {
    listeners.add(setToasts);
    return () => {
      listeners.delete(setToasts);
    };
  }, []);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-gutter-mobile bottom-gutter-mobile z-50 flex flex-col gap-sm md:right-lg md:bottom-lg"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-sm bg-ink px-lg py-md text-body-sm text-on-primary shadow-raised"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
