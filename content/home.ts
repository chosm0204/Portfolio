import clueWorkbench from "@/public/img/clue-workbench.jpg";
import digitalBaeumteo from "@/public/img/digital-baeumteo.jpg";
import duduScreens from "@/public/img/dudu-screens.jpg";
import ipactPresent from "@/public/img/ipact-present.jpg";
import likelionSession from "@/public/img/likelion-session.jpg";
import profile from "@/public/img/profile.jpg";
import type { HomeContent } from "@/types/home";

/**
 * 홈 카피 정본.
 * 원본: `ARCHIVE/03_CONTENT/CONTENT.md`
 *
 * 2026-08-31 축소 — 한눈에 읽히지 않는다는 지적에 따라 본문 분량을 절반 가까이 줄였다.
 * 문장을 새로 쓰지 않고 기존 문장에서 핵심만 남겼다. 사실·수치·기여 경계는 그대로다.
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
      "조건과 예외가 흩어져 있으면, 분류 체계부터 만듭니다.",
      "규칙으로 걸러낼 것과 AI에 맡길 것을 나눕니다.",
      "그 결과를 사람이 원문과 대조할 화면까지 만듭니다.",
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
        body: "열정이 식어서 흐지부지되는 게 아닙니다. 도달할 지점을 문서로 먼저 정합니다.",
      },
      {
        title: "기준부터 세웁니다",
        body: "만들기 시작하면 판단이 흐려집니다. 손대기 전에 넣고 뺄 기준을 정합니다.",
      },
      {
        title: "쓰는 사람 입장에서 봅니다",
        body: "내가 편한 것과 쓰는 사람이 편한 것은 다릅니다. 짐작하지 않고 먼저 묻습니다.",
      },
      {
        title: "배워서 나눕니다",
        body: "혼자 빨라지면 병목은 내 뒤에 생깁니다. 배운 것은 정리해 팀에 공유합니다.",
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
    // 목록만으로는 수상 기록이 글자로만 남는다. 발표 현장 한 장을 근거로 붙인다.
    shot: {
      slot: "ipact-present",
      ratio: "3/2",
      placeholder: "[사진] IPACT 학술대회 논문 발표",
      caption: "IPACT 학술대회 발표 — 우선 검토 구간 선별을 위한 ACID 구조",
      image: {
        src: ipactPresent,
        alt: "학술대회에서 ACID 구조 설계 논문을 발표하는 모습",
        // 3/2 사진 상한 (Shot.module.css)
        maxWidth: 900,
      },
    },
  },

  selectedWork: {
    head: { id: "work", kicker: "SELECTED WORK", title: "대표 프로젝트" },
    items: [
      {
        id: "clue",
        title: "CLUE",
        summary:
          "자격 요건과 예외 조항이 흩어져 있어 무엇부터 볼지 알기 어려운 공공 공고문. 요약해 줄이는 대신, 원문을 그대로 둔 채 먼저 볼 구간만 골라내는 구조를 설계했습니다.",
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
          placeholder: "[사진 1] CLUE 3패널 워크벤치 — 원문 · 구조 복원 · ACID 검증",
          image: {
            src: clueWorkbench,
            alt: "CLUE 3패널 워크벤치 — 왼쪽 원본 PDF 뷰어, 가운데 구조 복원 문서, 오른쪽 ACID 검증 리스트",
            // 카드 안쪽 폭 = 1160 − 컨테이너 패딩 56 − 카드 패딩 72
            maxWidth: 1032,
          },
        },
        href: "/work/clue",
        moreLabel: "자세히 보기",
      },
      {
        id: "dudu",
        title: "DUDU",
        summary:
          "일주일 동안 한 번도 질문하지 않는 학생이 45%인 교실. 성격 문제가 아니라 환경 문제로 보고, 질문이 나올 수밖에 없는 구조를 설계했습니다.",
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
          slot: "dudu-screens",
          ratio: "3/2",
          placeholder: "[사진 3] DUDU 학생 질문 화면",
          image: {
            src: duduScreens,
            alt: "DUDU 학생 화면 — 궁금한 것을 고르고 누구에게 물을지 선택하는 흐름",
            // 카드 안쪽 폭 = 1160 − 컨테이너 패딩 56 − 카드 패딩 72
            maxWidth: 1032,
          },
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
            text: "1년 커리큘럼을 설계하고 HTML부터 TypeScript까지 14개 세션과 아이디어톤·해커톤을 운영했습니다. 무엇을 가르칠지보다 ",
          },
          { text: "무엇을 모르는지부터", strong: true },
          { text: " 확인하고 순서를 정했습니다." },
        ],
        shot: {
          slot: "likelion-session",
          // 확보한 원본이 1080×1440(3:4)이라 슬롯 비율을 세로로 바꿨다.
          ratio: "3/4",
          placeholder: "[사진 5] 멋사 세션 — 실습실 현장",
          image: {
            src: likelionSession,
            // 사진에 찍힌 그대로 적는다. 앞에서 설명하는 장면이 아니다.
            alt: "멋쟁이사자처럼 세션 — 실습실에서 노트북으로 실습하는 참가자들",
            // 3/4 사진 상한 (Shot.module.css)
            maxWidth: 480,
          },
        },
      },
      {
        title: "AI 디지털 배움터 · 바이브코딩 강의",
        body: [
          {
            text: "비전공자를 대상으로 3주 커리큘럼을 기획하고 진행합니다. ",
          },
          { text: "AI를 쓰는 법이 아니라 AI에게 일을 맡기는 법", strong: true },
          { text: "을 가르칩니다." },
        ],
        shot: {
          slot: "digital-baeumteo",
          ratio: "4/3",
          placeholder: "[사진 6] 배움터 바이브코딩 강의 현장",
          image: {
            src: digitalBaeumteo,
            alt: "AI 디지털 배움터 교육장에서 바이브코딩 강의를 진행하는 모습",
            // 4/3 사진 상한 (Shot.module.css)
            maxWidth: 800,
          },
        },
      },
      {
        title: "교내 튜터링 · 스터디",
        body: [
          {
            text: "팀원과 후배에게 HTML·CSS·JavaScript·React를 가르치고 수업 자료를 직접 만들었습니다.",
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
