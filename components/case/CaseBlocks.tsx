import { Fragment } from "react";

import { RichText, RichTextLines } from "@/components/RichText";
import { Shot } from "@/components/Shot";
import type { CaseBlock, CaseDiagramId } from "@/types/case";

import { CaseMetrics } from "./CaseMetrics";
import { ClueDecisionDiagram } from "./diagrams/ClueDecisionDiagram";
import { CluePipelineDiagram } from "./diagrams/CluePipelineDiagram";
import { DuduConvergenceDiagram } from "./diagrams/DuduConvergenceDiagram";
import styles from "./Case.module.css";

/** 리치 텍스트 구간에 붙는 클래스 — 블록 전체에서 같은 값을 쓴다. */
const textStyles = {
  strongClassName: styles.strong,
  monoClassName: styles.mono,
  subClassName: styles.sub,
} as const;

function Diagram({ id }: { id: CaseDiagramId }) {
  switch (id) {
    case "clue-decision":
      return <ClueDecisionDiagram />;
    case "clue-pipeline":
      return <CluePipelineDiagram />;
    case "dudu-convergence":
      return <DuduConvergenceDiagram />;
  }
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.kind) {
    case "leadQuestion":
      return (
        <p className={styles.leadQuestion}>
          <RichText value={block.text} {...textStyles} />
        </p>
      );

    case "lead":
      return (
        <p className={styles.lead}>
          <RichText value={block.text} {...textStyles} />
        </p>
      );

    case "paragraph":
      return (
        <p className={styles.paragraph}>
          <RichText value={block.text} {...textStyles} />
        </p>
      );

    case "heading":
      return (
        <h3
          className={
            block.spaced ? `${styles.heading} ${styles.headingSpaced}` : styles.heading
          }
        >
          {block.text}
        </h3>
      );

    case "note": {
      if (block.emphasis === "rule") {
        // 원본은 첫 줄만 크게 두고 나머지를 본문 크기로 되돌린다.
        const [first, ...rest] = block.lines;

        return (
          <div className={`${styles.note} ${styles.noteRule}`}>
            {first ? <RichText value={first} {...textStyles} /> : null}
            {rest.length > 0 ? (
              <>
                <br />
                <span className={styles.noteRuleTail}>
                  <RichTextLines value={rest} {...textStyles} />
                </span>
              </>
            ) : null}
          </div>
        );
      }

      return (
        <div
          className={
            block.emphasis === "lesson"
              ? `${styles.note} ${styles.noteLesson}`
              : styles.note
          }
        >
          <RichTextLines value={block.lines} {...textStyles} />
        </div>
      );
    }

    case "list":
      return (
        <ul className={styles.list}>
          {block.items.map((item, index) => (
            <li key={index} className={styles.listItem}>
              <RichTextLines value={[item]} {...textStyles} />
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                {block.table.columns.map((column) => (
                  <th key={column.label} style={column.width ? { width: column.width } : undefined}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={row.pick ? styles.rowPick : undefined}>
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={
                        cell.tone === "sub"
                          ? styles.cellSub
                          : cell.tone === "point"
                            ? styles.cellPoint
                            : undefined
                      }
                    >
                      <RichTextLines value={cell.lines} {...textStyles} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "figure":
      return (
        <figure className={styles.figure}>
          <div className={styles.figureBody}>
            <Diagram id={block.diagram} />
          </div>
          {block.caption ? (
            <figcaption className={styles.figureCaption}>
              <RichText value={block.caption} {...textStyles} />
            </figcaption>
          ) : null}
        </figure>
      );

    case "shot":
      return <Shot shot={block.shot} caption={block.caption} />;

    case "metrics":
      return (
        <CaseMetrics
          metrics={block.metrics}
          bars={block.bars}
          caption={block.caption}
        />
      );

    case "challenges":
      return (
        <>
          {block.items.map((item) => (
            <div key={item.no} className={styles.challenge}>
              <p className={styles.challengeNo}>{item.no}</p>
              <h3 className={styles.challengeTitle}>{item.title}</h3>
              {item.body.map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  <RichText value={paragraph} {...textStyles} />
                </p>
              ))}
              {item.note ? (
                <div className={styles.note}>
                  <RichTextLines value={item.note} {...textStyles} />
                </div>
              ) : null}
            </div>
          ))}
        </>
      );

    case "links":
      return (
        <ul className={styles.links}>
          {block.items.map((item) => {
            const body = (
              <>
                <span className={styles.linkKey}>{item.key}</span>
                <span
                  className={item.href ? styles.linkValue : styles.linkValuePlain}
                >
                  {item.value}
                </span>
                {item.note ? <span className={styles.linkNote}>{item.note}</span> : null}
              </>
            );

            return (
              <li key={item.key} className={styles.linkItem}>
                {item.href ? (
                  <a
                    className={styles.linkRow}
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={styles.linkRow}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      );
  }
}

/** 섹션 본문 — 데이터 순서 그대로 찍는다. */
export function CaseBlocks({ blocks }: { blocks: readonly CaseBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <Fragment key={index}>
          <Block block={block} />
        </Fragment>
      ))}
    </>
  );
}
