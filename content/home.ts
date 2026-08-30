import likelionSession from "@/public/img/likelion-session.jpg";
import profile from "@/public/img/profile.jpg";
import type { HomeContent } from "@/types/home";

/**
 * 홈 카피 정본.
 * 원본: `ARCHIVE/03_CONTENT/CONTENT.md` — 문장을 임의로 바꾸지 않는다.
 * 마크업 기준: `ARCHIVE/04_IA_DESIGN/samples/home-full.html`
 */
export const home: HomeContent = {
  hero: {
    lines: [
      "짐작으로 만들지 않습니다.",
      "기준을 먼저 정하고, 만든 뒤에는 얼마나 나아졌는지 검증합니다.",
    ],
    identity: "조승민 · 프론트엔드 · AI",
    portrait: {
      src: profile,
      alt: "조승민",
    },
  },

  about: {
    head: { id: "about", kicker: "ABOUT", title: "소개" },
    lines: [
      "조건과 예외가 여러 곳에 흩어져 있으면, 먼저 분류 체계부터 만듭니다.",
      "규칙으로 걸러낼 것과 AI에 맡길 것을 나누고,",
      "그 결과를 사람이 원문과 대조해 확인할 수 있는 화면까지 만듭니다.",
    ],
    proof: [
      { text: "그렇게 설계한 구조로 " },
      { text: "학술지에 논문을 실었고", strong: true },
      { text: ", 지금은 대학과 기관에서 " },
      { text: "AI 활용을 가르칩니다", strong: true },
      { text: "." },
    ],
  },

  principles: {
    head: { id: "principles", kicker: "PRINCIPLES", title: "일하는 기준" },
    items: [
      {
        title: "끝까지 갑니다",
        body: "프로젝트가 흐지부지되는 이유는 열정이 식어서가 아니라, 어디까지 가기로 했는지 아무도 적어두지 않았기 때문이라고 생각합니다. 그래서 저는 시작할 때 도달할 지점을 문서로 먼저 정하고, 진행하면서 그 문서를 계속 고쳐 나갑니다. 기록이 남아 있으면 중간에 방향이 바뀌어도 일이 끊기지 않습니다.",
      },
      {
        title: "기준부터 세웁니다",
        body: "만들기 시작하면 판단이 흐려집니다. 들인 시간이 아까워서 빼야 할 것을 그대로 두게 됩니다. 그래서 저는 손대기 전에 무엇을 넣고 무엇을 뺄지 기준부터 정해둡니다. 중요한 건 좋은 아이디어를 많이 내는 게 아니라, 덜어낼 근거를 미리 갖는 것이라고 생각합니다.",
      },
      {
        title: "쓰는 사람 입장에서 봅니다",
        body: "내가 편한 것과 쓰는 사람이 편한 것은 자주 다릅니다. 사용자가 나와 다른 사람일수록 직관은 더 크게 빗나갑니다. 그래서 저는 짐작으로 정하지 않고 실제로 쓸 사람에게 먼저 묻습니다. 좋은 설계는 내가 잘 아는 데서 나오는 게 아니라, 내가 모른다는 걸 인정하는 데서 시작합니다.",
      },
      {
        title: "배워서 나눕니다",
        body: "혼자 빨라지는 것은 팀에서 의미가 없습니다. 한 사람만 앞서 나가면 병목은 그 사람 뒤에 생깁니다. 그래서 저는 새로 배운 것을 정리해 팀에 공유합니다. 팀을 이끄는 건 가장 잘하는 사람이 아니라, 모두가 같은 속도로 갈 수 있게 만드는 사람이라고 생각합니다.",
      },
    ],
  },

  timeline: {
    head: { id: "timeline", kicker: "TIMELINE", title: "기록" },
    years: [
      {
        year: "2021",
        entries: [{ label: "학과 경진대회 장려상" }],
      },
      {
        year: "2022",
        entries: [{ label: "학과 경진대회 우수상 · 최우수상" }],
      },
      {
        year: "2025",
        entries: [
          { label: "멋쟁이사자처럼 13기 프론트엔드 수료" },
          { label: "학과 경진대회 특별상", lineage: "DUDU" },
          { label: "IAAI CDC 은상", lineage: "TOTTO" },
          { label: "교내 튜터링 우수상" },
        ],
      },
      {
        year: "2026",
        entries: [
          { label: "멋쟁이사자처럼 14기 대표" },
          { label: "한이음 드림업 선정", lineage: "CLUE" },
          { label: "학과 경진대회 대상", lineage: "CLUE" },
          { label: "IPACT 우수논문상", lineage: "CLUE 논문" },
          { label: "JCCT 논문 게재", lineage: "CLUE 논문" },
          { label: "학생연구 선정", lineage: "CLUE 후속 연구" },
          { label: "AI 디지털 배움터 강의 시작" },
        ],
      },
    ],
  },

  selectedWork: {
    head: { id: "work", kicker: "SELECTED WORK", title: "대표 프로젝트" },
    items: [
      {
        id: "clue",
        title: "CLUE",
        summary:
          "자격 요건과 예외 조항이 문서 곳곳에 흩어져 있어, 지원자가 무엇부터 확인해야 할지 알기 어려운 공공 공고문. 요약해서 줄이는 대신, 원문을 그대로 둔 채 먼저 볼 구간만 골라내는 구조를 설계했습니다.",
        badges: [
          { label: "공공정책", kind: "concept" },
          { label: "청년 지원", kind: "concept" },
          { label: "문서 독해 지원", kind: "concept" },
          { label: "React", kind: "tech" },
          { label: "Node.js", kind: "tech" },
          { label: "Gemini API", kind: "tech" },
        ],
        role: "기획 총괄 · 구조 설계 · 프론트엔드 · 논문 제1저자 · 4인",
        shot: {
          slot: "clue-workbench",
          ratio: "16/9",
          placeholder:
            "[사진 1] CLUE 3패널 워크벤치 — 원문 · 구조복원 · 검증 리스트",
        },
        href: "/work/clue",
        moreLabel: "자세히 보기",
      },
      {
        id: "dudu",
        title: "DUDU",
        summary:
          "일주일 동안 한 번도 질문하지 않는 학생이 45%인 교실. 질문을 못 하는 것을 아이의 성격 문제가 아니라 환경의 문제로 보고, 질문이 나올 수밖에 없는 구조를 설계했습니다.",
        badges: [
          { label: "에듀테크", kind: "concept" },
          { label: "초등 교육", kind: "concept" },
          { label: "교실 학습 도구", kind: "concept" },
          { label: "React", kind: "tech" },
          { label: "Vite", kind: "tech" },
          { label: "Tailwind CSS", kind: "tech" },
        ],
        role: "팀 리더 · 기획 · 프론트엔드 · 5인",
        shot: {
          slot: "dudu-dashboard",
          ratio: "16/9",
          placeholder: "[사진 3·4] DUDU 교사 대시보드 / 학생 화면",
        },
        href: "/work/dudu",
        moreLabel: "자세히 보기",
      },
    ],
  },

  teaching: {
    head: { id: "teaching", kicker: "TEACHING", title: "교육 · 운영" },
    items: [
      {
        title: "멋쟁이사자처럼 14기 대표",
        body: [
          {
            text: "전국 대학 연합 IT 동아리의 교내 조직을 맡아 1년 커리큘럼을 설계했습니다. HTML부터 TypeScript까지 14개 세션을 직접 구성하고, 아이디어톤과 해커톤을 운영했습니다. 무엇을 가르칠지보다 ",
          },
          { text: "무엇을 모르는지부터", strong: true },
          { text: " 확인하고 순서를 정했습니다." },
        ],
        shot: {
          slot: "likelion-session",
          // 확보한 원본이 1080×1440(3:4)이라 슬롯 비율을 세로로 바꿨다.
          ratio: "3/4",
          placeholder: "[사진 5] 멋사 세션 진행 — 앞에서 설명하는 모습",
          image: {
            src: likelionSession,
            alt: "멋쟁이사자처럼 세션에서 앞에 서서 설명하는 모습",
            maxWidth: 420,
          },
        },
      },
      {
        title: "AI 디지털 배움터 · 바이브코딩 강의",
        body: [
          {
            text: "비전공자를 대상으로 3주 커리큘럼을 기획하고 진행합니다. 첫 주에 화면을 만들고, 둘째 주에 문제를 정해 최소 기능만 만들고, 셋째 주에 배포합니다. ",
          },
          { text: "AI를 쓰는 법이 아니라 AI에게 일을 맡기는 법", strong: true },
          { text: "을 가르칩니다." },
        ],
        shot: {
          slot: "digital-baeumteo",
          ratio: "4/3",
          placeholder: "[사진 6] 배움터 바이브코딩 강의 현장",
        },
      },
      {
        title: "교내 튜터링 · 스터디",
        body: [
          {
            text: "팀원과 후배에게 HTML·CSS·JavaScript·React를 가르치고 수업 자료를 직접 만들었습니다. 튜터링 우수상.",
          },
        ],
      },
    ],
  },

  contact: {
    id: "contact",
    kicker: "CONTACT",
    heading: "더 큰 것에서 검증해보고 싶습니다.",
    body: "지금까지 제가 확인한 규모는 공고문 5종, 교실 한 곳, 4~5명 팀이었습니다. 기준을 세우고 결과를 확인하는 방식은 익혔지만, 그 방식이 더 큰 서비스에서도 통하는지는 아직 겪어보지 못했습니다.",
    push: "더 많은 사용자와 더 복잡한 문제 앞에서 같은 일을 해보고 싶습니다.",
    navLabel: "연락처",
    links: [
      {
        key: "이메일",
        value: "choseung1234@naver.com",
        href: "mailto:choseung1234@naver.com",
      },
      {
        key: "GitHub",
        value: "github.com/chosm0204",
        href: "https://github.com/chosm0204",
        external: true,
      },
      {
        key: "알고리즘 기록",
        value: "chodding.tistory.com",
        href: "https://chodding.tistory.com",
        note: "프로그래머스 풀이 36편",
        external: true,
      },
      {
        key: "전화",
        // 봇 스크래핑 방지 — 조각으로만 둔다. 조립은 `PhoneLink`가 브라우저에서 한다.
        phoneParts: ["010", "9565", "7199"],
      },
    ],
  },

  footer: "© 2026 조승민",
};
