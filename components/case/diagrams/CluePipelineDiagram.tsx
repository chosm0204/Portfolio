import styles from "./Diagram.module.css";

/**
 * CLUE — ACID 2단계 파이프라인 세로 스텝.
 * 원본: `case-clue.html` HOW IT WORKS 섹션의 인라인 SVG.
 * 딥그린 점은 Stage 1 · Stage 2, 회색 점은 그 앞뒤 단계다.
 */
export function CluePipelineDiagram() {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 660 330"
      role="img"
      aria-label="ACID 2단계 파이프라인 세로 스텝"
    >
      <line className={styles.strokeLine} x1="13" y1="16" x2="13" y2="312" strokeWidth="2" />

      <circle className={styles.fillDim} cx="13" cy="22" r="6" />
      <text className={styles.title} x="38" y="18">
        공고문 PDF 입력
      </text>
      <text className={styles.mini} x="38" y="38">
        텍스트 PDF와 스캔본을 자동 판별합니다
      </text>

      <circle className={styles.fillDim} cx="13" cy="102" r="6" />
      <text className={styles.title} x="38" y="98">
        블록 단위로 구조화
      </text>
      <text className={styles.mini} x="38" y="118">
        요약하지 않습니다. 원문 블록을 그대로 유지합니다
      </text>
      <text className={styles.numDim} x="38" y="138">
        평균 320.6개
      </text>

      <circle className={styles.fillPt} cx="13" cy="182" r="7" />
      <text className={styles.title} x="38" y="178">
        Stage 1 · 규칙으로 후보 압축
      </text>
      <text className={styles.mini} x="38" y="198">
        행정용어 · 지시표현 · 핵심정보 · 자격논리 패턴으로 선별합니다
      </text>
      <text className={styles.num} x="38" y="218">
        83.0개 — LLM 호출 73.1% 감소
      </text>

      <circle className={styles.fillPt} cx="13" cy="262" r="7" />
      <text className={styles.title} x="38" y="258">
        Stage 2 · LLM 문맥 검토
      </text>
      <text className={styles.mini} x="38" y="278">
        후보에만 적용. temperature 0으로 새 정보 생성을 차단합니다
      </text>

      <circle className={styles.fillDim} cx="13" cy="312" r="6" />
      <text className={styles.title} x="38" y="316">
        원문 근거와 함께 3패널로 출력
      </text>
    </svg>
  );
}
