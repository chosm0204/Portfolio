/**
 * 케이스 상세 콘텐츠 타입.
 * 카피 본문은 `content/cases/*.ts`에만 두고, 컴포넌트는 이 타입만 소비한다.
 * 마크업 기준: `ARCHIVE/04_IA_DESIGN/samples/case-clue.html` · `case-dudu.html`
 */

import type { RichLines, RichText, ShotSlot } from "@/types/home";

/** 인라인 SVG 다이어그램 식별자. 이미지 파일로 만들지 않는다. */
export type CaseDiagramId =
  /** CLUE — 전체 투입 방식과 2단계 방식 비교 */
  | "clue-decision"
  /** CLUE — ACID 2단계 파이프라인 세로 스텝 */
  | "clue-pipeline"
  /** DUDU — 기획 확장에서 수렴으로 */
  | "dudu-convergence";

/** 표 안에서만 쓰는 강조. `point`는 확정 수치, `sub`는 부연. */
export type CaseCellTone = "point" | "sub";

export type CaseTableColumn = {
  readonly label: string;
  /** `width:34%` 처럼 원본이 지정한 열 너비. */
  readonly width?: string;
};

export type CaseCell = {
  /** 한 칸 안에서 줄바꿈되는 내용. 대부분 한 줄이다. */
  readonly lines: RichLines;
  readonly tone?: CaseCellTone;
};

export type CaseTableRow = {
  readonly cells: readonly CaseCell[];
  /** 검토 끝에 고른 안. 배경을 `--pt-bg`로 채운다. */
  readonly pick?: boolean;
};

export type CaseTable = {
  readonly columns: readonly CaseTableColumn[];
  readonly rows: readonly CaseTableRow[];
};

/** 큰 지표 숫자 — 진입 시 카운트업 대상. */
export type CaseMetric = {
  /** 화면에 그대로 찍히는 값. 예: `73.1%` */
  readonly value: string;
  readonly label: string;
};

/** Before / After 막대. */
export type CaseBar = {
  readonly tag: string;
  /** 트랙 대비 채움 비율(%). */
  readonly percent: number;
  readonly value: string;
  /** Before 막대는 회색(`--dim`). */
  readonly dim?: boolean;
};

export type CaseChallenge = {
  readonly no: string;
  readonly title: string;
  readonly body: readonly RichText[];
  readonly note?: RichLines;
};

export type CaseLink = {
  readonly key: string;
  readonly value: string;
  readonly note?: string;
  readonly href?: string;
  readonly external?: boolean;
};

/**
 * 본문 블록. 원본 HTML의 요소 하나가 블록 하나에 대응한다.
 * 새 표현이 필요하면 종류를 늘리고, 컴포넌트 쪽에 임의 마크업을 넣지 않는다.
 */
export type CaseBlock =
  /** 지표 직전에 오는 한 문장. `case-clue.html`의 `.lead-q` */
  | { readonly kind: "leadQuestion"; readonly text: RichText }
  /** 섹션 첫 단락 — 본문보다 한 급 크다. `.lead` */
  | { readonly kind: "lead"; readonly text: RichText }
  | { readonly kind: "paragraph"; readonly text: RichText }
  /** 섹션 안 소제목. `spaced`는 원본의 `margin-top:44px`. */
  | { readonly kind: "heading"; readonly text: string; readonly spaced?: boolean }
  /** 판단을 박아 두는 인용 블록. `.note` */
  | {
      readonly kind: "note";
      readonly lines: RichLines;
      /** 원본이 크기를 키운 note. DUDU PRINCIPLE·LESSON */
      readonly emphasis?: "rule" | "lesson";
    }
  | { readonly kind: "list"; readonly items: RichLines }
  | { readonly kind: "table"; readonly table: CaseTable }
  | {
      readonly kind: "figure";
      readonly diagram: CaseDiagramId;
      readonly caption?: RichText;
    }
  /** 사진 자리. 파일이 없으면 자리표시자만 남는다. */
  | { readonly kind: "shot"; readonly shot: ShotSlot; readonly caption?: string }
  /** 큰 지표 + Before/After 막대. 진입 애니메이션은 이 블록에만 붙는다. */
  | {
      readonly kind: "metrics";
      readonly metrics: readonly CaseMetric[];
      readonly bars: readonly CaseBar[];
      readonly caption: string;
    }
  | { readonly kind: "challenges"; readonly items: readonly CaseChallenge[] }
  | { readonly kind: "links"; readonly items: readonly CaseLink[] };

export type CaseSection = {
  readonly id: string;
  /** 섹션 번호. 원본에서 번호가 없는 섹션(DUDU LESSON)은 비운다. */
  readonly no?: string;
  /** 영문 라벨. 예: `RESULT` */
  readonly kicker: string;
  /** 목차에 노출되는 국문 라벨. */
  readonly tocLabel: string;
  /** 국문 섹션 제목. RESULT처럼 제목 없이 시작하는 섹션은 비운다. */
  readonly title?: string;
  readonly blocks: readonly CaseBlock[];
};

export type CaseOverviewItem = {
  readonly label: string;
  readonly value: RichText;
};

export type CaseRole = {
  readonly text: string;
  /**
   * 팀과 공동으로 한 일. `--sub` 색으로 구분해 기여 경계를 표시한다.
   * 이 표기를 빼면 100% 본인 작업으로 읽힌다.
   */
  readonly shared?: boolean;
};

export type CaseContent = {
  /** `content/home.ts`의 Selected Work 항목 id와 같다. */
  readonly id: string;
  /** 상단 라벨. 예: `CASE 01` */
  readonly caseLabel: string;
  readonly title: string;
  readonly oneline: RichLines;
  readonly overview: readonly CaseOverviewItem[];
  readonly roleLabel: string;
  readonly roles: readonly CaseRole[];
  readonly tocLabel: string;
  readonly tocTitle: string;
  readonly backLabel: string;
  readonly backHref: string;
  readonly sections: readonly CaseSection[];
};
