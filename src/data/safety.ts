export type SafetyScopeType = "country" | "region";

export type SafetySection = {
  content: string;
};

export type CountrySafetyInfo = {
  /** destinations.ts의 overseas country 값과 1:1로 일치해야 한다. */
  country: string;
  scopeType: SafetyScopeType;
  scopeText: string;
  security: SafetySection;
  fraud: SafetySection;
  regulations: SafetySection;
  transportation: SafetySection;
  disaster: SafetySection;
  health: SafetySection;
  culture: SafetySection;
  emergencyContacts: SafetySection;
  source: string;
  verifiedAt: string;
};

const SOURCE =
  "외교부 해외안전여행(0404travel.go.kr), 주재국 대사관·영사관 공지 종합";
const VERIFIED_AT = "2026-09-17";

export const countrySafetyInfo: CountrySafetyInfo[] = [
  {
    country: "일본",
    scopeType: "country",
    scopeText: "전역(특별 여행경보 없음, 상시 여행유의 수준)",
    security: {
      content:
        "전반적으로 치안이 매우 안정적이나 도쿄·오사카 번화가 심야 시간대 소매치기·취객 시비에 유의한다.",
    },
    fraud: {
      content:
        "관광객 대상 바가지 요금(호객형 술집)이 신주쿠 가부키초 등에서 보고되니 호객 행위를 따라가지 않는다.",
    },
    regulations: {
      content:
        "마약류는 소량 소지도 강력 처벌 대상이며, 처방약 성분 일부도 반입 금지 품목에 해당할 수 있어 사전 확인이 필요하다.",
    },
    transportation: {
      content:
        "대중교통이 정시성이 높고 안전하나 러시아워 혼잡이 극심하니 큰 캐리어는 이 시간대 이동을 피한다.",
    },
    disaster: {
      content:
        "지진·태풍 상시 대비 국가로, 숙소의 비상대피 경로를 미리 확인하고 기상청·JMA 긴급 경보 알림을 스마트폰에 설정해 둔다.",
    },
    health: {
      content:
        "여행자 의료보험 가입이 필수에 가까우며, 응급실 이용 시 현금 또는 해외 사용 가능 카드로 선결제가 필요한 경우가 많다.",
    },
    culture: {
      content:
        "실내 신발을 벗는 공간이 많고 대중교통·식당에서 정숙을 중시하므로 큰 소리로 통화하지 않는다.",
    },
    emergencyContacts: {
      content:
        "경찰 110, 구급·화재 119, 주일본 대한민국 대사관 영사콜센터 +82-2-3210-0404(24시간).",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
  {
    country: "태국",
    scopeType: "region",
    scopeText:
      "전역 여행유의, 남부 국경 3개주(얄라·빠따니·나라티왓)는 여행자제·철수권고",
    security: {
      content:
        "방콕·치앙마이 등 주요 관광지는 비교적 안전하나 남부 국경 지역은 분리주의 관련 폭력 사건으로 여행이 제한된다.",
    },
    fraud: {
      content:
        "보석·투어 바가지 사기(툭툭 기사의 유인)와 신용카드 복제 사기가 보고되니 낯선 사람의 저가 투어 권유에 응하지 않는다.",
    },
    regulations: {
      content:
        "왕실 모독은 중범죄로 처벌되며, 전자담배 반입·소지도 금지되어 있어 공항에서 압수·처벌될 수 있다.",
    },
    transportation: {
      content:
        "오토바이 택시·툭툭 사고가 잦으니 헬멧을 반드시 착용하고, 국제운전면허 없이 렌트 오토바이 운전은 삼간다.",
    },
    disaster: {
      content:
        "우기(6~10월)에는 갑작스러운 홍수·산사태 위험이 있어 기상 특보를 수시로 확인한다.",
    },
    health: {
      content:
        "뎅기열 등 모기 매개 질병 위험이 있어 방충제를 준비하고, 길거리 음식은 위생 상태를 확인 후 섭취한다.",
    },
    culture: {
      content:
        "불상·사원은 신성한 대상으로 여겨지므로 함부로 만지거나 그 위에 올라가는 행동은 강한 불쾌감을 유발한다.",
    },
    emergencyContacts: {
      content:
        "관광경찰 1155, 응급 1669, 주태국 대한민국 대사관 +66-2-481-6000.",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
  {
    country: "베트남",
    scopeType: "country",
    scopeText: "전역 여행유의",
    security: {
      content:
        "강력 범죄 발생률은 낮으나 관광지 소매치기, 오토바이를 이용한 날치기(가방·휴대폰 탈취)가 빈번하다.",
    },
    fraud: {
      content:
        "환전 사기·택시 미터기 조작이 보고되니 공식 택시 브랜드(마이린, 비나선 등)를 이용하고 환전은 은행·공식 환전소를 이용한다.",
    },
    regulations: {
      content:
        "마약류 처벌이 매우 엄격하며 사형까지 가능하고, 드론 사용은 사전 허가 없이는 금지되어 있다.",
    },
    transportation: {
      content:
        "오토바이 통행량이 많고 교통 신호 준수율이 낮아 도로 횡단 시 각별한 주의가 필요하다.",
    },
    disaster: {
      content:
        "중부·북부 지역은 여름~가을철 태풍·홍수 피해가 잦으니 여행 전 기상 상황을 확인한다.",
    },
    health: {
      content:
        "생수 이외의 수돗물 음용은 피하고, 노점 음식은 조리 상태를 확인한 뒤 섭취한다.",
    },
    culture: {
      content:
        "사원·사당 방문 시 노출이 적은 복장을 갖추고, 머리를 손으로 만지는 행동은 실례로 여겨진다.",
    },
    emergencyContacts: {
      content:
        "경찰 113, 구급 115, 주베트남 대한민국 대사관 +84-24-3831-5111~6.",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
  {
    country: "대만",
    scopeType: "country",
    scopeText: "전역 안전(특별 여행경보 없음)",
    security: {
      content:
        "치안이 매우 우수한 편으로 야간 이동도 비교적 안전하나 대도시 관광지 소매치기는 일반적인 주의가 필요하다.",
    },
    fraud: {
      content:
        "전화·문자를 이용한 보이스피싱형 사기가 외국인 대상으로도 발생하니 출처 불명 연락에 개인정보를 제공하지 않는다.",
    },
    regulations: {
      content:
        "마약류 소지·유통은 엄격히 처벌되며, 검역 규정상 육류·과일 등 일부 농축산물 반입이 금지된다.",
    },
    transportation: {
      content:
        "대중교통(MRT·고속철도)이 안전하고 정시성이 높아 렌터카 없이도 대부분 지역 이동이 가능하다.",
    },
    disaster: {
      content:
        "지진과 태풍(여름~가을)이 자주 발생하므로 숙소의 대피 안내와 국가재난문자 수신 설정을 확인한다.",
    },
    health: {
      content:
        "의료 서비스 수준이 높으나 여행자 보험 없이는 진료비가 고액일 수 있어 사전 가입을 권장한다.",
    },
    culture: {
      content:
        "사찰 방문 시 정숙을 유지하고, 향을 피우는 순서 등은 현지 안내판의 예절을 따른다.",
    },
    emergencyContacts: {
      content:
        "경찰 110, 구급 119, 주타이베이 대한민국 대표부 +886-2-2758-8320.",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
  {
    country: "필리핀",
    scopeType: "region",
    scopeText:
      "전역 여행유의, 민다나오 서부·술루 군도 등 일부 지역은 여행자제·철수권고",
    security: {
      content:
        "마닐라·세부 등 주요 관광지는 여행에 큰 무리가 없으나 빈곤 지역·야간 골목길 소매치기·강도 사건에 유의해야 한다.",
    },
    fraud: {
      content:
        "택시 미터기 조작, 환전소 사기가 보고되니 그랩(차량 호출 앱)과 은행 환전을 우선 이용한다.",
    },
    regulations: {
      content:
        "마약류 관련 처벌이 매우 엄격하며 총기·도검류 소지 규정도 까다로우니 주의한다.",
    },
    transportation: {
      content:
        "지프니·트라이시클 등 현지 교통수단은 안전 기준이 상이해 사고 위험이 있으므로 목적지와 요금을 사전에 명확히 한다.",
    },
    disaster: {
      content:
        "매년 여름~가을 태풍(타이푼) 경로에 자주 포함되므로 여행 시기의 기상 특보를 반드시 확인한다.",
    },
    health: {
      content:
        "뎅기열 등 열대성 질환 위험이 있어 방충 대책을 준비하고, 식수는 생수만 음용한다.",
    },
    culture: {
      content:
        "가톨릭 신자가 많아 종교 시설·행렬 예절을 존중하며, 성당 방문 시 단정한 복장을 갖춘다.",
    },
    emergencyContacts: {
      content: "경찰·구급 통합 911, 주필리핀 대한민국 대사관 +63-2-8856-9210.",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
  {
    country: "프랑스",
    scopeType: "country",
    scopeText: "전역 여행유의",
    security: {
      content:
        "파리 등 대도시 관광명소·대중교통에서 소매치기·집단 절도가 빈번하니 소지품을 항상 몸 앞쪽에 둔다.",
    },
    fraud: {
      content:
        "서명 요청 후 기부금 강요, 가짜 팔찌 씌우기 등 관광객 대상 소액 사기가 몽마르트·에펠탑 주변에서 발생한다.",
    },
    regulations: {
      content:
        "공공장소 흡연 제한 구역이 늘고 있으며, 대중교통 무임승차 적발 시 고액 벌금이 부과된다.",
    },
    transportation: {
      content:
        "지하철·기차 파업이 종종 발생하니 여행 전 운행 상황을 확인하고 대체 이동 수단을 염두에 둔다.",
    },
    disaster: {
      content:
        "대규모 자연재해 위험은 낮으나 폭염·한파 특보 발령 시 실내 활동 위주로 일정을 조정한다.",
    },
    health: {
      content:
        "의료 수준은 높으나 응급실 대기 시간이 길 수 있어 여행자 보험 가입 시 해외 의료 특약을 확인한다.",
    },
    culture: {
      content:
        "인사말 없이 용건부터 말하는 것은 무례하게 여겨지며, 식당에서는 종업원 안내 후 착석하는 것이 기본 예절이다.",
    },
    emergencyContacts: {
      content:
        "경찰 17, 구급 15, 소방 18, 주프랑스 대한민국 대사관 +33-1-4753-6996.",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
  {
    country: "이탈리아",
    scopeType: "country",
    scopeText: "전역 여행유의",
    security: {
      content:
        "로마·밀라노 등 주요 관광지 및 기차역 주변 소매치기가 매우 빈번해 가방은 몸 앞쪽으로 메는 것이 안전하다.",
    },
    fraud: {
      content:
        "장미꽃 강매, 가짜 서명 요청 등 관광객 대상 소액 사기가 흔하니 낯선 접근에 응하지 않는다.",
    },
    regulations: {
      content:
        "유적지 인근에서의 취식·음주는 벌금 대상이 될 수 있으며, 문화재 훼손 시 처벌이 엄격하다.",
    },
    transportation: {
      content:
        "기차·지하철 소매치기가 잦아 좌석 위 선반에 짐을 두기보다 무릎 위나 발밑에 두는 것이 안전하다.",
    },
    disaster: {
      content:
        "일부 지역에서 지진 위험이 있으므로 숙소 체크인 시 비상 대피 경로를 확인해 둔다.",
    },
    health: {
      content:
        "여름철 폭염이 심한 도시가 많아 충분한 수분 섭취와 실내 휴식 시간을 계획에 포함한다.",
    },
    culture: {
      content:
        "성당·종교 시설 방문 시 어깨와 무릎을 가리는 복장이 필수이며 미착용 시 입장이 거부될 수 있다.",
    },
    emergencyContacts: {
      content:
        "경찰·구급·소방 통합 112, 주이탈리아 대한민국 대사관 +39-06-802-461.",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
  {
    country: "스페인",
    scopeType: "country",
    scopeText: "전역 여행유의",
    security: {
      content:
        "바르셀로나 람블라스 거리·지하철 등에서 소매치기 신고가 매우 많아 혼잡한 관광지에서 특히 주의한다.",
    },
    fraud: {
      content:
        "축구 티켓 위조 판매, 환전 바가지 등이 보고되니 공식 판매처·은행을 통해서만 거래한다.",
    },
    regulations: {
      content:
        "일부 해변·공공장소는 음주 제한 구역으로 지정되어 있어 위반 시 벌금이 부과될 수 있다.",
    },
    transportation: {
      content:
        "대도시 대중교통은 안전한 편이나 심야 시간대 인적이 드문 골목 이동은 피한다.",
    },
    disaster: {
      content:
        "여름철 폭염 특보가 잦은 지역이 있어 한낮 야외 활동을 자제하고 그늘·실내 위주로 일정을 짠다.",
    },
    health: {
      content:
        "의료 수준은 우수하나 응급 의료비가 높을 수 있어 여행자 보험 가입이 권장된다.",
    },
    culture: {
      content:
        "점심·저녁 식사 시간이 늦은 편(오후 2시, 밤 9시 이후)이라 식당 운영 시간을 미리 확인한다.",
    },
    emergencyContacts: {
      content:
        "경찰·구급·소방 통합 112, 주스페인 대한민국 대사관 +34-91-353-2000.",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
  {
    country: "영국",
    scopeType: "country",
    scopeText: "전역 여행유의",
    security: {
      content:
        "런던 지하철·관광명소 소매치기와 최근 증가한 날치기 범죄에 유의하며, 휴대폰을 손에 들고 걷는 행동은 삼간다.",
    },
    fraud: {
      content:
        "가짜 자선 모금, 거리 도박(카드 맞히기) 등 관광객 대상 사기가 발생하니 참여하지 않는다.",
    },
    regulations: {
      content:
        "대중교통 무임승차·부정 승차 적발 시 고액 벌금이 부과되며, 공공장소 음주 제한 구역이 있다.",
    },
    transportation: {
      content:
        "차량이 좌측통행이므로 도로 횡단 시 차량 진행 방향을 다시 한번 확인하는 습관이 필요하다.",
    },
    disaster: {
      content:
        "대형 자연재해 위험은 낮으나 겨울철 폭풍·홍수 특보 발령 시 기차 운행이 지연될 수 있다.",
    },
    health: {
      content:
        "관광객은 국민보건서비스(NHS) 무상 진료 대상이 아니므로 여행자 보험 가입이 필수에 가깝다.",
    },
    culture: {
      content:
        "줄서기(큐잉) 문화를 매우 중시하며 새치기는 강한 불쾌감을 유발하는 무례한 행동으로 여겨진다.",
    },
    emergencyContacts: {
      content:
        "경찰·구급·소방 통합 999(비긴급 101), 주영국 대한민국 대사관 +44-20-7227-5500.",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
  {
    country: "독일",
    scopeType: "country",
    scopeText: "전역 여행유의",
    security: {
      content:
        "전반적으로 치안이 우수하나 대도시 중앙역·축제 기간 인파 밀집 지역의 소매치기에 유의한다.",
    },
    fraud: {
      content:
        "가짜 티켓 검표원 사기, 노상 카드 게임 사기가 보고되니 공식 유니폼·신분증을 확인하지 않은 인물의 요구에 응하지 않는다.",
    },
    regulations: {
      content:
        "나치 상징물 관련 표현·판매는 법으로 엄격히 금지되어 있으며, 일요일에는 대부분 상점이 휴무다.",
    },
    transportation: {
      content:
        "대중교통 승차권은 탑승 전 개찰(펀칭)이 필요한 노선이 많아 검표 시 무임승차로 오인되지 않도록 주의한다.",
    },
    disaster: {
      content:
        "대형 자연재해 위험은 낮으나 겨울철 폭설로 인한 항공·철도 지연 가능성을 감안해 일정에 여유를 둔다.",
    },
    health: {
      content:
        "의료 수준이 높은 편이나 진료비가 고액일 수 있어 여행자 보험에 반드시 가입한다.",
    },
    culture: {
      content:
        "약속 시간을 매우 중시하는 문화이므로 미팅·투어 집합 시간에 늦지 않도록 유의한다.",
    },
    emergencyContacts: {
      content:
        "경찰 110, 구급·소방 112, 주독일 대한민국 대사관 +49-30-260-650.",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
  {
    country: "미국",
    scopeType: "region",
    scopeText: "전역 여행유의, 대도시 일부 우범 지역은 야간 방문 자제 권고",
    security: {
      content:
        "뉴욕·LA 등 관광지 대부분은 안전하나 총기 관련 사건이 발생할 수 있어 우범 지역 정보를 사전에 확인한다.",
    },
    fraud: {
      content:
        "타임스퀘어 등에서 무료 CD·팔찌를 건넨 뒤 금전을 요구하는 사기가 있어 낯선 호객에 응하지 않는다.",
    },
    regulations: {
      content:
        "주(State)별로 법규가 달라 음주 가능 연령(21세), 대마초 합법 여부 등이 지역마다 다르므로 방문 전 확인한다.",
    },
    transportation: {
      content:
        "대중교통이 뉴욕 외 지역에서는 제한적이라 도시 간 이동은 렌터카·국내선 항공을 주로 이용한다.",
    },
    disaster: {
      content:
        "지역에 따라 허리케인(남동부, 여름~가을), 산불(서부, 건기)이 발생하니 여행 지역의 기상·재난 특보를 확인한다.",
    },
    health: {
      content:
        "의료비가 매우 높은 국가이므로 여행자 보험 미가입 시 응급실 진료만으로도 거액이 청구될 수 있다.",
    },
    culture: {
      content:
        "레스토랑·택시 이용 시 15~20% 팁이 관례이며, 팁을 지불하지 않으면 무례하게 받아들여질 수 있다.",
    },
    emergencyContacts: {
      content:
        "경찰·구급·소방 통합 911, 주미국 대한민국 대사관 +1-202-939-5600.",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
  {
    country: "호주",
    scopeType: "country",
    scopeText: "전역 안전(특별 여행경보 없음)",
    security: {
      content:
        "치안이 매우 우수한 편이나 대도시 유흥가 심야 시간대 취객 관련 시비에는 일반적인 주의가 필요하다.",
    },
    fraud: {
      content:
        "휴가지 렌탈 사기, 투어 예약 사기가 온라인에서 보고되니 공식 예약 플랫폼을 이용한다.",
    },
    regulations: {
      content:
        "동식물 검역이 매우 엄격해 과일·목재 제품 등의 반입이 제한되며 위반 시 고액 벌금이 부과된다.",
    },
    transportation: {
      content:
        "차량이 좌측통행이며 도심 외 지역은 이동 거리가 길어 장거리 운전 시 충분한 휴식이 필요하다.",
    },
    disaster: {
      content:
        "여름철(12~2월) 산불·폭염 위험이 높은 지역이 있어 국립공원 방문 전 화재 경보 단계를 확인한다.",
    },
    health: {
      content:
        "자외선이 매우 강해 자외선 차단제와 모자를 충분히 준비하고 수시로 덧바른다.",
    },
    culture: {
      content:
        "해변에서는 안전 요원이 지정한 깃발 구역 안에서만 수영하는 규정을 반드시 지킨다.",
    },
    emergencyContacts: {
      content:
        "경찰·구급·소방 통합 000, 주호주 대한민국 대사관 +61-2-6270-4100.",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
  {
    country: "튀르키예",
    scopeType: "region",
    scopeText:
      "이스탄불·카파도키아 등 주요 관광지는 여행유의, 시리아·이라크 국경 인접 동남부 지역은 여행자제·철수권고",
    security: {
      content:
        "이스탄불·카파도키아 등 주요 관광지는 비교적 안전하나 시리아 접경 동남부 지역은 테러·분쟁 위험으로 여행이 제한된다.",
    },
    fraud: {
      content:
        "환율 계산 사기, 카펫 강매가 그랜드 바자르 등에서 보고되니 가격은 반드시 사전에 확인하고 흥정한다.",
    },
    regulations: {
      content:
        "정부·국가 상징에 대한 모독은 처벌 대상이 될 수 있어 정치적 발언·행동에 유의한다.",
    },
    transportation: {
      content:
        "장거리는 국내선 항공이나 버스를 이용하는 것이 일반적이며, 야간 버스 이동 시 소지품 관리에 유의한다.",
    },
    disaster: {
      content:
        "지진 활동이 활발한 지역이므로 숙소의 비상 대피 경로를 확인해 둔다.",
    },
    health: {
      content: "여행자 보험 가입을 권장하며, 수돗물보다 생수 음용을 권장한다.",
    },
    culture: {
      content:
        "모스크 방문 시 신발을 벗고 여성은 머리를 가려야 하며, 라마단 기간 주간 공공장소 음식 섭취는 삼간다.",
    },
    emergencyContacts: {
      content:
        "경찰 155, 구급 112, 주튀르키예 대한민국 대사관 +90-312-468-4823.",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
  {
    country: "그리스",
    scopeType: "country",
    scopeText: "전역 여행유의",
    security: {
      content:
        "아테네·산토리니 등 관광지는 안전한 편이나 대규모 시위·파업 기간에는 도심 이동이 제한될 수 있다.",
    },
    fraud: {
      content:
        "택시 요금 바가지, 식당 계산서 조작 사례가 보고되니 영수증을 반드시 확인한다.",
    },
    regulations: {
      content:
        "고대 유적지의 돌·조형물 훼손이나 무단 반출은 중대 범죄로 처벌된다.",
    },
    transportation: {
      content:
        "섬 간 이동은 페리에 의존하는 경우가 많아 기상 악화 시 결항될 수 있음을 감안해 일정을 짠다.",
    },
    disaster: {
      content:
        "여름철 산불 위험이 높은 지역이 있어 국립공원·산간 지역 방문 전 화재 경보를 확인한다.",
    },
    health: {
      content: "여름철 폭염이 심해 충분한 수분 섭취와 그늘 휴식이 필요하다.",
    },
    culture: {
      content:
        "유적지는 여름철 낮 시간대(12~15시) 운영이 제한될 수 있어 이른 아침 방문을 권장한다.",
    },
    emergencyContacts: {
      content: "경찰 100, 구급 166, 주그리스 대한민국 대사관 +30-210-698-4080.",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
  {
    country: "아이슬란드",
    scopeType: "country",
    scopeText: "전역 안전(특별 여행경보 없음, 자연재해 상시 유의)",
    security: {
      content:
        "세계적으로 치안이 가장 우수한 국가 중 하나로 강력 범죄 발생률이 매우 낮다.",
    },
    fraud: {
      content:
        "렌터카 보험 관련 소액 사기보다는 자연 조건에 대한 준비 부족이 더 큰 위험이므로 업체 안내를 꼼꼼히 확인한다.",
    },
    regulations: {
      content:
        "도로 밖 오프로드 주행은 자연 훼손을 이유로 엄격히 금지되며 위반 시 고액 벌금이 부과된다.",
    },
    transportation: {
      content:
        "겨울철 링로드는 결빙·폭설로 통제되는 구간이 있어 출발 전 도로 상황판(road.is)을 반드시 확인한다.",
    },
    disaster: {
      content:
        "화산·지진 활동이 활발한 지역으로, 화산 경보 발령 시 안전 당국의 통제 구역 안내를 따른다.",
    },
    health: {
      content:
        "의료 인프라는 우수하나 비용이 높은 편이라 여행자 보험 가입을 권장한다.",
    },
    culture: {
      content:
        "온천·수영장 이용 전 반드시 비누로 전신 샤워를 하는 것이 현지 규정이자 예절이다.",
    },
    emergencyContacts: {
      content:
        "경찰·구급·소방 통합 112, 주덴마크 대한민국 대사관 겸임관할 +45-3946-0400.",
    },
    source: SOURCE,
    verifiedAt: VERIFIED_AT,
  },
];
