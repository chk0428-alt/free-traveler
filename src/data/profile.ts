export type ProfileMetric = {
  label: string;
  value: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export type VisitedCountryGroup = {
  region: string;
  countries: string[];
};

export type GalleryImage = {
  url: string;
  alt: string;
  source: string;
};

export type MemorableDestination = {
  /** destinations.ts의 Destination.id와 일치해야 한다. */
  destinationId: string;
  caption: string;
};

export type RepresentativeProfile = {
  name: string;
  tagline: string;
  heroImageUrl: string;
  heroImageAlt: string;
  metrics: ProfileMetric[];
  introParagraphs: string[];
  philosophy: string;
  timeline: TimelineEntry[];
  visitedCountries: VisitedCountryGroup[];
  gallery: GalleryImage[];
  memorableDestinations: MemorableDestination[];
  source: string;
  updatedAt: string;
};

/** SCR-001/SCR-002 전역에서 동일 값을 참조하기 위한 단일 소스(하드코딩 중복 금지). */
export const TOTAL_TRIPS_LABEL = "50+ Trips";
export const TOTAL_COUNTRIES_LABEL = "30+ Countries";

export const representativeProfile: RepresentativeProfile = {
  name: "free_traveler 대표",
  tagline:
    "여행 준비의 번거로움을 줄이고, 안전하게 함께 떠나는 여행을 만듭니다.",
  heroImageUrl:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Urban_backpacking.jpg/330px-Urban_backpacking.jpg",
  heroImageAlt: "배낭을 멘 여행자가 도심 골목을 걷는 모습",
  metrics: [
    { label: TOTAL_TRIPS_LABEL, value: "50+" },
    { label: TOTAL_COUNTRIES_LABEL, value: "30+" },
    { label: "10+ Years Traveling", value: "10+" },
  ],
  introParagraphs: [
    '10년 넘게 세계 곳곳을 다니며 느낀 가장 큰 어려움은 언제나 "정보는 넘치는데 정작 믿을 만한 정보는 찾기 어렵다"는 점이었습니다. free_traveler는 그 경험에서 출발해, 항공·숙소 조건을 정리해 외부 예약 사이트로 안전하게 연결하고, 신뢰할 수 있는 안전정보를 한곳에 모으는 여행 준비 허브를 만들자는 목표로 시작했습니다.',
    "여행지를 고를 때는 화려한 사진보다 실제로 그 장소를 걸어본 사람의 기록이 더 가치 있다고 믿습니다. 그래서 이 서비스의 모든 여행지 소개와 안전정보는 실제 경험과 공식 출처를 바탕으로 작성하고 주기적으로 갱신하는 것을 원칙으로 삼고 있습니다.",
    "혼자 떠나는 여행도 좋지만, 여행에서 만난 인연이 삶을 더 풍요롭게 한다는 것도 배웠습니다. 동행 구하기 기능은 안전을 최우선으로 하면서도 새로운 사람과 함께 여행하는 즐거움을 잃지 않도록 설계했습니다.",
  ],
  philosophy:
    "정보는 투명하게, 연결은 안전하게, 결정은 여행자 스스로 — free_traveler가 지키는 세 가지 원칙입니다.",
  timeline: [
    {
      year: "2015",
      title: "첫 배낭여행, 동남아시아 3개국",
      description:
        "태국·베트남·캄보디아를 두 달간 돌아본 첫 장기 배낭여행에서 여행 정보의 파편화 문제를 처음 체감했습니다.",
    },
    {
      year: "2017",
      title: "유럽 8개국 종단 여행",
      description:
        "기차 패스로 유럽을 종단하며 각국의 안전정보와 여행자 후기를 정리하는 개인 기록을 시작했습니다.",
    },
    {
      year: "2018",
      title: "동행 커뮤니티 첫 운영",
      description:
        "소규모 온라인 커뮤니티에서 동행 모집을 직접 운영하며 신뢰와 안전 장치의 중요성을 배웠습니다.",
    },
    {
      year: "2019",
      title: "남미 종단(6개월)",
      description:
        "페루·볼리비아·아르헨티나 등을 잇는 6개월 여정에서 현지 안전정보의 정확성이 여행의 성패를 가른다는 것을 다시 확인했습니다.",
    },
    {
      year: "2021",
      title: "아이슬란드·북유럽 자연 여행",
      description:
        "링로드를 렌터카로 일주하며 극한 기후 지역에서의 여행 준비 노하우를 축적했습니다.",
    },
    {
      year: "2023",
      title: "튀르키예·그리스 에게해 여행",
      description:
        "카파도키아 열기구 투어와 산토리니 섬 여행을 통해 계절별 여행 정보의 중요성을 다시 확인했습니다.",
    },
    {
      year: "2025",
      title: "free_traveler 서비스 기획",
      description:
        "10년간 쌓은 여행 기록과 안전정보를 바탕으로 free_traveler 서비스 기획을 시작했습니다.",
    },
  ],
  visitedCountries: [
    {
      region: "아시아",
      countries: [
        "대한민국",
        "일본",
        "태국",
        "베트남",
        "대만",
        "필리핀",
        "싱가포르",
        "말레이시아",
        "인도네시아",
        "캄보디아",
      ],
    },
    {
      region: "유럽",
      countries: [
        "프랑스",
        "이탈리아",
        "스페인",
        "영국",
        "독일",
        "그리스",
        "아이슬란드",
        "포르투갈",
        "네덜란드",
        "체코",
        "오스트리아",
        "스위스",
      ],
    },
    {
      region: "아메리카",
      countries: ["미국", "캐나다", "페루", "볼리비아", "아르헨티나", "멕시코"],
    },
    {
      region: "오세아니아·중동·아프리카",
      countries: [
        "호주",
        "뉴질랜드",
        "튀르키예",
        "아랍에미리트",
        "이집트",
        "모로코",
      ],
    },
  ],
  gallery: [
    {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Cappadocia_balloon_trip%2C_Ortahisar_Castle_%2811893715185%29.jpg/330px-Cappadocia_balloon_trip%2C_Ortahisar_Castle_%2811893715185%29.jpg",
      alt: "튀르키예 카파도키아 상공에 떠 있는 열기구 무리",
      source: "Wikimedia Commons",
    },
    {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Oia_sunset_-_panoramio_%282%29.jpg/330px-Oia_sunset_-_panoramio_%282%29.jpg",
      alt: "그리스 산토리니 이아 마을의 석양",
      source: "Wikimedia Commons",
    },
    {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/330px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg",
      alt: "노을 지는 하늘 아래 시드니 오페라하우스와 하버브리지",
      source: "Wikimedia Commons",
    },
    {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg/330px-Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg",
      alt: "관광객으로 붐비는 이탈리아 로마 트레비 분수",
      source: "Wikimedia Commons",
    },
    {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/330px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
      alt: "생자크탑에서 바라본 프랑스 파리 에펠탑",
      source: "Wikimedia Commons",
    },
    {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Reykjav%C3%ADk%2C_view_from_Hallgr%C3%ADmskirkja_%282%29.jpg/330px-Reykjav%C3%ADk%2C_view_from_Hallgr%C3%ADmskirkja_%282%29.jpg",
      alt: "할그림스키르캬 교회에서 내려다본 아이슬란드 레이캬비크",
      source: "Wikimedia Commons",
    },
    {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/0020-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%AB%E0%B9%8C%E0%B8%A7%E0%B8%A3%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg/330px-0020-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%AB%E0%B9%8C%E0%B8%A7%E0%B8%A3%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg",
      alt: "태국 치앙마이 왓 프라싱 사원의 황금빛 불탑",
      source: "Wikimedia Commons",
    },
    {
      url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Cebu_city_skyline_2025.jpg/330px-Cebu_city_skyline_2025.jpg",
      alt: "필리핀 세부 시티 도심과 해안이 함께 보이는 스카이라인",
      source: "Wikimedia Commons",
    },
  ],
  memorableDestinations: [
    {
      destinationId: "santorini",
      caption: "이아 마을 석양 앞에서 여행의 이유를 다시 떠올린 곳",
    },
    {
      destinationId: "cappadocia",
      caption: "새벽 열기구 위에서 본 풍경이 지금도 잊히지 않는 곳",
    },
    {
      destinationId: "vik",
      caption: "검은 모래 해변과 폭포가 만들어내는 압도적인 자연을 만난 곳",
    },
    {
      destinationId: "jeju",
      caption: "가장 자주 돌아가게 되는, 가장 가까운 위로의 여행지",
    },
  ],
  source:
    "free_traveler 대표 개인 여행 기록 및 방문 국가 아카이브(내부 정리 자료)",
  updatedAt: "2026-09-17",
};
