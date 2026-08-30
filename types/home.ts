import type { StaticImageData } from "next/image";

/**
 * 홈 화면 콘텐츠 타입.
 * 카피 본문은 `content/home.ts`에만 두고, 컴포넌트는 이 타입만 소비한다.
 * 케이스 상세는 같은 방식으로 `types/case.ts` + `content/cases/*.ts`가 담당한다.
 */

/** `<strong>`으로 강조할 구간을 표현하기 위한 최소 리치 텍스트 단위. */
export type TextSegment = {
  readonly text: string;
  readonly strong?: boolean;
  /** 숫자·코드 — 등폭 글꼴로 뽑는다. */
  readonly mono?: boolean;
  /** 보조 정보 — `--sub` 색으로 한 단계 눅인다. */
  readonly sub?: boolean;
};

export type RichText = readonly TextSegment[];

/** 줄바꿈으로 이어 붙이는 여러 줄. 원본 마크업의 `<br>`에 대응한다. */
export type RichLines = readonly RichText[];

/** 섹션 머리 — 영문 키커 + 국문 제목 조합. */
export type SectionHead = {
  readonly id: string;
  readonly kicker: string;
  readonly title: string;
};

/** 슬롯에 실제로 끼워 넣은 사진. `import`한 정적 이미지만 받는다. */
export type ShotImage = {
  readonly src: StaticImageData;
  readonly alt: string;
  /** 첫 화면에 걸리는 사진만 `true`. LCP 후보를 미리 가져온다. */
  readonly priority?: boolean;
  /** 레이아웃상 이 사진이 차지하는 최대 너비(px). `sizes` 계산에 쓴다. */
  readonly maxWidth?: number;
};

/** 사진이 들어갈 자리. 파일이 없어도 비율을 먼저 고정해 레이아웃이 밀리지 않게 한다. */
export type ShotSlot = {
  /** 나중에 이미지를 끼울 때 식별자로 쓰는 슬롯 이름. */
  readonly slot: string;
  readonly ratio: "16/9" | "3/2" | "4/3" | "3/4";
  /** 자리표시자에 노출되는 설명. 어떤 사진이 들어갈 자리인지 적는다. */
  readonly placeholder: string;
  /** 사진만으로 무엇인지 알기 어려울 때만 붙인다. 없으면 쓰지 않는다. */
  readonly caption?: string;
  /** 사진을 확보하면 이 한 필드만 채운다. 비율은 이미 고정되어 있다. */
  readonly image?: ShotImage;
};

export type HeroContent = {
  readonly lines: readonly string[];
  readonly identity: string;
  /** 좌우 분할의 오른쪽에 놓는 사각 초상. 문장과 사람을 첫 화면에서 같이 보여준다. */
  readonly portrait: {
    readonly src: StaticImageData;
    readonly alt: string;
  };
};

export type AboutContent = {
  readonly head: SectionHead;
  readonly lines: readonly string[];
  readonly proof: RichText;
};

export type Principle = {
  readonly title: string;
  readonly body: string;
};

export type PrinciplesContent = {
  readonly head: SectionHead;
  readonly items: readonly Principle[];
};

export type TimelineEntry = {
  readonly label: string;
  /** 계보 배지 — 이 활동이 어느 프로젝트로 이어졌는지. 예: `CLUE` */
  readonly lineage?: string;
};

export type TimelineYear = {
  readonly year: string;
  readonly entries: readonly TimelineEntry[];
};

export type TimelineContent = {
  readonly head: SectionHead;
  readonly years: readonly TimelineYear[];
  /** 목록 뒤에 붙는 근거 사진. 없어도 된다. */
  readonly shot?: ShotSlot;
};

/** 배지는 두 그룹뿐이다. `concept`은 채움, `tech`는 테두리. */
export type BadgeKind = "concept" | "tech";

export type WorkBadge = {
  readonly label: string;
  readonly kind: BadgeKind;
};

export type WorkItem = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly badges: readonly WorkBadge[];
  readonly role: string;
  readonly shot: ShotSlot;
  readonly href: string;
  readonly moreLabel: string;
};

export type SelectedWorkContent = {
  readonly head: SectionHead;
  readonly items: readonly WorkItem[];
};

export type TeachingItem = {
  readonly title: string;
  readonly body: RichText;
  readonly shot?: ShotSlot;
};

export type TeachingContent = {
  readonly head: SectionHead;
  readonly items: readonly TeachingItem[];
};

export type ContactLink = {
  readonly key: string;
  readonly value?: string;
  readonly href?: string;
  readonly note?: string;
  readonly external?: boolean;
  /**
   * 전화번호 — 봇 스크래핑 방지.
   * 완성된 번호 문자열도 `tel:` href도 서버 HTML에 남기지 않는다.
   * 조각만 내려보내고 브라우저에서 조립한다.
   */
  readonly phoneParts?: readonly string[];
};

export type ContactContent = {
  readonly kicker: string;
  readonly id: string;
  readonly heading: string;
  readonly body: string;
  readonly push: string;
  readonly navLabel: string;
  readonly links: readonly ContactLink[];
};

export type HomeContent = {
  readonly hero: HeroContent;
  readonly about: AboutContent;
  readonly principles: PrinciplesContent;
  readonly timeline: TimelineContent;
  readonly selectedWork: SelectedWorkContent;
  readonly teaching: TeachingContent;
  readonly contact: ContactContent;
  readonly footer: string;
};
