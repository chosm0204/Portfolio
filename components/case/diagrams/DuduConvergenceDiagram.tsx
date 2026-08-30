import styles from "./Diagram.module.css";

/**
 * DUDU — 기획 확장에서 수렴으로.
 * 원본: `case-dudu.html` CONVERGENCE 섹션의 인라인 SVG.
 */
export function DuduConvergenceDiagram() {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 660 208"
      role="img"
      aria-label="기획 확장에서 수렴으로"
    >
      <text className={styles.label} x="0" y="12">
        확장 — 아이디어가 늘어나던 구간
      </text>

      <rect className={styles.boxIdle} x="0" y="26" width="128" height="30" rx="6" />
      <text className={styles.inBox} x="14" y="46">
        전 과목 대응
      </text>
      <rect className={styles.boxIdle} x="138" y="26" width="124" height="30" rx="6" />
      <text className={styles.inBox} x="152" y="46">
        캐릭터 · 보상
      </text>
      <rect className={styles.boxIdle} x="272" y="26" width="104" height="30" rx="6" />
      <text className={styles.inBox} x="286" y="46">
        카드뉴스
      </text>
      <rect className={styles.boxIdle} x="386" y="26" width="118" height="30" rx="6" />
      <text className={styles.inBox} x="400" y="46">
        퀴즈 · 게임
      </text>
      <rect className={styles.boxIdle} x="514" y="26" width="146" height="30" rx="6" />
      <text className={styles.inBox} x="528" y="46">
        교사 관리 기능
      </text>

      <path className={styles.arrow} d="M300,74 L300,100" />
      <path className={styles.arrow} d="M294,94 L300,101 L306,94" />
      <text className={styles.mini} x="316" y="92">
        &quot;이 기능이 학생의 실제 질문 행동을 늘리는가?&quot;
      </text>

      <text className={styles.label} x="0" y="134">
        수렴 — 하나로 좁힌 결과
      </text>
      <rect className={styles.fillPt} x="0" y="148" width="286" height="38" rx="7" />
      <text className={styles.onFill} x="18" y="172">
        국어 문해력 하나만 끝까지
      </text>
      <rect className={styles.fillPtBg} x="298" y="148" width="362" height="38" rx="7" />
      <text className={styles.point} x="316" y="172">
        교사가 수업을 지휘하는 관제 화면
      </text>
    </svg>
  );
}
