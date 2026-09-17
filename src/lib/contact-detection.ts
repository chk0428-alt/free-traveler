export type ContactDetectionMatchType = "phone" | "email" | "messenger_id";

export type ContactDetectionMatch = {
  type: ContactDetectionMatchType;
  value: string;
};

export type ContactDetectionResult = {
  detected: boolean;
  matches: ContactDetectionMatch[];
};

const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// 한국 휴대전화(010-1234-5678 등)와 일반 유선/하이픈 없는 표기를 함께 잡는다.
const PHONE_PATTERN =
  /(?:\+?\d{1,3}[-.\s]?)?0?\d{1,2}[-.\s]?\d{3,4}[-.\s]?\d{4}\b/g;

const MESSENGER_KEYWORD_PATTERN =
  /(카카오\s*톡|카톡|kakao\s*talk|kakaotalk|텔레그램|telegram)\s*(?:id|아이디)?\s*[:：]?\s*([a-zA-Z0-9._-]{3,})/gi;

/**
 * 동행글/참가 요청 등 공개 텍스트에서 연락처를 탐지한다.
 * 클라이언트 폼과 Server Action(서버 우회 방지) 양쪽에서 동일하게 호출해야 한다.
 */
export function detectContactInfo(text: string): ContactDetectionResult {
  const matches: ContactDetectionMatch[] = [];

  if (!text) {
    return { detected: false, matches };
  }

  for (const match of text.matchAll(EMAIL_PATTERN)) {
    matches.push({ type: "email", value: match[0] });
  }

  for (const match of text.matchAll(PHONE_PATTERN)) {
    matches.push({ type: "phone", value: match[0].trim() });
  }

  for (const match of text.matchAll(MESSENGER_KEYWORD_PATTERN)) {
    matches.push({ type: "messenger_id", value: match[0].trim() });
  }

  return { detected: matches.length > 0, matches };
}

export function getContactDetectionErrorMessage(): string {
  return "전화번호·이메일·메신저 ID 등 개인 연락처는 입력할 수 없습니다. 내용을 수정해 주세요.";
}
