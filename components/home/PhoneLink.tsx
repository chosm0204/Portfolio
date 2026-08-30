"use client";

import { Fragment, useEffect, useRef } from "react";

type PhoneLinkProps = {
  label: string;
  /** 번호 조각. 완성된 문자열은 어디에도 두지 않는다. */
  parts: readonly string[];
  /** CSS 모듈 클래스. `noUncheckedIndexedAccess` 때문에 undefined가 섞일 수 있다. */
  className?: string;
  keyClassName?: string;
  valueClassName?: string;
};

/**
 * 전화번호 — 봇 스크래핑 방지.
 *
 * 두 가지를 동시에 막는다.
 * 1. 서버 HTML에 `tel:` href가 없다. 브라우저가 DOM에 직접 붙인다.
 * 2. 번호가 한 덩어리 문자열로 존재하지 않는다. 조각과 하이픈이 각각 다른 요소다.
 *    `010-9565-7199` 형태를 정규식으로 훑는 수집기는 걸리지 않는다.
 *
 * 사용자에게는 보이는 것도 눌리는 것도 동일하다.
 */
export function PhoneLink({
  label,
  parts,
  className,
  keyClassName,
  valueClassName,
}: PhoneLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // href는 렌더 결과가 아니라 DOM 갱신으로 붙인다 — 서버 HTML에 남기지 않기 위해서다.
    ref.current?.setAttribute("href", `tel:${parts.join("")}`);
  }, [parts]);

  return (
    <a className={className} ref={ref}>
      <span className={keyClassName}>{label}</span>
      <span className={valueClassName}>
        {parts.map((part, index) => (
          <Fragment key={part}>
            {index > 0 ? <span aria-hidden="true">-</span> : null}
            {part}
          </Fragment>
        ))}
      </span>
    </a>
  );
}
