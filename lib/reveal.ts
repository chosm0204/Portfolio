import type { CSSProperties } from "react";

/**
 * 스크롤 진입 — 뷰포트에 들어올 때 한 번만 올라오며 나타난다.
 *
 * 원칙: **정적 HTML은 보이는 상태가 기본이다.**
 * 숨김(`opacity:0`)은 아래 인라인 스크립트가 `<style>`을 하나 끼워 넣을 때만 생긴다.
 * 따라서 JS 비활성·구형 브라우저·크롤러·`prefers-reduced-motion`에서는
 * 아무것도 숨지 않고 view-source 그대로 읽힌다.
 *
 * 완성 상태와 트랜지션은 `app/globals.css`의 `[data-reveal][data-revealed]`가 갖는다.
 */

/** 같은 그룹 안의 항목 간격 */
const STEP_MS = 50;

/** 마지막 항목까지 250ms — 300ms를 넘기지 않는다 */
const MAX_STEPS = 5;

type RevealProps = {
  "data-reveal": string;
  /**
   * 진입 표시(`data-revealed`)는 하이드레이션보다 먼저 붙을 수 있다.
   * 개발 모드의 속성 불일치 경고만 끈다 — 프로덕션 React는 속성을 비교하지 않는다.
   */
  suppressHydrationWarning: true;
  style?: CSSProperties;
};

/**
 * 진입 대상에 붙이는 속성.
 * @param index 같은 그룹 안에서의 순번. 0이면 지연 없음.
 */
export function reveal(index = 0): RevealProps {
  const steps = Math.min(Math.max(index, 0), MAX_STEPS);

  if (steps === 0) {
    return { "data-reveal": "", suppressHydrationWarning: true };
  }

  return {
    "data-reveal": "",
    suppressHydrationWarning: true,
    style: { "--reveal-delay": `${steps * STEP_MS}ms` } as CSSProperties,
  };
}

/** 인라인 스크립트가 노출하는 재검사 함수 이름. `components/Reveal.tsx`가 이 이름을 부른다. */
export const REVEAL_SCAN = "__revealScan";

/**
 * `<body>` 첫 자식으로 동기 실행되는 스크립트.
 * 본문이 그려지기 전에 숨김 규칙을 넣어 깜빡임을 없앤다.
 *
 * 세 가지를 지킨다.
 *   ① 감속 설정이거나 IntersectionObserver가 없으면 **아무것도 하지 않는다**
 *   ② 관측 콜백이 한 번도 오지 않으면 숨김을 걷어낸다 (내용이 사라지는 쪽이 더 나쁘다)
 *   ③ 재검사 함수를 노출해 클라이언트 이동 후에도 새 요소를 잡는다
 */
export const REVEAL_SCRIPT = `(function(){
var w=window,d=document;
if(!w.IntersectionObserver)return;
try{if(w.matchMedia("(prefers-reduced-motion: reduce)").matches)return;}catch(e){return;}
var hide=d.createElement("style");
hide.textContent="[data-reveal]{opacity:0;transform:translateY(14px)}";
(d.head||d.documentElement).appendChild(hide);
var live=false;
var io=new w.IntersectionObserver(function(es){
live=true;
for(var i=0;i<es.length;i++){if(es[i].isIntersecting){es[i].target.setAttribute("data-revealed","");io.unobserve(es[i].target);}}
},{rootMargin:"0px 0px 8% 0px"});
var scan=function(){
var ns=d.querySelectorAll("[data-reveal]:not([data-revealed])");
for(var i=0;i<ns.length;i++){if(ns[i].__rv)continue;ns[i].__rv=1;io.observe(ns[i]);}
};
w.${REVEAL_SCAN}=scan;
var arm=function(){
scan();
w.setTimeout(function(){if(live)return;io.disconnect();hide.remove();w.${REVEAL_SCAN}=null;},2000);
};
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",arm,{once:true});else arm();
})();`;
