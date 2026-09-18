"use client";

import { useState, useTransition } from "react";
import {
  signInAction,
  signUpAction,
  requestPasswordResetAction,
  verifyAdultAction,
} from "@/app/account/actions/profile";
import { showToast } from "@/components/ui/Toast";

type GuestTab = "signin" | "signup" | "reset";

const TABS: { id: GuestTab; label: string }[] = [
  { id: "signin", label: "로그인" },
  { id: "signup", label: "가입하기" },
  { id: "reset", label: "비밀번호 재설정" },
];

export type AuthPanelProps = {
  /**
   * "guest": 비로그인 상태(로그인/가입/재설정).
   * "verify-adult": 로그인은 했지만 성인확인이 아직 없는 상태.
   */
  mode: "guest" | "verify-adult";
};

function GuestForms() {
  const [tab, setTab] = useState<GuestTab>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      if (tab === "signin") {
        const result = await signInAction(email, password);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        showToast("로그인되었습니다.");
      } else if (tab === "signup") {
        const result = await signUpAction(email, password, nickname);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        showToast("가입 확인 메일을 보냈습니다. 메일함을 확인해 주세요.");
      } else {
        const result = await requestPasswordResetAction(email);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        showToast("비밀번호 재설정 메일을 보냈습니다.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-md">
      <div role="tablist" aria-label="계정 탭" className="flex gap-sm">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => {
              setTab(item.id);
              setError(null);
            }}
            className={
              tab === item.id
                ? "rounded-full bg-primary-tint px-lg py-sm text-btn font-semibold text-primary"
                : "rounded-full px-lg py-sm text-btn font-semibold text-muted"
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-sm">
        <label className="flex flex-col gap-xs text-body-sm text-body">
          이메일
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-14 rounded-sm border border-hairline px-md text-body-md text-ink"
          />
        </label>

        {tab !== "reset" ? (
          <label className="flex flex-col gap-xs text-body-sm text-body">
            비밀번호
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-14 rounded-sm border border-hairline px-md text-body-md text-ink"
            />
          </label>
        ) : null}

        {tab === "signup" ? (
          <label className="flex flex-col gap-xs text-body-sm text-body">
            닉네임
            <input
              required
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              className="h-14 rounded-sm border border-hairline px-md text-body-md text-ink"
            />
          </label>
        ) : null}

        {error ? <p className="text-body-sm text-danger">{error}</p> : null}

        <button
          type="submit"
          disabled={isPending}
          className="flex h-12 w-fit items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active disabled:opacity-60"
        >
          {tab === "signin"
            ? "로그인"
            : tab === "signup"
              ? "가입하기"
              : "재설정 메일 보내기"}
        </button>
      </form>
    </div>
  );
}

function VerifyAdultPrompt() {
  const [agreed, setAgreed] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleVerify() {
    if (!agreed) {
      return;
    }
    startTransition(async () => {
      const result = await verifyAdultAction();
      if (result.ok) {
        showToast("성인확인이 완료되었습니다.");
      } else {
        showToast(result.error);
      }
    });
  }

  return (
    <div className="flex flex-col gap-md rounded-md border border-hairline bg-canvas p-lg">
      <p className="text-body-md text-body">
        동행 구하기 등 일부 기능은 성인확인을 완료한 회원만 이용할 수 있습니다.
        정확한 생년월일은 저장하지 않으며, 확인 여부와 확인 시각만 기록됩니다.
      </p>
      <label className="flex items-center gap-sm text-body-sm text-body">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
        />
        만 19세 이상임을 확인합니다.
      </label>
      <button
        type="button"
        onClick={handleVerify}
        disabled={!agreed || isPending}
        className="flex h-12 w-fit items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active disabled:opacity-60"
      >
        성인확인 완료하기
      </button>
    </div>
  );
}

export function AuthPanel({ mode }: AuthPanelProps) {
  return (
    <section className="mx-auto flex w-full max-w-content-desktop-max flex-col gap-lg px-gutter-mobile py-section-mobile-min md:px-gutter-desktop md:py-section-desktop-min">
      <div>
        <h1 className="text-display-lg-mobile font-bold text-ink md:text-display-lg">
          계정
        </h1>
        <p className="mt-sm text-body-md text-body">
          {mode === "guest"
            ? "로그인하면 동행 모집글 작성, 참가 요청, 즐겨찾기 등을 이용할 수 있습니다."
            : "로그인이 완료되었습니다. 이제 성인확인만 하면 모든 기능을 이용할 수 있습니다."}
        </p>
      </div>

      {mode === "guest" ? <GuestForms /> : <VerifyAdultPrompt />}

      <div className="rounded-md bg-surface-soft p-lg">
        <p className="text-body-sm text-muted">
          비밀번호는 Supabase Auth가 안전하게 관리하며, free_traveler는 비밀번호
          원문을 저장하지 않습니다. 이메일 인증 링크는 가입·재설정 시 자동으로
          발송됩니다.
        </p>
      </div>
    </section>
  );
}
