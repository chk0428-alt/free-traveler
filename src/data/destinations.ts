export type DestinationRegion = "domestic" | "overseas";

export type ThreeDayItineraryEntry = {
  day: number;
  summary: string;
};

export type Destination = {
  id: string;
  name: string;
  country: string;
  region: DestinationRegion;
  themes: string[];
  heroImageUrl: string;
  heroImageAlt: string;
  intro: string;
  attractions: string[];
  itineraryOneDay: string[];
  itineraryThreeDay: ThreeDayItineraryEntry[];
  budget: string;
  transportation: string;
  food: string[];
  etiquette: string[];
  source: string;
  updatedAt: string;
};

const SOURCE_DOMESTIC =
  "한국관광공사 대한민국 구석구석, 각 지자체 관광 공식 홈페이지 종합";
const SOURCE_OVERSEAS =
  "외교부 해외안전여행(0404travel.go.kr), 현지 관광청 공식 자료 종합";
const UPDATED_AT = "2026-09-17";

export const destinations: Destination[] = [
  // ── 국내 10곳 ──────────────────────────────────────────────
  {
    id: "seoul",
    name: "서울",
    country: "대한민국",
    region: "domestic",
    themes: ["역사", "쇼핑", "미식", "도심"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/%EC%A4%91%ED%99%94%EC%A0%84%EC%9D%98_%EB%82%AE.jpg/330px-%EC%A4%91%ED%99%94%EC%A0%84%EC%9D%98_%EB%82%AE.jpg",
    heroImageAlt: "덕수궁 중화전의 낮 풍경, 전통 목조 건축과 넓은 마당",
    intro:
      "서울은 600년 조선왕조의 궁궐과 21세기 마천루가 한 블록 안에 공존하는 대한민국의 수도다. 경복궁·창덕궁 같은 고궁에서 전통을, 강남·홍대에서 최신 트렌드를 동시에 경험할 수 있어 첫 해외·국내 여행지로도 무난하다. 사계절이 뚜렷해 봄 벚꽃과 가을 단풍 시즌에 특히 붐비며, 지하철망이 촘촘해 대중교통만으로 대부분의 명소를 돌아볼 수 있다. 야간에는 한강공원과 남산타워 야경이 대표적인 볼거리다. 인사동·익선동 골목에서는 전통 찻집과 소규모 갤러리가 어우러진 산책을 즐길 수 있고, 관광안내소와 다국어 표지판이 잘 갖춰져 있어 초행자도 길을 헤매지 않는다.",
    attractions: ["경복궁", "북촌한옥마을", "명동", "남산서울타워", "한강공원"],
    itineraryOneDay: [
      "오전 경복궁·북촌한옥마을 도보 관람",
      "점심 인사동 전통 음식점",
      "오후 명동 쇼핑",
      "저녁 남산서울타워 야경",
    ],
    itineraryThreeDay: [
      {
        day: 1,
        summary: "고궁·전통 골목(경복궁, 북촌, 인사동) 중심 도보 코스",
      },
      { day: 2, summary: "홍대·이태원·강남 등 최신 트렌드 지역과 한강 야경" },
      { day: 3, summary: "근교 당일치기(북한산 또는 DMZ 투어) 후 명동 쇼핑" },
    ],
    budget: "1인 1일 평균 9~14만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "인천/김포공항에서 공항철도·리무진버스로 시내 진입, 이후 지하철·버스 단일 교통카드로 이동",
    food: ["삼계탕", "떡볶이", "한우 구이"],
    etiquette: [
      "식당·카페에서 팁 문화가 없다(강요하지 않는다)",
      "지하철 임산부 배려석은 비워 둔다",
      "실내 다수 시설이 금연 구역이다",
    ],
    source: SOURCE_DOMESTIC,
    updatedAt: UPDATED_AT,
  },
  {
    id: "busan",
    name: "부산",
    country: "대한민국",
    region: "domestic",
    themes: ["해변", "미식", "야경"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Gwangan_Bridge1.jpg/330px-Gwangan_Bridge1.jpg",
    heroImageAlt: "광안대교와 해안선이 어우러진 부산 광안리 야경",
    intro:
      "부산은 대한민국 제2의 도시이자 대표 항구도시로, 해운대·광안리 등 도심에서 걸어서 갈 수 있는 해수욕장이 가장 큰 매력이다. 감천문화마을의 알록달록한 골목, 자갈치시장의 활기찬 수산물 문화, 광안대교의 야경까지 짧은 일정에도 밀도 높은 여행이 가능하다. 여름 성수기에는 해변 인파가 많으니 숙소를 서둘러 예약하는 것이 좋고, 부산국제영화제 기간(가을)에는 시내 전체가 축제 분위기가 된다. 부산항국제여객터미널을 통해 일본 주요 도시와 연결되는 국제 여객선도 운항되어 근거리 해외여행의 관문 역할도 한다. KTX로 서울에서 2시간 30분이면 도착할 수 있어 짧은 일정으로도 바다와 도심을 함께 즐길 수 있다.",
    attractions: [
      "해운대해수욕장",
      "광안리해수욕장",
      "감천문화마을",
      "자갈치시장",
      "태종대",
    ],
    itineraryOneDay: [
      "오전 감천문화마을 골목 산책",
      "점심 자갈치시장 해산물",
      "오후 해운대·광안리 해변",
      "저녁 광안대교 야경 감상",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "감천문화마을·자갈치시장 등 원도심 코스" },
      { day: 2, summary: "해운대·광안리·동백섬 해변 코스와 야경" },
      { day: 3, summary: "태종대·오륙도 등 자연 경관 코스 후 귀가" },
    ],
    budget: "1인 1일 평균 8~12만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "김해공항에서 리무진버스·경전철로 시내 진입, 이후 도시철도 이용",
    food: ["돼지국밥", "밀면", "씨앗호떡"],
    etiquette: [
      "해수욕장 지정 구역 밖 취사·야영은 금지된다",
      "시장에서는 상인에게 먼저 가격을 확인하고 구매한다",
      "여름 성수기 해변 쓰레기는 지정 수거함에 버린다",
    ],
    source: SOURCE_DOMESTIC,
    updatedAt: UPDATED_AT,
  },
  {
    id: "jeju",
    name: "제주",
    country: "대한민국",
    region: "domestic",
    themes: ["자연", "휴양", "해변"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Jeju_Island.jpg/330px-Jeju_Island.jpg",
    heroImageAlt: "한라산과 해안선이 함께 보이는 제주 섬 전경",
    intro:
      "제주는 화산 활동으로 형성된 대한민국 최대 섬으로, 한라산을 중심으로 오름·용암동굴·해안 절벽 등 독특한 지형이 섬 전체에 펼쳐진다. 렌터카로 해안도로를 달리며 자연을 즐기는 여행이 가장 인기가 많고, 성산일출봉·우도 등은 일출 명소로도 유명하다. 아열대성 기후라 겨울에도 비교적 온화하지만 바람이 강한 날이 많아 이동 계획에 여유를 두는 것이 좋다. 국내선 항공편이 촘촘히 운항돼 접근성이 좋고, 섬 전역에 크고 작은 카페와 박물관이 흩어져 있어 자유여행자에게도 인기가 많다. 올레길 21개 코스를 따라 걷다 보면 해안·오름·마을 풍경을 두루 만날 수 있어 도보 여행자에게도 사랑받는다.",
    attractions: [
      "성산일출봉",
      "한라산 국립공원",
      "우도",
      "협재해수욕장",
      "제주 올레길",
    ],
    itineraryOneDay: [
      "오전 성산일출봉 일출·등반",
      "점심 성산 근처 해녀 식당",
      "오후 우도 도항선 관광",
      "저녁 협재해수욕장 노을",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "동부 코스(성산일출봉, 우도)" },
      { day: 2, summary: "한라산 등반 또는 오름 트레킹" },
      { day: 3, summary: "서부 코스(협재·한림, 올레길 일부 구간)" },
    ],
    budget: "1인 1일 평균 10~15만원(렌터카·숙박·식비 포함, 항공 제외)",
    transportation:
      "제주국제공항 도착 후 렌터카 또는 시외버스로 이동(대중교통 배차 간격이 길다)",
    food: ["흑돼지 구이", "고기국수", "전복죽"],
    etiquette: [
      "한라산 등반은 지정 탐방로와 통제 시간을 반드시 지킨다",
      "오름·해안 사유지·생태보호구역은 무단 진입하지 않는다",
      "렌터카 운전 시 관광지 주변 규정 속도를 준수한다",
    ],
    source: SOURCE_DOMESTIC,
    updatedAt: UPDATED_AT,
  },
  {
    id: "gyeongju",
    name: "경주",
    country: "대한민국",
    region: "domestic",
    themes: ["역사", "문화유산"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Gyeongju_montage.png/330px-Gyeongju_montage.png",
    heroImageAlt: "불국사·첨성대 등 경주 주요 문화유산을 모은 합성 이미지",
    intro:
      "경주는 천년 신라 왕조의 수도였던 도시로, 도시 전체가 유네스코 세계문화유산으로 지정될 만큼 유적이 밀집해 있다. 불국사·석굴암의 불교 유산부터 대릉원의 고분군, 동궁과 월지의 야경까지 반나절만 걸어도 역사 여행을 완성할 수 있다. 벚꽃이 만개하는 봄과 첨성대 주변 유채꽃이 피는 시기에 방문객이 몰리므로 숙소 예약을 서두르는 것이 좋다. 도시 규모가 크지 않아 자전거 대여 서비스로도 대부분의 유적을 편안하게 둘러볼 수 있다는 점도 큰 장점이다. KTX 신경주역이 개통되면서 서울·부산 어느 방향에서도 접근이 한결 수월해졌다. 야간에는 동궁과 월지 일대에 조명이 켜져 한층 신비로운 분위기를 자아낸다.",
    attractions: ["불국사", "석굴암", "대릉원", "첨성대", "동궁과 월지"],
    itineraryOneDay: [
      "오전 불국사·석굴암 관람",
      "점심 경주 황남빵 거리",
      "오후 대릉원·첨성대 산책",
      "저녁 동궁과 월지 야경",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "불국사·석굴암 등 불교 유적 코스" },
      { day: 2, summary: "대릉원·첨성대·동궁과 월지 도심 유적 코스" },
      { day: 3, summary: "경주국립박물관과 보문관광단지 휴양 코스" },
    ],
    budget: "1인 1일 평균 7~11만원(숙박·식비·교통 포함, 항공 제외)",
    transportation: "KTX 신경주역 하차 후 시내버스 또는 렌터카로 유적지 이동",
    food: ["황남빵", "경주 한정식", "쌈밥"],
    etiquette: [
      "문화재 구역에서는 지정된 길로만 이동하고 훼손하지 않는다",
      "사찰 경내에서는 정숙을 유지한다",
      "고분군 잔디 언덕은 출입 통제 구역에 들어가지 않는다",
    ],
    source: SOURCE_DOMESTIC,
    updatedAt: UPDATED_AT,
  },
  {
    id: "gangneung",
    name: "강릉",
    country: "대한민국",
    region: "domestic",
    themes: ["해변", "커피", "자연"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Jumunjin_Lighthouse_20220501_026.jpg/330px-Jumunjin_Lighthouse_20220501_026.jpg",
    heroImageAlt: "강릉 주문진 등대와 동해 해안선 풍경",
    intro:
      "강릉은 동해안을 대표하는 여행지로, 안목해변의 커피거리와 경포호 주변 산책로가 특히 인기다. KTX 개통 이후 서울에서 2시간이면 도착할 수 있어 짧은 주말여행지로 각광받고 있으며, 겨울에는 눈꽃 여행지로도 사랑받는다. 신선한 해산물과 감자옹심이 같은 강원도 향토 음식을 함께 즐길 수 있다. 평창·정선 등 인근 산악 지역과 묶어 2~3일 코스로 계획하는 여행객도 많아 확장 여행의 거점으로도 손색이 없다. 강릉역 인근에 렌터카 업체가 많아 대중교통이 뜸한 해안 명소도 편하게 오갈 수 있다. 매년 5월 강릉단오제가 열리는 기간에는 전통 공연과 체험 부스로 도심이 북적인다.",
    attractions: [
      "경포해변",
      "안목해변 커피거리",
      "오죽헌",
      "정동진",
      "주문진항",
    ],
    itineraryOneDay: [
      "오전 오죽헌 관람",
      "점심 초당순두부마을",
      "오후 경포호·경포해변 산책",
      "저녁 안목해변 커피거리",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "오죽헌·경포호 등 문화 코스" },
      { day: 2, summary: "정동진 일출과 주문진항 수산시장 코스" },
      { day: 3, summary: "안목해변 커피거리와 해안 드라이브" },
    ],
    budget: "1인 1일 평균 7~11만원(숙박·식비·교통 포함, KTX 요금 제외)",
    transportation: "KTX 강릉역 하차 후 시내버스 또는 택시로 해변 지역 이동",
    food: ["초당순두부", "감자옹심이", "짬뽕순두부"],
    etiquette: [
      "해변 오프로드 차량 진입은 지정 구역에서만 허용된다",
      "커피거리 매장 대부분은 좌석 회전이 빨라 장시간 점유는 삼간다",
      "정동진 일출 관람 시 철길 선로에 들어가지 않는다",
    ],
    source: SOURCE_DOMESTIC,
    updatedAt: UPDATED_AT,
  },
  {
    id: "jeonju",
    name: "전주",
    country: "대한민국",
    region: "domestic",
    themes: ["미식", "한옥", "전통문화"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Jeonju_Hanok_Maeul_01.jpg/330px-Jeonju_Hanok_Maeul_01.jpg",
    heroImageAlt: "전주한옥마을의 기와지붕이 이어진 풍경",
    intro:
      "전주는 800여 채의 한옥이 밀집한 전주한옥마을로 유명한 전통문화 도시다. 한복을 대여해 입고 골목을 거니는 체험이 대표 콘텐츠이며, 비빔밥·콩나물국밥 등 전주 향토음식을 맛보기 위해 미식 여행객도 많이 찾는다. 도시 규모가 크지 않아 도보로 대부분의 명소를 하루 안에 돌아볼 수 있다. 최근에는 한옥마을 인근 객리단길에 개성 있는 카페와 소품샵이 들어서며 젊은 여행객들의 발길도 꾸준히 이어지고 있다. 매년 5월 열리는 전주국제영화제 기간에는 도심 곳곳에서 다양한 상영·부대 행사가 열린다. 전주역에서 한옥마을까지는 시내버스로 20분 안팎이면 도착할 수 있다.",
    attractions: ["전주한옥마을", "경기전", "전동성당", "남부시장", "오목대"],
    itineraryOneDay: [
      "오전 한복 대여 후 경기전 관람",
      "점심 전주비빔밥",
      "오후 전동성당·오목대 산책",
      "저녁 남부시장 야시장",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "한옥마을·경기전·전동성당 도보 코스" },
      { day: 2, summary: "남부시장 야시장과 객리단길 카페 거리" },
      { day: 3, summary: "완산칠봉 생태공원과 인근 사찰(송광사 등)" },
    ],
    budget: "1인 1일 평균 7~10만원(숙박·식비·교통 포함)",
    transportation:
      "전주역·고속버스터미널 하차 후 시내버스로 한옥마을 진입, 마을 내부는 도보 이동",
    food: ["전주비빔밥", "콩나물국밥", "모주"],
    etiquette: [
      "한옥 숙소는 대부분 실내 신발을 벗고 생활한다",
      "좁은 골목에서는 상업 촬영보다 개인 촬영을 우선 배려한다",
      "야시장에서는 음식물을 매장 밖으로 들고 나가지 않도록 안내를 따른다",
    ],
    source: SOURCE_DOMESTIC,
    updatedAt: UPDATED_AT,
  },
  {
    id: "yeosu",
    name: "여수",
    country: "대한민국",
    region: "domestic",
    themes: ["야경", "해변", "미식"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Dolsan_Bridge1.JPG/330px-Dolsan_Bridge1.JPG",
    heroImageAlt: "여수 돌산대교와 야간 조명이 어우러진 해안 풍경",
    intro:
      '여수는 "여수 밤바다"라는 노래로 유명세를 탄 이후 야경 여행지로 자리 잡은 남해안 항구도시다. 여수해상케이블카에서 바라보는 오동도와 돌산대교 일대 야경이 핵심 볼거리이며, 갓김치·서대회 등 남도 향토음식도 여행의 즐거움을 더한다. 여수엑스포해양공원 일대는 밤 산책 코스로도 인기가 많다. 2012년 여수세계박람회 개최 이후 정비된 해양 인프라 덕분에 산책로와 편의시설이 잘 갖춰져 있어 가족 여행객에게도 부담이 적다. KTX로 서울에서 3시간 안팎이면 도착할 수 있어 주말 여행 코스로도 무리가 없다. 매년 10월 열리는 여수밤바다불꽃축제 기간에는 해안 일대가 인파로 가득 찬다.',
    attractions: [
      "여수해상케이블카",
      "오동도",
      "돌산대교",
      "여수엑스포해양공원",
      "향일암",
    ],
    itineraryOneDay: [
      "오전 오동도 산책",
      "점심 여수 서대회",
      "오후 해상케이블카 탑승",
      "저녁 돌산대교·엑스포해양공원 야경",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "오동도·해상케이블카 등 해안 명소 코스" },
      { day: 2, summary: "향일암 일출과 남해안 드라이브" },
      { day: 3, summary: "돌산대교·엑스포해양공원 야경 중심 도심 코스" },
    ],
    budget: "1인 1일 평균 8~12만원(숙박·식비·교통 포함)",
    transportation: "여수엑스포역(KTX) 하차 후 시내버스 또는 택시로 이동",
    food: ["서대회무침", "갓김치", "돌게장"],
    etiquette: [
      "해상케이블카는 사전 예약 시간대를 지켜야 대기 시간을 줄일 수 있다",
      "향일암 등 사찰 구역에서는 정숙을 유지한다",
      "야경 명소 인근 주거지에서는 소음을 자제한다",
    ],
    source: SOURCE_DOMESTIC,
    updatedAt: UPDATED_AT,
  },
  {
    id: "sokcho",
    name: "속초",
    country: "대한민국",
    region: "domestic",
    themes: ["자연", "해변", "미식"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Geumgang_Bridge%2C_Sokcho_02.jpg/330px-Geumgang_Bridge%2C_Sokcho_02.jpg",
    heroImageAlt: "속초 금강대교 인근 항구와 어선이 정박한 풍경",
    intro:
      "속초는 설악산 국립공원과 동해 바다를 동시에 즐길 수 있는 강원도 대표 관광도시다. 설악산 케이블카로 손쉽게 절경을 감상할 수 있고, 속초관광수산시장의 닭强定(닭강정)과 아바이순대 등 향토 먹거리도 유명하다. 여름 해수욕과 겨울 설경 모두 인기가 많아 사계절 관광객이 꾸준하다. 서울양양고속도로 개통 이후 수도권 접근성이 크게 좋아져 당일치기 여행지로도 자주 선택된다. 속초관광수산시장 인근 실향민 문화가 남아 있는 아바이마을은 도보로도 충분히 둘러볼 수 있다. 갯배를 타고 아바이마을을 오가는 체험도 속초에서만 즐길 수 있는 소중한 추억이 된다.",
    attractions: [
      "설악산 국립공원",
      "속초해수욕장",
      "속초관광수산시장",
      "아바이마을",
      "영금정",
    ],
    itineraryOneDay: [
      "오전 설악산 케이블카·신흥사 관람",
      "점심 속초관광수산시장 닭강정",
      "오후 속초해수욕장 산책",
      "저녁 영금정 일몰",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "설악산 국립공원 트레킹·케이블카 코스" },
      { day: 2, summary: "아바이마을·수산시장 등 도심·항구 코스" },
      { day: 3, summary: "속초해수욕장·영금정 해안 산책 코스" },
    ],
    budget: "1인 1일 평균 8~12만원(숙박·식비·교통 포함)",
    transportation:
      "서울에서 고속버스 또는 동서고속화철도로 이동 후 시내버스 이용",
    food: ["아바이순대", "오징어순대", "닭강정"],
    etiquette: [
      "국립공원 탐방로 외 지역 출입은 금지된다",
      "케이블카는 기상 상황에 따라 운행이 중단될 수 있어 사전 확인이 필요하다",
      "수산시장에서는 시식 전 구매 의사를 명확히 밝힌다",
    ],
    source: SOURCE_DOMESTIC,
    updatedAt: UPDATED_AT,
  },
  {
    id: "tongyeong",
    name: "통영",
    country: "대한민국",
    region: "domestic",
    themes: ["해변", "예술", "미식"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Korea-Tongyeong-Collage-01.jpg/330px-Korea-Tongyeong-Collage-01.jpg",
    heroImageAlt: "통영 케이블카·동피랑 벽화마을 등을 모은 합성 이미지",
    intro:
      '통영은 "동양의 나폴리"로 불리는 남해안 항구도시로, 알록달록한 벽화가 가득한 동피랑마을과 한려수도 전경을 볼 수 있는 통영케이블카가 대표 명소다. 굴·멍게 등 신선한 해산물 요리와 충무김밥이 특히 유명하며, 예술가 윤이상·박경리의 고향으로 문화예술 자산도 풍부하다. 통영국제음악제 등 문화 행사가 정기적으로 열려 예술 애호가들의 발길이 꾸준히 이어지는 도시이기도 하다. 인근 소매물도·한산도 등 부속 섬으로 이어지는 여객선 노선도 다양해 섬 여행을 함께 계획하기 좋다. 이순신 장군의 한산대첩 유적지인 한산도는 역사 여행지로도 함께 둘러보기 좋다.',
    attractions: [
      "동피랑마을",
      "통영케이블카",
      "한려수도조망케이블카 전망대",
      "강구안",
      "소매물도",
    ],
    itineraryOneDay: [
      "오전 동피랑마을 벽화 골목 산책",
      "점심 충무김밥",
      "오후 통영케이블카 탑승",
      "저녁 강구안 야경",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "동피랑마을·강구안 등 원도심 코스" },
      { day: 2, summary: "통영케이블카·미륵산 전망 코스" },
      { day: 3, summary: "소매물도 등 섬 당일치기 여행" },
    ],
    budget: "1인 1일 평균 8~12만원(숙박·식비·교통·도항선 포함)",
    transportation:
      "통영종합버스터미널 하차 후 시내버스로 이동, 섬 방문 시 도항선 이용",
    food: ["충무김밥", "굴요리", "멍게비빔밥"],
    etiquette: [
      "벽화마을은 주민 거주 공간이므로 사유지 촬영은 자제한다",
      "도항선은 기상에 따라 결항될 수 있어 예약 전 확인이 필요하다",
      "케이블카 탑승 시 하절기 성수기에는 대기 시간이 길다",
    ],
    source: SOURCE_DOMESTIC,
    updatedAt: UPDATED_AT,
  },
  {
    id: "andong",
    name: "안동",
    country: "대한민국",
    region: "domestic",
    themes: ["역사", "전통문화"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/A_bird%27s_eye_view_of_the_Hahoe_Folk_Village_%284458648859%29.jpg/330px-A_bird%27s_eye_view_of_the_Hahoe_Folk_Village_%284458648859%29.jpg",
    heroImageAlt: "낙동강이 감싸고 도는 안동 하회마을 전경",
    intro:
      "안동은 유교 전통과 조선시대 양반 문화가 가장 잘 보존된 도시로 꼽힌다. 유네스코 세계문화유산인 하회마을은 낙동강이 마을을 휘감아 도는 독특한 지형으로 유명하며, 하회탈춤 공연도 함께 관람할 수 있다. 안동찜닭·간고등어 등 향토음식과 도산서원 등 서원 문화도 함께 즐길 수 있는 전통문화 여행지다. 매년 가을 열리는 안동국제탈춤페스티벌 기간에는 세계 각국의 탈춤 공연단이 함께 참여해 국제적인 축제 분위기를 더한다. 안동역에서 하회마을·도산서원까지는 시내버스로 이동할 수 있어 대중교통만으로도 여행이 가능하다. 안동댐 인근 선착장에서는 월영교까지 이어지는 짧은 유람선 코스도 운영된다.",
    attractions: ["하회마을", "병산서원", "도산서원", "월영교", "안동댐"],
    itineraryOneDay: [
      "오전 하회마을 관람과 탈춤 공연",
      "점심 안동찜닭",
      "오후 병산서원 산책",
      "저녁 월영교 야경",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "하회마을·탈춤 공연 등 민속 문화 코스" },
      { day: 2, summary: "도산서원·병산서원 등 유교 서원 코스" },
      { day: 3, summary: "월영교·안동댐 등 도심 산책 코스" },
    ],
    budget: "1인 1일 평균 7~10만원(숙박·식비·교통 포함)",
    transportation: "안동역·안동터미널 하차 후 시내버스 또는 택시로 이동",
    food: ["안동찜닭", "간고등어", "헛제사밥"],
    etiquette: [
      "서원·종택 방문 시 문턱을 밟지 않는 전통 예절을 지킨다",
      "탈춤 공연 중에는 플래시 촬영을 자제한다",
      "하회마을은 실제 주민이 거주하므로 사유 공간 출입을 삼간다",
    ],
    source: SOURCE_DOMESTIC,
    updatedAt: UPDATED_AT,
  },

  // ── 해외 15개국 30도시 ──────────────────────────────────────
  {
    id: "tokyo",
    name: "도쿄",
    country: "일본",
    region: "overseas",
    themes: ["도심", "쇼핑", "미식"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/330px-Skyscrapers_of_Shinjuku_2009_January.jpg",
    heroImageAlt: "도쿄 신주쿠 마천루가 늘어선 도심 전경",
    intro:
      "도쿄는 전통 사찰과 초현대적 마천루가 공존하는 일본의 수도로, 세계 최대 규모의 대중교통망 덕분에 초행자도 이동이 어렵지 않다. 아사쿠사의 센소지에서 에도 시대 정취를, 시부야·신주쿠에서 최신 트렌드를 동시에 경험할 수 있다. 벚꽃이 만개하는 3~4월과 단풍이 물드는 11월에 방문객이 가장 많으며, 미쉐린 맛집부터 골목 라멘집까지 미식 스펙트럼이 넓다. 스이카(교통카드) 한 장으로 전철·버스·편의점 결제가 모두 가능해 여행 내내 편리하다. 하네다공항은 시내와 가까워 이동 시간이 짧고, 나리타공항은 저비용항공사(LCC) 노선이 많아 예산에 따라 선택할 수 있다.",
    attractions: [
      "센소지",
      "시부야 스크램블 교차로",
      "메이지 신궁",
      "도쿄 스카이트리",
      "신주쿠 교엔",
    ],
    itineraryOneDay: [
      "오전 아사쿠사 센소지 관람",
      "점심 아사쿠사 텐푸라",
      "오후 시부야·하라주쿠 쇼핑",
      "저녁 신주쿠 이자카야 거리",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "아사쿠사·우에노 등 전통 지역 도보 코스" },
      { day: 2, summary: "시부야·하라주쿠·신주쿠 쇼핑·트렌드 코스" },
      { day: 3, summary: "도쿄 스카이트리와 오다이바 야경 코스" },
    ],
    budget: "1인 1일 평균 12~18만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "나리타/하네다공항에서 리무진버스·전철로 시내 진입, 이후 JR·지하철 노선 이용",
    food: ["스시", "라멘", "몬자야키"],
    etiquette: [
      "전철·거리에서 통화는 삼가고 조용히 이용한다",
      "음식점에서 팁은 주지 않으며 오히려 실례가 될 수 있다",
      "길거리 흡연은 지정 구역에서만 허용된다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "osaka",
    name: "오사카",
    country: "일본",
    region: "overseas",
    themes: ["미식", "쇼핑", "야경"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Osaka_Castle_03bs3200.jpg/330px-Osaka_Castle_03bs3200.jpg",
    heroImageAlt: "해자와 성벽이 보이는 오사카성 전경",
    intro:
      '오사카는 "일본의 부엌"이라 불릴 만큼 다코야키·오코노미야키 등 서민 음식 문화가 발달한 간사이 지방의 중심 도시다. 도톤보리의 화려한 간판과 네온사인, 오사카성의 웅장한 성곽이 대표적인 볼거리이며, 유니버설 스튜디오 재팬 덕분에 가족 여행객에게도 인기가 많다. 도쿄보다 물가가 다소 저렴하고 사람들의 응대가 활기차다는 평가를 받는다. 간사이국제공항에서 오사카·교토·고베까지 1시간 내외로 이동할 수 있어 간사이 지역 여행의 거점으로도 자주 활용된다. 오사카 주유패스를 이용하면 주요 관광시설 입장료와 대중교통을 하나로 해결할 수 있다.',
    attractions: [
      "오사카성",
      "도톤보리",
      "유니버설 스튜디오 재팬",
      "신사이바시",
      "구로몬 시장",
    ],
    itineraryOneDay: [
      "오전 오사카성 관람",
      "점심 구로몬 시장 먹거리",
      "오후 신사이바시 쇼핑",
      "저녁 도톤보리 야경·다코야키",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "오사카성·구로몬 시장 등 역사·미식 코스" },
      { day: 2, summary: "유니버설 스튜디오 재팬 종일 코스" },
      { day: 3, summary: "도톤보리·신사이바시 쇼핑과 야경 코스" },
    ],
    budget: "1인 1일 평균 10~15만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "간사이국제공항에서 특급열차·리무진버스로 시내 진입, 이후 지하철·JR 이용",
    food: ["다코야키", "오코노미야키", "쿠시카츠"],
    etiquette: [
      "에스컬레이터에서는 한쪽 줄로 서서 이용한다(간사이는 오른쪽이 일반적)",
      "식당 좁은 골목에서는 대기 줄 순서를 지킨다",
      "쓰레기통이 드물어 개인 쓰레기는 직접 소지·처리한다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "bangkok",
    name: "방콕",
    country: "태국",
    region: "overseas",
    themes: ["미식", "사원", "쇼핑"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/4Y1A1159_Bangkok_%2833536795515%29.jpg/330px-4Y1A1159_Bangkok_%2833536795515%29.jpg",
    heroImageAlt: "차오프라야강과 도심 스카이라인이 보이는 방콕 전경",
    intro:
      "방콕은 왕궁·사원 등 전통 유산과 초고층 루프탑 바가 공존하는 동남아시아 대표 관광 허브다. 왓 프라깨우·왓 아룬 등 화려한 불교 사원과 카오산로드의 자유로운 여행자 문화, 야시장 먹거리까지 다양한 매력을 갖췄다. 우기(6~10월)에는 스콜성 소나기가 잦아 우산을 챙기는 것이 좋고, 물가가 저렴해 가성비 여행지로도 인기가 높다. 그랩(차량 호출 앱)과 BTS·MRT 노선이 잘 갖춰져 있어 초행자도 어렵지 않게 도심을 이동할 수 있다. 수완나품·돈므앙 두 개의 국제공항이 있어 저비용항공사와 대형 항공사 노선을 모두 선택할 수 있다. 왓 포의 거대한 와불상도 왕궁 인근에서 함께 둘러보기 좋은 대표 명소다.",
    attractions: [
      "왕궁(왓 프라깨우)",
      "왓 아룬",
      "카오산로드",
      "짜뚜짝 주말시장",
      "차오프라야강 유람",
    ],
    itineraryOneDay: [
      "오전 왕궁·왓 프라깨우 관람",
      "점심 태국식 쌀국수",
      "오후 왓 아룬·차오프라야강 유람",
      "저녁 카오산로드 야시장",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "왕궁·왓 아룬 등 사원 중심 코스" },
      { day: 2, summary: "짜뚜짝 시장·시암 상권 쇼핑 코스" },
      { day: 3, summary: "수상시장 당일 투어와 루프탑 바 야경" },
    ],
    budget: "1인 1일 평균 6~10만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "수완나품/돈므앙공항에서 공항철도·택시로 시내 진입, 이후 BTS·MRT·톡톡 이용",
    food: ["팟타이", "똠얌꿍", "망고 스티키라이스"],
    etiquette: [
      "왕실·사원 관련 시설에서는 노출이 적은 복장을 갖춘다",
      "사원 진입 시 신발을 벗어야 하는 구역이 많다",
      "머리를 함부로 쓰다듬는 행동은 실례로 여겨진다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "chiang-mai",
    name: "치앙마이",
    country: "태국",
    region: "overseas",
    themes: ["자연", "사원", "휴양"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/0020-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%AB%E0%B9%8C%E0%B8%A7%E0%B8%A3%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg/330px-0020-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%AB%E0%B9%8C%E0%B8%A7%E0%B8%A3%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg",
    heroImageAlt: "치앙마이 왓 프라싱 사원의 황금빛 불탑",
    intro:
      "치앙마이는 태국 북부의 옛 란나 왕국 수도로, 옛 성벽으로 둘러싸인 구시가지에 사원이 촘촘히 모여 있다. 왓 프라탓 도이수텝에서 내려다보는 도시 전경과 매년 열리는 러이끄라통(등불 축제)이 특히 유명하며, 산악 지형 덕분에 트레킹·코끼리 보호구역 방문 등 자연 액티비티도 풍부하다. 방콕보다 느리고 여유로운 분위기를 찾는 여행객에게 인기가 많다. 디지털 노마드 여행객이 장기 체류지로도 즐겨 찾을 만큼 카페와 코워킹 공간이 잘 갖춰져 있다. 매년 11월 러이끄라통 시즌에는 강물과 하늘에 등불이 함께 떠오르는 장관이 펼쳐진다. 치앙마이 국제공항은 시내와 가까워 공항에서 구시가지까지 택시로 15분이면 충분하다.",
    attractions: [
      "왓 프라싱",
      "왓 프라탓 도이수텝",
      "치앙마이 구시가지 성벽",
      "님만해민 거리",
      "선데이 워킹 스트리트",
    ],
    itineraryOneDay: [
      "오전 왓 프라탓 도이수텝 관람",
      "점심 카오소이(북부 커리 국수)",
      "오후 구시가지 사원 투어",
      "저녁 님만해민 카페 거리",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "구시가지 사원(왓 프라싱 등) 도보 코스" },
      { day: 2, summary: "도이수텝 사원과 산간 트레킹" },
      { day: 3, summary: "코끼리 보호구역 방문과 님만해민 카페 거리" },
    ],
    budget: "1인 1일 평균 5~9만원(숙박·식비·교통 포함, 항공 제외)",
    transportation: "치앙마이국제공항에서 그랩·썽태우(합승 트럭)로 시내 이동",
    food: ["카오소이", "쏨땀", "사이우아(북부 소시지)"],
    etiquette: [
      "코끼리 체험은 탑승형이 아닌 보호·관찰형 프로그램을 우선 선택한다",
      "사원 방문 시 어깨와 무릎을 가리는 복장을 갖춘다",
      "불상보다 높은 위치에서 사진을 찍는 행동은 삼간다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "hanoi",
    name: "하노이",
    country: "베트남",
    region: "overseas",
    themes: ["역사", "미식", "호수"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Hanoi_skyline_with_Ba_Vi_Mountain.jpg/330px-Hanoi_skyline_with_Ba_Vi_Mountain.jpg",
    heroImageAlt: "바비산을 배경으로 한 하노이 도심 스카이라인",
    intro:
      "하노이는 천 년의 역사를 지닌 베트남의 수도로, 호안끼엠 호수를 중심으로 구시가지 36거리에 전통 상점이 밀집해 있다. 프랑스 식민지 시대 건축물과 사회주의 상징물이 공존하는 독특한 도시 경관을 갖추었으며, 분짜·퍼 등 하노이식 요리는 베트남 미식의 본류로 평가받는다. 습하고 더운 여름을 피해 가을~겨울철에 방문하는 여행객이 많다. 하롱베이로 이동하는 관문 도시이기도 해 하노이에서 1박 2일 크루즈 투어를 연계하는 일정이 일반적이다. 노이바이국제공항에서 시내까지는 약 40분이 소요되며 셔틀버스 노선도 잘 갖춰져 있다. 구시가지 야시장은 주말 저녁마다 차량 통행을 막고 보행자 거리로 운영된다.",
    attractions: [
      "호안끼엠 호수",
      "구시가지(36거리)",
      "호치민 묘",
      "문묘",
      "탕롱 수상인형극장",
    ],
    itineraryOneDay: [
      "오전 호안끼엠 호수·구시가지 산책",
      "점심 분짜",
      "오후 문묘·호치민 묘 관람",
      "저녁 수상인형극 관람",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "호안끼엠 호수·구시가지 도보 코스" },
      { day: 2, summary: "호치민 묘·문묘 등 역사 유적 코스" },
      { day: 3, summary: "하롱베이 당일 투어" },
    ],
    budget: "1인 1일 평균 5~8만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "노이바이국제공항에서 셔틀버스·그랩으로 시내 진입, 구시가지는 도보·씨클로 이용",
    food: ["퍼(쌀국수)", "분짜", "에그커피"],
    etiquette: [
      "호치민 묘 참배 시 반바지·민소매 등 노출 복장은 금지된다",
      "도로 횡단 시 차량 흐름을 살피며 천천히 걷는다(급하게 뛰지 않는다)",
      "사원·묘역에서는 큰 소리로 대화하지 않는다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "hoi-an",
    name: "호이안",
    country: "베트남",
    region: "overseas",
    themes: ["야경", "전통문화", "해변"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Ch%E1%BB%A3_H%E1%BB%99i_An_-_Hoi_An_Market_%282024%29_-_img_02.jpg/330px-Ch%E1%BB%A3_H%E1%BB%99i_An_-_Hoi_An_Market_%282024%29_-_img_02.jpg",
    heroImageAlt: "호이안 재래시장의 활기찬 노점 풍경",
    intro:
      "호이안은 15~19세기 국제 무역항의 모습을 그대로 간직한 유네스코 세계문화유산 도시다. 노란빛 옛 건물과 일본교, 밤마다 강물 위를 수놓는 형형색색 등불이 대표적인 풍경이며, 맞춤 재단(테일러링) 상점이 많아 옷·구두를 저렴하게 맞추는 여행지로도 유명하다. 구시가지는 도보로 충분히 둘러볼 수 있는 아담한 규모다. 다낭 국제공항에서 40분 거리로 가까워 다낭 해변 여행과 함께 묶어 일정을 짜는 여행객이 많다. 매달 음력 14일 밤에는 전기 조명을 끄고 전통 등불만 밝히는 등불 축제가 열려 특별한 분위기를 자아낸다. 인근 안방비치·안방리조트 지역과 묶어 휴양 일정을 계획하는 여행객도 많다.",
    attractions: [
      "호이안 올드타운",
      "내원교(일본교)",
      "호이안 야시장",
      "투본강 등불 보트",
      "안방비치",
    ],
    itineraryOneDay: [
      "오전 올드타운 도보 관광",
      "점심 까오러우(호이안 국수)",
      "오후 맞춤 재단 상점 방문",
      "저녁 투본강 등불 보트 체험",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "올드타운·내원교 등 유적 도보 코스" },
      { day: 2, summary: "안방비치 휴양과 쿠킹 클래스" },
      { day: 3, summary: "미선유적지 당일 투어" },
    ],
    budget: "1인 1일 평균 5~8만원(숙박·식비·교통 포함, 항공 제외)",
    transportation: "다낭국제공항에서 택시·셔틀버스로 약 40분 이동",
    food: ["까오러우", "화이트로즈(반바오반박)", "반미"],
    etiquette: [
      "올드타운 입장권(유적지 통합권)은 지정 매표소에서 구매한다",
      "등불 보트 뱃사공에게는 팁을 별도로 준비하는 것이 일반적이다",
      "좁은 골목 상점 내부 촬영 전에는 상인의 동의를 구한다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "taipei",
    name: "타이베이",
    country: "대만",
    region: "overseas",
    themes: ["미식", "야시장", "온천"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Taipei_Skyline_2022.06.29.jpg/330px-Taipei_Skyline_2022.06.29.jpg",
    heroImageAlt: "타이베이 101이 보이는 도심 스카이라인",
    intro:
      "타이베이는 타이베이 101 빌딩과 딤섬·훠궈 등 미식으로 잘 알려진 대만의 수도다. 스린 야시장·라오허제 야시장 등 야시장 문화가 발달해 저녁 시간대 여행 콘텐츠가 풍부하며, 근교 지우펀·예류 지질공원까지 당일치기로 다녀오기 좋다. 서울에서 비행 시간이 짧아 짧은 주말 여행지로 특히 인기가 많다. 이지카드(대만 교통카드) 하나로 MRT·버스·편의점 결제까지 해결할 수 있어 여행이 한결 수월하다. 타오위안국제공항에서 공항철도로 40분이면 시내에 도착해 접근성도 뛰어나다. 야시장마다 대표 먹거리가 달라 두세 곳을 비교하며 도는 재미도 쏠쏠하다.",
    attractions: [
      "타이베이 101",
      "스린 야시장",
      "용산사",
      "국립고궁박물원",
      "지우펀 옛거리(근교)",
    ],
    itineraryOneDay: [
      "오전 국립고궁박물원 관람",
      "점심 딤섬 맛집",
      "오후 용산사·디화제 거리",
      "저녁 스린 야시장",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "타이베이 101·시먼딩 등 도심 코스" },
      { day: 2, summary: "지우펀·예류 지질공원 근교 당일 투어" },
      { day: 3, summary: "국립고궁박물원·용산사 등 문화 코스" },
    ],
    budget: "1인 1일 평균 8~12만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "타오위안국제공항에서 공항철도로 시내 진입, 이후 MRT로 대부분 명소 이동",
    food: ["샤오롱바오", "루러우판(돼지고기덮밥)", "버블티"],
    etiquette: [
      "사찰(용산사 등)에서는 향을 피우는 순서와 예절을 안내판에 따라 지킨다",
      "MRT 내 음식물 섭취는 금지된다",
      "야시장에서는 현금 결제가 일반적이므로 소액권을 준비한다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "kaohsiung",
    name: "가오슝",
    country: "대만",
    region: "overseas",
    themes: ["항구", "야경", "미식"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Cityscape_of_Kaohsiung%2C_Taiwan_202303.jpg/330px-Cityscape_of_Kaohsiung%2C_Taiwan_202303.jpg",
    heroImageAlt: "가오슝 항구와 도심 마천루가 함께 보이는 스카이라인",
    intro:
      "가오슝은 대만 남부를 대표하는 항구도시로, 타이베이보다 여유롭고 개방적인 분위기가 매력이다. 롄츠탄(연지담) 호수의 용호탑, 예술 특구로 재탄생한 보얼 예술특구 등 개발과 전통이 공존하며, 애하 강변 야시장은 현지인들이 즐겨 찾는 곳이다. 온화한 기후 덕분에 겨울에도 여행하기 좋다. 대만 고속철도(HSR)로 타이베이에서 약 1시간 30분이면 도착해 남북 종단 여행의 한 축으로 삼기에도 좋다. 시즈완 해변 일몰은 현지인들 사이에서도 손꼽히는 데이트 명소로 통한다. 가오슝 MRT 미술관역 인근에는 대형 쇼핑몰과 공원이 함께 조성되어 있다.",
    attractions: [
      "롄츠탄(연지담)",
      "보얼 예술특구",
      "류허 야시장",
      "포광산 불광사",
      "시즈완 해변",
    ],
    itineraryOneDay: [
      "오전 롄츠탄 용호탑 관람",
      "점심 가오슝식 우육면",
      "오후 보얼 예술특구",
      "저녁 류허 야시장",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "롄츠탄·포광산 등 사찰·호수 코스" },
      { day: 2, summary: "보얼 예술특구·시즈완 해변 코스" },
      { day: 3, summary: "류허 야시장 등 도심 미식 코스" },
    ],
    budget: "1인 1일 평균 7~11만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "가오슝국제공항에서 MRT로 시내 진입, 시내는 MRT·경전철 이용",
    food: ["우육면", "학대차(오리구이)", "목과우유(파파야밀크)"],
    etiquette: [
      "불광사 등 대형 사찰은 별도 복장 규정이 있을 수 있어 안내를 확인한다",
      "야시장 노점 앞 좌석은 주문 후에만 이용한다",
      "해변 지역 쓰레기는 반드시 되가져가거나 지정 수거함에 버린다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "manila",
    name: "마닐라",
    country: "필리핀",
    region: "overseas",
    themes: ["역사", "도심", "쇼핑"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Cityscape_of_Manila%2C_2025_%2801%29.jpg/330px-Cityscape_of_Manila%2C_2025_%2801%29.jpg",
    heroImageAlt: "마닐라만 인근 도심 스카이라인",
    intro:
      "마닐라는 스페인 식민지 시대의 성곽도시 인트라무로스와 현대적 쇼핑몰이 공존하는 필리핀의 수도다. 마닐라만의 석양은 세계적으로도 아름답기로 손꼽히며, 도심 곳곳의 대형 쇼핑몰은 무더운 날씨를 피해 하루를 보내기 좋다. 다른 동남아 도시보다 영어 의사소통이 원활한 편이라 여행이 비교적 수월하다. 세부·보홀 등 도서 지역으로 이동하는 국내선 항공편이 많아 필리핀 여행의 관문 도시 역할도 한다. 도심 교통 체증이 심한 편이라 이동 시간을 넉넉히 잡아 일정을 짜는 것이 좋다. 마카티·BGC 등 신도심 지역은 대형 쇼핑몰과 고급 호텔이 밀집해 있다.",
    attractions: [
      "인트라무로스",
      "리잘 공원",
      "마닐라 대성당",
      "SM 몰 오브 아시아",
      "마닐라만 산책로",
    ],
    itineraryOneDay: [
      "오전 인트라무로스 도보 투어",
      "점심 필리핀 전통 음식",
      "오후 리잘 공원 산책",
      "저녁 마닐라만 석양·쇼핑몰",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "인트라무로스·리잘 공원 역사 코스" },
      { day: 2, summary: "대형 쇼핑몰과 도심 관광 코스" },
      { day: 3, summary: "근교 타가이타이 화산 전망 당일 투어" },
    ],
    budget: "1인 1일 평균 6~9만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "니노이 아키노 국제공항에서 그랩·택시로 시내 진입(교통 체증이 심해 이동 시간에 여유를 둔다)",
    food: ["아도보", "시니강", "레촌"],
    etiquette: [
      "야간 이동 시 가급적 그랩 등 예약형 차량을 이용한다",
      "소지품 관리에 특히 유의한다(혼잡한 관광지 소매치기 주의)",
      "성당 등 종교 시설 방문 시 단정한 복장을 갖춘다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "cebu",
    name: "세부",
    country: "필리핀",
    region: "overseas",
    themes: ["해변", "휴양", "액티비티"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Cebu_city_skyline_2025.jpg/330px-Cebu_city_skyline_2025.jpg",
    heroImageAlt: "세부 시티 도심과 해안이 함께 보이는 스카이라인",
    intro:
      "세부는 하얀 모래사장과 에메랄드빛 바다를 갖춘 필리핀 대표 휴양지로, 스노클링·다이빙 등 해양 액티비티의 성지로 꼽힌다. 고래상어와 함께 헤엄치는 오슬롭 투어, 캐니어닝으로 유명한 카와산 폭포 등 세부 남부의 자연 명소도 인기가 많다. 세부 시티에는 스페인 식민지 시대 유적인 마젤란 십자가·산토니뇨 성당도 남아 있다. 막탄섬 일대에는 국제적인 리조트 체인이 밀집해 있어 신혼여행지로도 꾸준히 사랑받는다. 막탄-세부국제공항은 한국 주요 도시와 직항 노선이 많아 접근성이 뛰어나다. 세부 시티에서 남부 투어 지역까지는 차량으로 3시간 안팎이 소요된다.",
    attractions: [
      "막탄섬 해변 리조트",
      "오슬롭 고래상어 투어",
      "카와산 폭포",
      "산토니뇨 성당",
      "마젤란 십자가",
    ],
    itineraryOneDay: [
      "오전 산토니뇨 성당·마젤란 십자가 관람",
      "점심 레촌(세부식 통돼지구이)",
      "오후 막탄섬 해변 휴양",
      "저녁 해변 리조트 선셋",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "세부 시티 역사 유적 코스" },
      { day: 2, summary: "오슬롭 고래상어 투어와 카와산 폭포 캐니어닝" },
      { day: 3, summary: "막탄섬 해변 리조트 휴양·스노클링" },
    ],
    budget: "1인 1일 평균 8~13만원(숙박·식비·교통·액티비티 포함, 항공 제외)",
    transportation:
      "막탄-세부국제공항에서 리조트 셔틀·그랩으로 이동, 남부 투어는 대개 밴 전세로 이동",
    food: ["레촌", "푸소(코코넛잎 밥)", "시나공"],
    etiquette: [
      "고래상어 투어는 공식 가이드라인(거리 유지, 선크림 자제)을 지킨다",
      "해양 액티비티 전 반드시 보험·안전 장비를 확인한다",
      "리조트 밖 로컬 지역에서는 노출이 적은 복장을 권장한다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "paris",
    name: "파리",
    country: "프랑스",
    region: "overseas",
    themes: ["예술", "역사", "미식"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/330px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
    heroImageAlt: "생자크탑에서 바라본 에펠탑과 파리 시가지",
    intro:
      "파리는 에펠탑·루브르 박물관·개선문 등 세계적인 랜드마크가 도보권 안에 밀집한 예술과 낭만의 도시다. 센강을 따라 걷는 산책과 노천카페 문화, 미슐랭 레스토랑부터 동네 불랑제리까지 다채로운 미식 경험이 여행의 핵심이다. 소매치기가 많은 관광지가 있어 소지품 관리에 유의해야 하며, 박물관은 요일별 휴관일을 미리 확인하는 것이 좋다. 파리 뮤지엄 패스를 활용하면 주요 박물관 대기줄을 상당 부분 건너뛸 수 있어 짧은 일정에 특히 유용하다. 지하철 1일권을 구매하면 구역 내 대부분의 명소를 환승 걱정 없이 오갈 수 있다. 샤를 드골공항에서 시내까지는 RER 급행열차로 약 40분이 소요된다.",
    attractions: [
      "에펠탑",
      "루브르 박물관",
      "개선문",
      "노트르담 대성당",
      "몽마르트 언덕",
    ],
    itineraryOneDay: [
      "오전 루브르 박물관 관람",
      "점심 노천카페 브런치",
      "오후 개선문·샹젤리제 거리",
      "저녁 에펠탑 야경",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "루브르·튈르리 정원 등 박물관 코스" },
      { day: 2, summary: "에펠탑·개선문·샹젤리제 랜드마크 코스" },
      { day: 3, summary: "몽마르트 언덕과 근교 베르사유 궁전 당일 투어" },
    ],
    budget: "1인 1일 평균 18~28만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "샤를 드골/오를리공항에서 RER·리무진버스로 시내 진입, 이후 메트로 이용",
    food: ["크루아상", "에스카르고", "스테이크 프리트"],
    etiquette: [
      "식당 입장 시 종업원 안내 없이 임의로 착석하지 않는다",
      "박물관·성당 내부에서는 플래시 촬영이 금지되는 경우가 많다",
      "인사말(봉주르 등)로 대화를 시작하는 것이 기본 예의다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "nice",
    name: "니스",
    country: "프랑스",
    region: "overseas",
    themes: ["해변", "휴양", "미식"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Promenade_des_Anglais_Nice_IMG_1255.jpg/330px-Promenade_des_Anglais_Nice_IMG_1255.jpg",
    heroImageAlt: "니스 프롬나드 데 장글레 해안 산책로 전경",
    intro:
      "니스는 지중해 코트다쥐르(프렌치 리비에라)의 중심 도시로, 프롬나드 데 장글레 해안 산책로와 자갈 해변이 대표적인 풍경이다. 구시가지 비에유빌의 좁은 골목과 알록달록한 건물, 살레야 시장의 신선한 지중해 식재료가 여행의 즐거움을 더한다. 인근 모나코·칸느·에즈 마을로의 당일치기 여행지로도 훌륭한 거점이다. 니스 코트다쥐르공항이 시내와 가까워 리비에라 해안 여행의 시작점으로 삼기에도 편리하다. 트램 한 대로 구시가지·해안 산책로·기차역을 모두 오갈 수 있어 이동이 단순하다. 살레야 시장의 노천 카페에서 아침 식사를 즐기는 것도 니스 여행의 소소한 즐거움이다.",
    attractions: [
      "프롬나드 데 장글레",
      "니스 구시가지(비에유빌)",
      "살레야 시장",
      "카스텔 언덕 전망대",
      "니스 현대미술관",
    ],
    itineraryOneDay: [
      "오전 살레야 시장 산책",
      "점심 소카(니스식 병아리콩 빵)",
      "오후 구시가지·카스텔 언덕",
      "저녁 프롬나드 데 장글레 해안 산책",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "구시가지·살레야 시장 도보 코스" },
      { day: 2, summary: "모나코·에즈 마을 근교 당일 투어" },
      { day: 3, summary: "해변 휴양과 니스 현대미술관 관람" },
    ],
    budget: "1인 1일 평균 15~22만원(숙박·식비·교통 포함, 항공 제외)",
    transportation: "니스 코트다쥐르공항에서 트램·버스로 시내 진입",
    food: ["소카", "살라드 니수아즈", "라타투이"],
    etiquette: [
      "자갈 해변이 많아 발이 편한 신발이나 워터슈즈를 챙긴다",
      "시장에서는 상품을 손으로 직접 만지기 전에 문의한다",
      "여름 성수기 해변은 유료 구역과 무료 구역이 구분되어 있다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "rome",
    name: "로마",
    country: "이탈리아",
    region: "overseas",
    themes: ["역사", "유적", "미식"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg/330px-Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg",
    heroImageAlt: "관광객으로 붐비는 로마 트레비 분수 전경",
    intro:
      '로마는 콜로세움·포로 로마노 등 고대 로마 제국의 유적이 도시 전역에 살아 있는 "영원한 도시"다. 바티칸 시국의 성 베드로 대성당과 시스티나 성당 천장화는 세계적인 예술 유산으로, 트레비 분수에 동전을 던지는 전통도 여행객들에게 인기가 많다. 걷는 거리가 길고 여름 더위가 강하니 편한 신발과 충분한 수분 보충이 필요하다. 시내 곳곳의 무료 식수대(나소니)를 활용하면 물병을 손쉽게 채울 수 있다. 로마 패스를 구매하면 대중교통과 일부 유적지 입장료를 한 번에 해결할 수 있다. 피우미치노공항에서 시내까지는 레오나르도 익스프레스 열차로 약 30분이 소요된다.',
    attractions: [
      "콜로세움",
      "트레비 분수",
      "바티칸 시국(성 베드로 대성당)",
      "판테온",
      "스페인 광장",
    ],
    itineraryOneDay: [
      "오전 콜로세움·포로 로마노 관람",
      "점심 로마식 파스타",
      "오후 판테온·트레비 분수",
      "저녁 스페인 광장 야경",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "콜로세움·포로 로마노 등 고대 유적 코스" },
      { day: 2, summary: "바티칸 시국 성 베드로 대성당·시스티나 성당" },
      { day: 3, summary: "트레비 분수·판테온·스페인 광장 도심 코스" },
    ],
    budget: "1인 1일 평균 16~24만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "피우미치노/참피노공항에서 열차·리무진버스로 시내 진입, 이후 메트로·트램 이용",
    food: ["카르보나라", "로마식 피자", "젤라또"],
    etiquette: [
      "성당 방문 시 어깨와 무릎을 가리는 복장을 갖춘다",
      "유적지 돌·기념물을 손으로 훼손하지 않는다",
      "레스토랑 대부분에 자릿세(코페르토)가 별도로 청구된다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "florence",
    name: "피렌체",
    country: "이탈리아",
    region: "overseas",
    themes: ["예술", "역사", "미식"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Firenze_-_Piazzale_Michelangelo%2C_Firenze%2C_Italy_-_April_6%2C_2015_02.jpg/330px-Firenze_-_Piazzale_Michelangelo%2C_Firenze%2C_Italy_-_April_6%2C_2015_02.jpg",
    heroImageAlt: "미켈란젤로 광장에서 내려다본 피렌체 시가지 전경",
    intro:
      "피렌체는 르네상스 예술의 발상지로, 두오모(산타 마리아 델 피오레 대성당)의 거대한 돔과 우피치 미술관의 방대한 컬렉션이 대표적인 볼거리다. 미켈란젤로 광장에서 바라보는 붉은 지붕 시가지 전경은 피렌체 여행의 하이라이트로 꼽힌다. 도시 규모가 크지 않아 도보로 대부분의 명소를 이틀 안에 돌아볼 수 있다. 가죽공예·금세공 등 전통 공방이 많아 수공예품 쇼핑을 좋아하는 여행객에게도 만족도가 높다. 로마에서 고속열차로 약 1시간 30분이면 도착해 로마·피렌체를 묶은 일정을 짜기에도 좋다. 폰테 베키오 다리 위 금세공 상점가는 해 질 무렵 특히 아름답다.",
    attractions: [
      "두오모(산타 마리아 델 피오레 대성당)",
      "우피치 미술관",
      "베키오 다리",
      "미켈란젤로 광장",
      "아카데미아 미술관(다비드상)",
    ],
    itineraryOneDay: [
      "오전 두오모 관람 및 돔 전망대 등반",
      "점심 피렌체식 스테이크",
      "오후 우피치 미술관",
      "저녁 미켈란젤로 광장 야경",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "두오모·베키오 다리 등 구시가지 코스" },
      { day: 2, summary: "우피치·아카데미아 미술관 예술 코스" },
      { day: 3, summary: "근교 피사·시에나 당일 투어" },
    ],
    budget: "1인 1일 평균 15~22만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "피렌체 페레톨라공항 또는 로마에서 고속열차 이용, 시내는 도보 위주로 이동",
    food: ["피렌체식 스테이크(비스테카)", "리볼리타 수프", "젤라또"],
    etiquette: [
      "주요 미술관은 사전 예약이 강력히 권장된다(현장 대기가 매우 길다)",
      "두오모 돔 전망대는 계단이 많아 편한 신발이 필요하다",
      "성당 내부에서는 정숙을 유지한다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "barcelona",
    name: "바르셀로나",
    country: "스페인",
    region: "overseas",
    themes: ["건축", "해변", "미식"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Evening_light_over_Barcelona.jpg/330px-Evening_light_over_Barcelona.jpg",
    heroImageAlt: "저녁 노을이 비치는 바르셀로나 도심 전경",
    intro:
      "바르셀로나는 가우디의 독창적인 건축물로 유명한 카탈루냐 지방의 중심 도시다. 사그라다 파밀리아 성당은 100년 넘게 건축이 이어지고 있는 세계적인 명소이며, 구엘 공원·카사 바트요 등 도시 곳곳에 가우디의 흔적이 남아 있다. 지중해 해변이 도심과 가까워 건축 관광과 해변 휴양을 동시에 즐길 수 있다. 대중교통 1일권을 이용하면 지하철·버스를 자유롭게 오가며 도시 전역을 효율적으로 둘러볼 수 있다. 엘프라트공항에서 시내까지 공항버스로 35분 남짓이면 도착해 접근성도 준수한 편이다. 고딕지구의 좁은 골목마다 숨은 카페와 편집숍을 발견하는 재미도 크다.",
    attractions: [
      "사그라다 파밀리아",
      "구엘 공원",
      "카사 바트요",
      "람블라스 거리",
      "바르셀로네타 해변",
    ],
    itineraryOneDay: [
      "오전 사그라다 파밀리아 관람",
      "점심 타파스",
      "오후 구엘 공원·카사 바트요",
      "저녁 바르셀로네타 해변 산책",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "사그라다 파밀리아·카사 바트요 등 가우디 건축 코스" },
      { day: 2, summary: "구엘 공원과 고딕지구·람블라스 거리 코스" },
      { day: 3, summary: "바르셀로네타 해변 휴양과 몬주익 전망대" },
    ],
    budget: "1인 1일 평균 14~20만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "바르셀로나 엘프라트공항에서 공항버스·열차로 시내 진입, 이후 메트로 이용",
    food: ["타파스", "빠에야", "판 콘 토마테"],
    etiquette: [
      "사그라다 파밀리아 등 인기 명소는 사전 온라인 예약이 필수에 가깝다",
      "람블라스 거리 등 혼잡 지역에서는 소매치기에 유의한다",
      "해변에서 상의 탈의는 지정 구역 관례를 따른다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "madrid",
    name: "마드리드",
    country: "스페인",
    region: "overseas",
    themes: ["예술", "미식", "도심"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Madrid_-_Sky_Bar_360%C2%BA_%28Hotel_Riu_Plaza_Espa%C3%B1a%29%2C_vistas_19.jpg/330px-Madrid_-_Sky_Bar_360%C2%BA_%28Hotel_Riu_Plaza_Espa%C3%B1a%29%2C_vistas_19.jpg",
    heroImageAlt: "스카이 바에서 내려다본 마드리드 도심 전경",
    intro:
      "마드리드는 스페인의 수도로, 프라도 미술관·레이나 소피아 미술관 등 세계적 수준의 미술관이 모여 있는 예술 도시다. 마요르 광장과 그란비아 거리에서 활기찬 도심 분위기를, 레티로 공원에서는 여유로운 휴식을 즐길 수 있다. 밤늦게까지 이어지는 타파스 바 문화와 축구(레알 마드리드) 관람도 마드리드 여행의 별미다. 바라하스공항에서 시내까지 지하철로 30분 남짓이면 도착해 접근성도 우수하다. 근교 톨레도·세고비아까지 기차로 1시간 이내라 당일치기 소도시 여행을 계획하기에도 좋다. 그란비아 거리는 밤늦게까지 상점과 극장이 불을 밝혀 활기가 넘친다.",
    attractions: [
      "프라도 미술관",
      "마요르 광장",
      "레티로 공원",
      "왕궁",
      "그란비아 거리",
    ],
    itineraryOneDay: [
      "오전 프라도 미술관 관람",
      "점심 타파스 바 투어",
      "오후 레티로 공원 산책",
      "저녁 그란비아 거리",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "프라도·레이나 소피아 등 미술관 코스" },
      { day: 2, summary: "왕궁·마요르 광장 등 도심 역사 코스" },
      { day: 3, summary: "근교 톨레도 당일 투어" },
    ],
    budget: "1인 1일 평균 14~20만원(숙박·식비·교통 포함, 항공 제외)",
    transportation: "마드리드 바라하스공항에서 지하철·공항버스로 시내 진입",
    food: ["타파스", "코시도 마드릴레뇨", "츄러스 콘 초콜라테"],
    etiquette: [
      "점심·저녁 식사 시간이 한국보다 늦다(저녁은 보통 21시 이후)",
      "미술관 내부 촬영은 작품별로 허용 여부가 다르니 표지판을 확인한다",
      "축구 경기 관람 시 원정팀 응원 복장은 자제한다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "london",
    name: "런던",
    country: "영국",
    region: "overseas",
    themes: ["역사", "박물관", "도심"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/330px-London_Skyline_%28125508655%29.jpeg",
    heroImageAlt: "템스강을 따라 형성된 런던 도심 스카이라인",
    intro:
      "런던은 빅벤·타워브리지 등 전통적인 랜드마크와 세계적인 금융가가 공존하는 영국의 수도다. 대영박물관·내셔널 갤러리 등 유수의 박물관이 대부분 무료로 개방되어 있어 예술·역사 여행지로도 손색이 없다. 날씨 변화가 잦아 우산이나 방수 재킷을 챙기는 것이 좋으며, 웨스트엔드 뮤지컬 관람도 대표적인 여행 콘텐츠다. 오이스터 카드 한 장이면 튜브·버스·오버그라운드를 요금 상한 안에서 자유롭게 이용할 수 있다. 대영박물관·내셔널 갤러리 등 국공립 박물관 상당수가 상시 무료 입장을 유지하고 있다. 히스로공항에서 시내까지는 익스프레스 열차로 15분이면 도착할 수 있다.",
    attractions: [
      "빅벤·국회의사당",
      "타워브리지",
      "대영박물관",
      "버킹엄 궁전",
      "런던 아이",
    ],
    itineraryOneDay: [
      "오전 대영박물관 관람",
      "점심 피시 앤 칩스",
      "오후 빅벤·버킹엄 궁전",
      "저녁 런던 아이·템스강 야경",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "웨스트민스터·빅벤 등 정치·역사 코스" },
      { day: 2, summary: "대영박물관·내셔널 갤러리 등 박물관 코스" },
      { day: 3, summary: "타워브리지·런던 아이와 웨스트엔드 뮤지컬" },
    ],
    budget: "1인 1일 평균 18~26만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "히스로/개트윅공항에서 익스프레스 열차로 시내 진입, 이후 튜브(지하철) 이용",
    food: ["피시 앤 칩스", "선데이 로스트", "애프터눈 티"],
    etiquette: [
      "지하철 에스컬레이터에서는 오른쪽으로 서서 왼쪽을 비워 둔다",
      "펍에서는 테이블 주문보다 바 카운터에서 직접 주문·결제하는 경우가 많다",
      "줄 서기(큐잉) 문화를 철저히 지킨다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "edinburgh",
    name: "에든버러",
    country: "영국",
    region: "overseas",
    themes: ["역사", "축제", "고성"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Skyline_of_Edinburgh.jpg/330px-Skyline_of_Edinburgh.jpg",
    heroImageAlt: "에든버러 성이 보이는 구시가지 스카이라인",
    intro:
      "에든버러는 스코틀랜드의 수도로, 언덕 위 에든버러 성과 중세 골목이 그대로 남은 구시가지가 특징이다. 매년 여름 열리는 에든버러 프린지 페스티벌은 세계 최대 규모의 공연 예술 축제로, 이 시기에는 도시 전체가 무대가 된다. 로열 마일을 따라 걷는 도보 여행과 위스키 시음 체험이 대표적인 여행 콘텐츠다. 런던에서 기차로 4시간 남짓이면 도착해 영국 종단 여행의 마지막 코스로도 자주 선택된다. 에든버러공항에서 시내까지는 트램으로 약 35분이 소요된다. 성 아래 지하 통로(볼트)를 둘러보는 유령 투어도 현지에서 인기 있는 야간 프로그램이다.",
    attractions: [
      "에든버러 성",
      "로열 마일",
      "아서스 시트",
      "홀리루드 궁전",
      "칼튼 힐",
    ],
    itineraryOneDay: [
      "오전 에든버러 성 관람",
      "점심 스코틀랜드식 전통 음식",
      "오후 로열 마일 도보 투어",
      "저녁 칼튼 힐 야경",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "에든버러 성·로열 마일 구시가지 코스" },
      { day: 2, summary: "아서스 시트 트레킹과 홀리루드 궁전" },
      { day: 3, summary: "위스키 증류소 투어와 칼튼 힐 전망" },
    ],
    budget: "1인 1일 평균 15~22만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "에든버러공항에서 트램·버스로 시내 진입, 구시가지는 도보 위주로 이동",
    food: ["해기스", "피시 앤 칩스", "스코티시 위스키"],
    etiquette: [
      "아서스 시트 등반 시 변화무쌍한 날씨에 대비한 방한·방수 복장을 갖춘다",
      "성·궁전 내부 촬영은 구역별로 허용 여부가 다르다",
      "프린지 페스티벌 기간에는 공연장 예약을 서두른다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "berlin",
    name: "베를린",
    country: "독일",
    region: "overseas",
    themes: ["역사", "예술", "야경"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Museumsinsel_Berlin_Juli_2021_1_%28cropped%29_b.jpg/330px-Museumsinsel_Berlin_Juli_2021_1_%28cropped%29_b.jpg",
    heroImageAlt: "슈프레강 위 박물관섬(무제움스인젤) 전경",
    intro:
      "베를린은 냉전 시대 분단의 상징 브란덴부르크 문과 베를린 장벽, 세계적인 박물관이 모인 박물관섬을 함께 품은 독일의 수도다. 현대사와 예술이 공존하는 도시답게 스트리트 아트와 전위적인 클럽 문화도 함께 발달했다. 대중교통이 잘 갖춰져 있어 자전거·트램으로 다니기 좋은 도시로도 꼽힌다. 다른 서유럽 도시보다 물가가 저렴한 편이라 예산을 아끼려는 배낭여행객에게도 인기가 많다. 브란덴부르크공항에서 급행열차로 30분이면 시내에 도착할 수 있다. 주말이면 시내 곳곳에서 벼룩시장이 열려 빈티지 소품과 레코드판을 구경하는 재미도 쏠쏠하며, 저녁에는 강변을 따라 산책하기도 좋다.",
    attractions: [
      "브란덴부르크 문",
      "베를린 장벽 기념공원",
      "박물관섬",
      "체크포인트 찰리",
      "이스트사이드 갤러리",
    ],
    itineraryOneDay: [
      "오전 브란덴부르크 문·국회의사당",
      "점심 커리부어스트",
      "오후 박물관섬 관람",
      "저녁 이스트사이드 갤러리",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "브란덴부르크 문·박물관섬 등 도심 코스" },
      { day: 2, summary: "베를린 장벽·체크포인트 찰리 등 냉전사 코스" },
      {
        day: 3,
        summary: "이스트사이드 갤러리와 크로이츠베르크 스트리트 아트 코스",
      },
    ],
    budget: "1인 1일 평균 13~19만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "베를린 브란덴부르크공항에서 급행열차로 시내 진입, 이후 U반·S반 이용",
    food: ["커리부어스트", "되너 케밥", "프레첼"],
    etiquette: [
      "홀로코스트 추모비 등 역사 시설에서는 소음·장난스러운 행동을 삼간다",
      "대중교통 승차권은 탑승 전 개찰(펀칭)이 필요한 경우가 많다",
      "일요일에는 대부분 상점이 문을 닫는다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "munich",
    name: "뮌헨",
    country: "독일",
    region: "overseas",
    themes: ["맥주축제", "역사", "미식"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/330px-Stadtbild_M%C3%BCnchen.jpg",
    heroImageAlt: "첨탑과 광장이 보이는 뮌헨 시가지 전경",
    intro:
      "뮌헨은 매년 가을 열리는 세계 최대 맥주 축제 옥토버페스트로 유명한 바이에른주의 주도다. 마리엔 광장의 화려한 시청사와 인형극 시계, 영국식 정원(잉글리셔 가르텐)의 서핑 명소까지 전통과 여유가 공존한다. 근교 노이슈반슈타인 성으로의 당일치기 여행지로도 훌륭한 거점 도시다. 뮌헨공항에서 시내까지 S반으로 40분 남짓이면 이동할 수 있어 접근성도 좋은 편이다. 매년 가을이면 마리엔 광장 일대에도 옥토버페스트 분위기가 번져 도심 전체가 활기를 띤다. 인형극 시계(글로켄슈필)는 매일 정해진 시간에 맞춰 인형들이 움직이는 짧은 공연을 선보인다.",
    attractions: [
      "마리엔 광장",
      "노이에스 라트하우스(신 시청사)",
      "영국식 정원",
      "님펜부르크 궁전",
      "호프브로이하우스",
    ],
    itineraryOneDay: [
      "오전 마리엔 광장·신 시청사",
      "점심 학세(독일식 족발)",
      "오후 영국식 정원 산책",
      "저녁 호프브로이하우스 맥주",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "마리엔 광장·님펜부르크 궁전 도심 코스" },
      { day: 2, summary: "노이슈반슈타인 성 근교 당일 투어" },
      { day: 3, summary: "영국식 정원과 전통 맥주홀 투어" },
    ],
    budget: "1인 1일 평균 14~20만원(숙박·식비·교통 포함, 항공 제외)",
    transportation: "뮌헨공항에서 S반으로 시내 진입, 이후 U반·트램 이용",
    food: ["학세", "바이스부어스트", "프레첼"],
    etiquette: [
      "옥토버페스트 등 맥주 축제 기간에는 좌석 예약이 필수에 가깝다",
      "맥주홀에서는 건배 시 반드시 서로 눈을 맞춘다",
      "교회·궁전 내부에서는 정숙을 유지한다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "new-york",
    name: "뉴욕",
    country: "미국",
    region: "overseas",
    themes: ["도심", "쇼핑", "예술"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/330px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg",
    heroImageAlt: "록펠러 센터에서 바라본 엠파이어 스테이트 빌딩",
    intro:
      "뉴욕은 자유의 여신상·타임스퀘어·센트럴파크 등 세계적으로 상징적인 랜드마크가 모인 미국 최대 도시다. 브로드웨이 뮤지컬과 세계 각국 음식을 맛볼 수 있는 다양한 레스토랑, 현대미술관(MoMA)·메트로폴리탄 미술관 등 문화 인프라가 압도적으로 풍부하다. 도보와 지하철만으로도 대부분의 명소를 효율적으로 돌아볼 수 있는 도시다. 맨해튼·브루클린·퀸즈 등 자치구마다 분위기가 확연히 달라 며칠을 머물러도 지루하지 않다. JFK공항에서 시내까지는 에어트레인과 지하철을 연계해 이동하는 것이 일반적이다. 하이라인 파크를 따라 걸으면 옛 철로 위에서 도심 풍경을 색다르게 감상할 수 있다.",
    attractions: [
      "타임스퀘어",
      "센트럴파크",
      "자유의 여신상",
      "엠파이어 스테이트 빌딩",
      "메트로폴리탄 미술관",
    ],
    itineraryOneDay: [
      "오전 자유의 여신상 페리 투어",
      "점심 뉴욕 델리 샌드위치",
      "오후 센트럴파크·메트로폴리탄 미술관",
      "저녁 타임스퀘어·브로드웨이 뮤지컬",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "자유의 여신상·월스트리트 등 로어 맨해튼 코스" },
      { day: 2, summary: "센트럴파크·메트로폴리탄 미술관 등 미드타운 코스" },
      { day: 3, summary: "타임스퀘어·브로드웨이 뮤지컬과 야경" },
    ],
    budget: "1인 1일 평균 20~30만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "JFK/뉴어크공항에서 에어트레인·지하철로 시내 진입, 이후 지하철(서브웨이) 이용",
    food: ["뉴욕 스타일 피자", "베이글", "델리 파스트라미 샌드위치"],
    etiquette: [
      "레스토랑·택시 이용 시 15~20% 팁이 관례다",
      "지하철 혼잡 시간대(출퇴근)에는 큰 캐리어 이동을 피한다",
      "공공장소 음주는 금지되어 있다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "los-angeles",
    name: "로스앤젤레스",
    country: "미국",
    region: "overseas",
    themes: ["해변", "엔터테인먼트", "드라이브"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Hollywood_sign_%288485145044%29.jpg/330px-Hollywood_sign_%288485145044%29.jpg",
    heroImageAlt: "언덕 위에 세워진 할리우드 사인",
    intro:
      "로스앤젤레스는 할리우드로 대표되는 세계 영화·엔터테인먼트 산업의 중심지이자, 산타모니카·베니스비치 등 서핑 문화가 발달한 해변 도시이기도 하다. 도시가 넓게 펼쳐져 있어 대중교통보다 렌터카로 이동하는 여행객이 많으며, 유니버설 스튜디오 할리우드·디즈니랜드 등 테마파크도 인기 코스다. 사계절 온화한 날씨 덕분에 언제 방문해도 야외 활동을 즐기기 좋다. 다양한 인종과 문화가 어우러진 도시답게 코리아타운을 비롯한 세계 각국의 음식 거리도 풍부하다. LAX공항에서 시내까지는 렌터카나 라이드셰어 서비스를 주로 이용한다. 그리피스 천문대에 오르면 할리우드 사인과 도심 야경을 한눈에 담을 수 있다.",
    attractions: [
      "할리우드 사인·할리우드 대로",
      "산타모니카 피어",
      "게티 센터",
      "베니스비치",
      "유니버설 스튜디오 할리우드",
    ],
    itineraryOneDay: [
      "오전 할리우드 대로·명예의 거리",
      "점심 푸드트럭 타코",
      "오후 게티 센터 관람",
      "저녁 산타모니카 피어 선셋",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "할리우드·그리피스 천문대 등 도심 전망 코스" },
      { day: 2, summary: "유니버설 스튜디오 할리우드 종일 코스" },
      { day: 3, summary: "산타모니카·베니스비치 해안 드라이브 코스" },
    ],
    budget: "1인 1일 평균 18~28만원(숙박·식비·렌터카 포함, 항공 제외)",
    transportation:
      "LAX공항에서 렌터카 픽업 후 프리웨이로 이동(대중교통만으로는 이동이 제한적)",
    food: ["푸드트럭 타코", "인앤아웃 버거", "코리아타운 바비큐"],
    etiquette: [
      "렌터카 이용 시 프리웨이 합류·차선 변경에 미리 대비한다",
      "해변에서는 지정 주차 구역과 시간을 지킨다",
      "레스토랑 팁 문화(15~20%)는 뉴욕과 동일하게 적용된다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "sydney",
    name: "시드니",
    country: "호주",
    region: "overseas",
    themes: ["항구", "해변", "야경"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/330px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg",
    heroImageAlt: "노을 지는 하늘 아래 시드니 오페라하우스와 하버브리지",
    intro:
      "시드니는 오페라하우스와 하버브리지가 만들어내는 항구 전경으로 유명한 호주 최대 도시다. 본다이비치 등 도심에서 가까운 해변에서 서핑을 즐기거나, 항구를 가로지르는 페리를 타고 맨리비치로 이동하는 코스가 인기다. 남반구에 위치해 계절이 한국과 반대이므로 여행 시기를 계획할 때 유의해야 한다. 오페라하우스 내부 투어를 예약하면 공연장 무대 뒤편까지 둘러볼 수 있어 만족도가 높다. 시드니공항에서 시내까지 열차로 15분 안팎이면 도착할 정도로 접근성이 뛰어나다. 페리를 타고 맨리비치로 이동하는 40분 남짓 항로 자체도 훌륭한 관광 코스다.",
    attractions: [
      "시드니 오페라하우스",
      "하버브리지",
      "본다이비치",
      "달링하버",
      "로열 보태닉 가든",
    ],
    itineraryOneDay: [
      "오전 오페라하우스·로열 보태닉 가든",
      "점심 항구 근처 시푸드",
      "오후 본다이비치",
      "저녁 달링하버 야경",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "오페라하우스·하버브리지 등 항구 코스" },
      { day: 2, summary: "본다이비치·쿠지비치 해안 산책 코스" },
      { day: 3, summary: "블루마운틴 근교 당일 투어" },
    ],
    budget: "1인 1일 평균 18~26만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "시드니공항에서 열차로 시내 진입, 이후 트레인·페리·경전철 이용",
    food: ["피시 앤 칩스", "미트파이", "플랫화이트 커피"],
    etiquette: [
      "해변에서는 안전 요원이 지정한 깃발 구역 안에서만 수영한다",
      "자외선이 강해 자외선 차단제를 수시로 덧바른다",
      "대중교통은 교통카드(오파카드 등) 탭온·탭오프가 필수다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "melbourne",
    name: "멜버른",
    country: "호주",
    region: "overseas",
    themes: ["카페", "예술", "도심"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Melbourne_skyline_sor.jpg/330px-Melbourne_skyline_sor.jpg",
    heroImageAlt: "야라강 너머로 보이는 멜버른 도심 스카이라인",
    intro:
      "멜버른은 세계적인 커피 문화와 골목 아트(레인웨이 스트리트 아트)로 유명한 호주 제2의 도시다. 트램을 타고 도심을 이동하며 빅토리아 시장, 페더레이션 스퀘어 등을 둘러볼 수 있고, 근교 그레이트 오션 로드는 자동차 여행으로 손꼽히는 절경 드라이브 코스다. 하루에도 날씨가 자주 바뀌는 것으로 유명해 겹쳐 입을 수 있는 옷차림이 필요하다. 세계 3대 커피 도시로 꼽힐 만큼 골목마다 개성 있는 스페셜티 커피숍이 자리하고 있다. 멜버른공항에서 시내까지는 스카이버스로 20분 남짓이면 이동할 수 있다. 무료 순환 트램(시티서클)을 타면 주요 명소를 부담 없이 오갈 수 있다.",
    attractions: [
      "페더레이션 스퀘어",
      "호시어 레인(스트리트 아트)",
      "빅토리아 시장",
      "야라강 산책로",
      "세인트 킬다 비치",
    ],
    itineraryOneDay: [
      "오전 페더레이션 스퀘어·호시어 레인",
      "점심 빅토리아 시장 델리",
      "오후 야라강 산책",
      "저녁 세인트 킬다 비치 선셋",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "도심 트램 투어와 스트리트 아트 코스" },
      { day: 2, summary: "그레이트 오션 로드 당일 드라이브 투어" },
      { day: 3, summary: "빅토리아 시장·세인트 킬다 비치 코스" },
    ],
    budget: "1인 1일 평균 17~24만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "멜버른공항에서 스카이버스로 시내 진입, 도심은 무료 순환 트램(시티서클) 이용",
    food: ["플랫화이트 커피", "미트파이", "빅토리아 시장 델리 음식"],
    etiquette: [
      "카페마다 개성이 강해 직원 추천 메뉴를 물어보는 것도 좋은 방법이다",
      "스트리트 아트 구역은 합법 낙서 구역과 그렇지 않은 구역이 구분된다",
      "트램 탑승 시 정차역에서 순서대로 승하차한다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "istanbul",
    name: "이스탄불",
    country: "튀르키예",
    region: "overseas",
    themes: ["역사", "시장", "문화"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Historical_peninsula_and_modern_skyline_of_Istanbul.jpg/330px-Historical_peninsula_and_modern_skyline_of_Istanbul.jpg",
    heroImageAlt: "보스포루스 해협을 사이에 둔 이스탄불 신구 시가지 전경",
    intro:
      "이스탄불은 아시아와 유럽 대륙에 걸쳐 있는 유일한 도시로, 비잔틴 제국과 오스만 제국의 유산이 켜켜이 쌓여 있다. 아야소피아·블루모스크 등 거대한 예배당과 그랜드 바자르의 활기찬 시장 문화가 대표적인 볼거리이며, 보스포루스 해협 유람선 투어에서는 두 대륙을 동시에 조망할 수 있다. 튀르키예 커피와 케밥 등 풍부한 미식 문화도 여행의 큰 즐거움이다. 유럽 지구와 아시아 지구를 잇는 트램·페리 노선이 촘촘해 하루 만에 두 대륙을 오가는 경험도 가능하다. 이스탄불공항에서 시내까지는 공항버스나 메트로로 약 40분이 소요된다. 향신료 시장(이집션 바자르)에서는 각종 향신료와 튀르키예 딜라이트를 시식하며 고를 수 있다.",
    attractions: [
      "아야소피아",
      "블루모스크",
      "그랜드 바자르",
      "톱카프 궁전",
      "보스포루스 해협 유람선",
    ],
    itineraryOneDay: [
      "오전 아야소피아·블루모스크 관람",
      "점심 케밥",
      "오후 그랜드 바자르 쇼핑",
      "저녁 보스포루스 해협 유람선",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "아야소피아·블루모스크·톱카프 궁전 등 구시가지 코스" },
      { day: 2, summary: "그랜드 바자르·향신료 시장 쇼핑 코스" },
      { day: 3, summary: "보스포루스 해협 유람선과 아시아 지구 탐방" },
    ],
    budget: "1인 1일 평균 9~14만원(숙박·식비·교통 포함, 항공 제외)",
    transportation:
      "이스탄불공항에서 메트로·공항버스로 시내 진입, 이후 트램·페리 이용",
    food: ["케밥", "튀르키예식 아침식사(카흐발트)", "바클라바"],
    etiquette: [
      "모스크 방문 시 신발을 벗고 여성은 머리를 가려야 한다",
      "시장에서는 가격 흥정이 자연스러운 문화다",
      "라마단 기간에는 주간 공공장소 음식 섭취를 삼가는 것이 예의다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "cappadocia",
    name: "카파도키아",
    country: "튀르키예",
    region: "overseas",
    themes: ["자연", "열기구", "동굴"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Cappadocia_balloon_trip%2C_Ortahisar_Castle_%2811893715185%29.jpg/330px-Cappadocia_balloon_trip%2C_Ortahisar_Castle_%2811893715185%29.jpg",
    heroImageAlt: "오르타히사르 성 위로 열기구가 떠 있는 카파도키아 풍경",
    intro:
      '카파도키아는 화산재가 오랜 세월 침식되어 형성된 기묘한 바위 지형 "요정의 굴뚝"으로 유명한 튀르키예 중부 내륙 지역이다. 일출과 함께 수백 개의 열기구가 하늘을 수놓는 장관은 세계적인 버킷리스트 명물로 꼽히며, 바위를 파서 만든 동굴 호텔에서의 숙박도 독특한 경험이다. 지하도시 데린쿠유, 괴레메 야외박물관 등 기독교 초기 역사 유적도 풍부하다. 일교차가 크고 건조한 사막성 기후이므로 계절에 관계없이 겉옷을 챙기는 것이 좋다. 카이세리·네브셰히르 두 공항 모두 이스탄불에서 국내선으로 1시간 남짓이면 도착한다. 열기구 탑승 후에는 샴페인과 인증서를 받는 것이 현지 투어의 일반적인 관례다.',
    attractions: [
      "괴레메 야외박물관",
      "열기구 투어",
      "데린쿠유 지하도시",
      "우치히사르 성",
      "파샤바 계곡",
    ],
    itineraryOneDay: [
      "새벽 열기구 투어",
      "오전 괴레메 야외박물관",
      "오후 우치히사르 성·파샤바 계곡",
      "저녁 동굴 레스토랑 만찬",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "열기구 투어와 괴레메 야외박물관" },
      { day: 2, summary: "데린쿠유 지하도시·우치히사르 성 코스" },
      { day: 3, summary: "파샤바 계곡 트레킹과 동굴 호텔 체험" },
    ],
    budget: "1인 1일 평균 10~16만원(숙박·식비·열기구 투어 포함, 항공 제외)",
    transportation:
      "카이세리/네브셰히르공항에서 셔틀버스로 이동, 지역 내에는 투어 차량 이용이 일반적",
    food: [
      "테스티 케밥(항아리 케밥)",
      "만트(튀르키예식 만두)",
      "쿠루 파슬리예",
    ],
    etiquette: [
      "열기구 투어는 기상 상황에 따라 당일 취소될 수 있어 일정에 여유를 둔다",
      "지하도시 통로가 좁고 낮으니 폐소공포증이 있다면 사전 확인한다",
      "동굴 호텔은 예약 시 환기·습도 관련 안내를 미리 확인한다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "athens",
    name: "아테네",
    country: "그리스",
    region: "overseas",
    themes: ["역사", "유적", "미식"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Athens_Acropolis_at_Daybreak.jpg/330px-Athens_Acropolis_at_Daybreak.jpg",
    heroImageAlt: "동틀 무렵 아크로폴리스 언덕과 파르테논 신전",
    intro:
      "아테네는 서양 문명의 발상지로 불리는 그리스의 수도로, 아크로폴리스 언덕 위 파르테논 신전이 도시 어디서나 눈에 들어온다. 고대 아고라·아크로폴리스 박물관 등 유적이 도심 곳곳에 흩어져 있어 도보로 고대사 여행이 가능하며, 플라카 지구의 전통 골목과 타베르나(그리스식 식당) 문화도 즐길 거리다. 여름은 매우 더워 이른 아침 관람을 권장한다. 피레우스 항구에서 산토리니·미코노스 등 에게해 섬으로 향하는 페리가 매일 여러 편 운항된다. 아테네국제공항에서 시내까지는 메트로로 약 40분이 소요된다. 모나스티라키 광장 벼룩시장에서는 기념품과 골동품을 함께 구경할 수 있다.",
    attractions: [
      "아크로폴리스·파르테논 신전",
      "고대 아고라",
      "아크로폴리스 박물관",
      "플라카 지구",
      "신타그마 광장",
    ],
    itineraryOneDay: [
      "오전 아크로폴리스·파르테논 신전",
      "점심 플라카 지구 타베르나",
      "오후 아크로폴리스 박물관",
      "저녁 신타그마 광장 근위병 교대식",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "아크로폴리스·고대 아고라 등 유적 코스" },
      { day: 2, summary: "아크로폴리스 박물관·플라카 지구 코스" },
      { day: 3, summary: "근교 수니온곶 당일 투어" },
    ],
    budget: "1인 1일 평균 12~18만원(숙박·식비·교통 포함, 항공 제외)",
    transportation: "아테네국제공항에서 메트로·버스로 시내 진입",
    food: ["수블라키", "무사카", "그릭 샐러드"],
    etiquette: [
      "유적지는 여름철 폭염 시간대(낮 12~15시) 운영이 제한될 수 있다",
      "고대 유적의 돌·기둥에 올라서거나 손상시키지 않는다",
      "타베르나에서는 식사 후 천천히 대화를 나누는 문화가 일반적이다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "santorini",
    name: "산토리니",
    country: "그리스",
    region: "overseas",
    themes: ["섬", "해변", "야경"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Oia_sunset_-_panoramio_%282%29.jpg/330px-Oia_sunset_-_panoramio_%282%29.jpg",
    heroImageAlt: "산토리니 이아 마을의 하얀 건물과 석양 풍경",
    intro:
      "산토리니는 화산 폭발로 형성된 초승달 모양의 에게해 섬으로, 이아 마을의 새하얀 건물과 파란 지붕이 만들어내는 풍경이 세계적으로 유명하다. 칼데라(화산 분화구) 절벽 위에서 바라보는 석양은 전 세계 여행객이 손꼽는 장면이며, 피라 마을에서 이아 마을까지 이어지는 절벽 산책로도 인기가 많다. 성수기(6~9월)에는 항공·숙박 요금이 크게 오르므로 미리 예약하는 것이 좋다. 섬 특성상 계단과 경사로가 많아 큰 캐리어보다 가벼운 짐을 꾸리는 것이 이동에 유리하다. 아테네에서 페리로 약 5~8시간, 국내선 항공으로는 약 45분이 소요된다. 섬 내 이동은 버스나 ATV 렌트가 일반적이며 렌터카 예약도 가능하다.",
    attractions: [
      "이아 마을",
      "피라 마을",
      "칼데라 절벽 산책로",
      "붉은 해변(레드 비치)",
      "아크로티리 유적",
    ],
    itineraryOneDay: [
      "오전 피라 마을 산책",
      "점심 해산물 타베르나",
      "오후 칼데라 절벽 산책로",
      "저녁 이아 마을 석양 감상",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "피라 마을·칼데라 절벽 산책 코스" },
      { day: 2, summary: "붉은 해변·아크로티리 유적 코스" },
      { day: 3, summary: "이아 마을 석양 명소 집중 코스" },
    ],
    budget: "1인 1일 평균 18~28만원(숙박·식비·교통 포함, 항공·선박 요금 제외)",
    transportation:
      "산토리니공항 또는 아테네에서 페리 이용, 섬 내부는 버스·렌터카·ATV로 이동",
    food: ["그릭 샐러드", "파바(산토리니 콩 퓨레)", "해산물 요리"],
    etiquette: [
      "이아 마을 석양 명소는 일몰 1~2시간 전부터 자리가 채워진다",
      "좁은 골목 숙소는 캐리어 바퀴 소음에 유의한다",
      "절벽 산책로에서는 안전 펜스를 넘지 않는다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "reykjavik",
    name: "레이캬비크",
    country: "아이슬란드",
    region: "overseas",
    themes: ["자연", "오로라", "온천"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Reykjav%C3%ADk%2C_view_from_Hallgr%C3%ADmskirkja_%282%29.jpg/330px-Reykjav%C3%ADk%2C_view_from_Hallgr%C3%ADmskirkja_%282%29.jpg",
    heroImageAlt: "할그림스키르캬 교회에서 내려다본 레이캬비크 시가지",
    intro:
      "레이캬비크는 세계 최북단 수도로, 독특한 화산암 외관의 할그림스키르캬 교회가 도시의 상징이다. 도시 자체는 아담하지만 블루라군 온천, 골든서클(싱벨리어 국립공원·게이시르 간헐천·굴포스 폭포) 등 아이슬란드 자연을 만나는 거점 도시 역할을 한다. 겨울철(9~4월)에는 오로라 관측이, 여름철에는 백야 현상이 나타나는 것이 특징이다. 도시 규모가 작아 하루 이틀이면 충분히 둘러볼 수 있어 남부 자연 여행 전후의 거점으로 흔히 활용된다. 케플라비크국제공항에서 시내까지는 셔틀버스로 약 45분이 소요된다. 하르파 콘서트홀의 유리 외관은 밤이면 오로라를 연상케 하는 조명으로 물든다.",
    attractions: [
      "할그림스키르캬 교회",
      "하르파 콘서트홀",
      "블루라군 온천",
      "골든서클 투어",
      "레이캬비크 구시가지",
    ],
    itineraryOneDay: [
      "오전 할그림스키르캬·구시가지 산책",
      "점심 아이슬란드식 수프",
      "오후 블루라군 온천",
      "저녁 오로라 관측 투어(겨울철)",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "레이캬비크 구시가지·하르파 콘서트홀 코스" },
      { day: 2, summary: "골든서클(싱벨리어·게이시르·굴포스) 당일 투어" },
      { day: 3, summary: "블루라군 온천과 오로라 관측 투어" },
    ],
    budget: "1인 1일 평균 20~30만원(숙박·식비·투어 포함, 항공 제외)",
    transportation:
      "케플라비크국제공항에서 셔틀버스로 시내 진입, 근교 투어는 렌터카 또는 투어버스 이용",
    food: ["랑구스틴(랍스터 수프)", "아이슬란드식 핫도그", "스코르 요거트"],
    etiquette: [
      "온천·수영장 이용 전 반드시 비누 샤워를 해야 한다(현지 규정)",
      "오로라 투어는 날씨·구름에 따라 취소·재예약될 수 있다",
      "도로 밖 이끼·식생 지역은 밟지 않는다(회복에 수십 년이 걸린다)",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
  {
    id: "vik",
    name: "비크",
    country: "아이슬란드",
    region: "overseas",
    themes: ["자연", "해변", "빙하"],
    heroImageUrl:
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/V%C3%ADk_%C3%AD_M%C3%BDrdal%2C_Iceland.jpg/330px-V%C3%ADk_%C3%AD_M%C3%BDrdal%2C_Iceland.jpg",
    heroImageAlt: "검은 모래 해변 마을 비크 이 미르달 전경",
    intro:
      "비크(비크 이 미르달)는 아이슬란드 최남단 마을로, 레이니스퍄라 검은 모래 해변과 현무암 기둥이 만들어내는 이색적인 풍경으로 유명하다. 스코가포스·셀랴란즈포스 등 거대한 폭포와 빙하 지형이 가까이 있어 아이슬란드 남부 자연 여행의 핵심 거점으로 꼽힌다. 마을 규모는 작지만 주변 자연경관을 보기 위해 1박 이상 머무는 여행객이 많다. 링로드를 따라 남부 아이슬란드를 일주하는 여행자들에게 사실상 필수 경유지로 꼽힌다. 겨울철에는 폭설·결빙으로 도로가 통제될 수 있어 출발 전 도로 상황판(road.is)을 확인하는 것이 안전하다. 마을 언덕 위 작은 교회에서 내려다보는 검은 해변 전망도 놓치기 아까운 풍경이다.",
    attractions: [
      "레이니스퍄라 검은 모래 해변",
      "레이니스드랑가 현무암 기둥",
      "스코가포스 폭포",
      "셀랴란즈포스 폭포",
      "미르달스요쿨 빙하",
    ],
    itineraryOneDay: [
      "오전 스코가포스 폭포",
      "점심 마을 내 식당",
      "오후 레이니스퍄라 검은 모래 해변",
      "저녁 마을 전망대 일몰",
    ],
    itineraryThreeDay: [
      { day: 1, summary: "셀랴란즈포스·스코가포스 폭포 코스" },
      { day: 2, summary: "레이니스퍄라 해변·현무암 기둥 코스" },
      { day: 3, summary: "빙하 하이킹 또는 빙하호(요쿨살론) 당일 투어" },
    ],
    budget: "1인 1일 평균 19~28만원(숙박·식비·렌터카 포함, 항공 제외)",
    transportation:
      "레이캬비크에서 1번 순환도로(링로드)를 따라 렌터카로 약 2.5시간 이동",
    food: ["아이슬란드식 랍스터 수프", "구운 대구 요리", "스코르 요거트"],
    etiquette: [
      "검은 모래 해변은 이안류·너울성 파도가 위험해 파도와 거리를 둔다",
      "빙하 지역은 반드시 인증된 가이드 투어로만 접근한다",
      "겨울철 링로드 운전은 결빙·강풍에 대비해 속도를 크게 줄인다",
    ],
    source: SOURCE_OVERSEAS,
    updatedAt: UPDATED_AT,
  },
];

export const domesticDestinations = destinations.filter(
  (destination) => destination.region === "domestic",
);

export const overseasDestinations = destinations.filter(
  (destination) => destination.region === "overseas",
);
