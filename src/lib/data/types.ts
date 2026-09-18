/** docs/ARCHITECTURE.md 8절 6개 테이블의 Row 타입. 컬럼명은 마이그레이션과 1:1로 맞춘다. */

export type UserProfileStatus = "active" | "suspended" | "moderator" | "admin";

export type UserProfileRow = {
  user_id: string;
  nickname: string;
  is_adult: boolean;
  adult_verified_at: string | null;
  age_band: string | null;
  gender: string | null;
  travel_styles: string[];
  bio: string | null;
  status: UserProfileStatus;
  created_at: string;
  updated_at: string;
};

export type MatePostStoredStatus = "OPEN" | "CLOSED";

export type MatePostRow = {
  post_id: string;
  owner_id: string;
  country_id: string;
  region_id: string | null;
  start_date: string;
  end_date: string;
  capacity: number;
  preferences: string | null;
  travel_styles: string[];
  title: string;
  description: string;
  status: MatePostStoredStatus;
  created_at: string;
  updated_at: string;
};

export type MateApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type MateApplicationRow = {
  application_id: string;
  post_id: string;
  applicant_id: string;
  message: string;
  status: MateApplicationStatus;
  created_at: string;
  updated_at: string;
};

export type UserBlockRow = {
  blocker_id: string;
  blocked_id: string;
  created_at: string;
};

export type ReportTargetType =
  "mate_post" | "mate_application" | "user_profile";
export type ReportStatus = "OPEN" | "REVIEWING" | "RESOLVED" | "DISMISSED";

export type ReportRow = {
  report_id: string;
  reporter_id: string;
  target_type: ReportTargetType;
  target_id: string;
  reason_code: string;
  description: string | null;
  status: ReportStatus;
  assignee_id: string | null;
  created_at: string;
  resolved_at: string | null;
};

export type OutboundLinkSettingRow = {
  id: number;
  flight_url: string | null;
  hotel_url: string | null;
  updated_by: string | null;
  updated_at: string;
};
