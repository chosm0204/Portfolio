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

/**
 * 히어로 인적사항 표의 한 줄 — 라벨/값 2열.
 * CONTACT의 링크 목록과 값은 같지만 역할이 다르다.
 * 여기는 첫 화면 스캔용, CONTACT는 마무리 맥락이다.
 */
export type HeroProfileRow = {
  readonly label: string;
  readonly value?: string;
  readonly href?: string;
  readonly external?: boolean;
  /**
   * 전화번호 — 봇 스크래핑 방지.
   * 완성된 번호도 `tel:` href도 서버 HTML에 남기지 않는다. `PhoneLink`가 브라우저에서 조립한다.
   */
  readonly phoneParts?: readonly string[];
};

export type HeroContent = {
  /** 첫 화면에서 가장 큰 글자. 사람이 먼저 온다. */
  readonly name: string;
  /** 이름 바로 아래 한 줄. 무엇을 하는 사람인지. */
  readonly role: string;
  /** 주장 — 이름 아래 부제 자리로 내려온다. */
  readonly lines: readonly string[];
  /** 라벨/값 2열. 읽지 않고 훑을 사람을 위한 자리다. */
  readonly profile: readonly HeroProfileRow[];
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
  /** 기록 이름. 등급은 `awards`로 따로 뽑는다. 예: `학과 경진대회` */
  readonly label: string;
  /** 수상 등급 배지. 예: `대상`, `우수상`. 수상이 아닌 기록은 비운다. */
  readonly awards?: readonly string[];
  /** 계보 — 이 기록이 어느 프로젝트에서 나왔는지. 예: `CLUE` */
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

/** 고정 네비게이션의 한 항목. `id`는 실제 섹션 id와 같아야 한다. */
export type NavItem = {
  readonly id: string;
  readonly label: string;
};

export type NavContent = {
  /** `<nav aria-label>` — 스크린리더가 이 네비게이션을 다른 것과 구분하는 이름. */
  readonly label: string;
  readonly items: readonly NavItem[];
};

export type HomeContent = {
  readonly nav: NavContent;
  readonly hero: HeroContent;
  readonly about: AboutContent;
  readonly principles: PrinciplesContent;
  readonly timeline: TimelineContent;
  readonly selectedWork: SelectedWorkContent;
  readonly teaching: TeachingContent;
  readonly contact: ContactContent;
  readonly footer: string;
};
