"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { REVEAL_SCAN } from "@/lib/reveal";

type RevealWindow = Record<string, (() => void) | null | undefined>;

/**
 * 클라이언트 이동으로 새로 그려진 진입 대상을 다시 관측에 넣는다.
 *
 * 첫 로드는 인라인 스크립트가 이미 끝내 놓는다.
 * 이 컴포넌트가 실패해도(하이드레이션 실패 등) 첫 화면은 그대로 동작한다.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    (window as unknown as RevealWindow)[REVEAL_SCAN]?.();
  }, [pathname]);

  return null;
}
