import styles from "./Diagram.module.css";

/**
 * CLUE — 전체 투입 방식과 2단계 방식 비교.
 * 원본: `case-clue.html` DECISION 섹션의 인라인 SVG.
 */
export function ClueDecisionDiagram() {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 660 200"
      role="img"
      aria-label="전체 투입 방식과 2단계 방식 비교"
    >
      <text className={styles.label} x="0" y="12">
        흔한 방법
      </text>
      <rect className={styles.fillDim} x="0" y="24" width="410" height="34" rx="6" />
      <text className={styles.onDim} x="14" y="46">
        문서 전체를 LLM에 투입
      </text>
      <text className={styles.numDim} x="424" y="46">
        320.6 블록
      </text>
      <text className={styles.mini} x="0" y="78">
        비용과 시간이 문서 길이에 그대로 비례합니다. 문서2는 블록이 1,005개였습니다.
      </text>

      <line className={styles.strokeLine} x1="0" y1="102" x2="660" y2="102" />

      <text className={styles.label} x="0" y="130">
        선택한 방법
      </text>
      <rect className={styles.fillPt} x="0" y="142" width="106" height="34" rx="6" />
      <text className={styles.onFill} x="14" y="164">
        규칙 압축
      </text>
      <rect className={styles.fillPtBg} x="114" y="142" width="86" height="34" rx="6" />
      <text className={styles.point} x="128" y="164">
        LLM 검토
      </text>
      <text className={styles.num} x="214" y="164">
        83.0 블록
      </text>
      <text className={styles.mini} x="0" y="196">
        규칙이 잘하는 일과 LLM이 잘하는 일을 나눴습니다. 원문 블록은 그대로 남습니다.
      </text>
    </svg>
  );
}
