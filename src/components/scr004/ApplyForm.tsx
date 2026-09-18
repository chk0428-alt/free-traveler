"use client";

import { useState, useTransition } from "react";
import { createMateApplicationAction } from "@/app/mates/actions/mate-application";
import { showToast } from "@/components/ui/Toast";

const MAX_MESSAGE_LENGTH = 500;

export type ApplyFormProps = {
  postId: string;
};

export function ApplyForm({ postId }: ApplyFormProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await createMateApplicationAction(postId, message);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setMessage("");
      showToast("참가 요청을 보냈습니다.");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-sm">
      <label className="flex flex-col gap-xs text-body-sm text-body">
        참가 요청 메시지
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          maxLength={MAX_MESSAGE_LENGTH}
          rows={3}
          className="rounded-sm border border-hairline p-md text-body-md text-ink"
        />
      </label>
      <p className="text-body-sm text-muted">
        메시지는 500자 이내로 작성해 주세요. 이 메시지는 작성자와 본인만 볼 수
        있습니다.
      </p>
      {error ? <p className="text-body-sm text-danger">{error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="flex h-12 w-fit items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active disabled:opacity-60"
      >
        {isPending ? "전송 중..." : "참가 요청 보내기"}
      </button>
    </form>
  );
}
