import * as React from "react";
import type { ReactNode } from "react";

type ViewTransitionProps = {
  name?: string;
  share?: string;
  default?: string;
  children?: ReactNode;
};

/**
 * React의 `<ViewTransition>`은 App Router가 쓰는 React 빌드에만 있다.
 * 타입에도 없고 브라우저 지원도 갈리므로, 없으면 그냥 통과시킨다.
 */
const ViewTransition = (
  React as unknown as { ViewTransition?: React.ComponentType<ViewTransitionProps> }
).ViewTransition;

type TitleTransitionProps = {
  /** 카드와 케이스 상세에서 같은 값을 준다. 이 이름이 두 제목을 하나로 묶는다. */
  name: string;
  children: ReactNode;
};

/**
 * 카드 제목 → 케이스 상세 제목으로 이어지는 전환.
 * 지원하지 않는 브라우저에서는 애니메이션 없이 즉시 전환된다 (graceful degradation).
 * 지속 시간·이징은 `globals.css`의 `::view-transition-group(.case-title)`에서 정한다.
 */
export function TitleTransition({ name, children }: TitleTransitionProps) {
  if (!ViewTransition) {
    return <>{children}</>;
  }

  return (
    <ViewTransition name={name} share="case-title" default="none">
      {children}
    </ViewTransition>
  );
}

/** 카드와 상세가 같은 이름을 쓰도록 한 곳에서만 만든다. */
export const caseTitleTransitionName = (id: string) => `case-title-${id}`;
