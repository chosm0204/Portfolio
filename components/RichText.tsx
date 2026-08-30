import { Fragment } from "react";

import type { RichLines, RichText as RichTextValue } from "@/types/home";

type SegmentClassNames = {
  /** 강조 구간(`<strong>`)에 붙일 클래스. */
  strongClassName?: string;
  /** 등폭 구간에 붙일 클래스. */
  monoClassName?: string;
  /** 보조 색 구간에 붙일 클래스. */
  subClassName?: string;
};

type RichTextProps = SegmentClassNames & {
  value: RichTextValue;
};

/** 카피 안의 강조 구간만 실제 요소로 올린다. 마크다운을 파싱하지 않는다. */
export function RichText({
  value,
  strongClassName,
  monoClassName,
  subClassName,
}: RichTextProps) {
  return (
    <>
      {value.map((segment, index) => {
        const classNames = [
          segment.mono ? monoClassName : undefined,
          segment.sub ? subClassName : undefined,
        ].filter(Boolean);

        const className = classNames.length > 0 ? classNames.join(" ") : undefined;

        if (segment.strong) {
          return (
            <strong
              key={index}
              className={[strongClassName, className].filter(Boolean).join(" ") || undefined}
            >
              {segment.text}
            </strong>
          );
        }

        if (className) {
          return (
            <span key={index} className={className}>
              {segment.text}
            </span>
          );
        }

        return <Fragment key={index}>{segment.text}</Fragment>;
      })}
    </>
  );
}

type RichLinesProps = SegmentClassNames & {
  value: RichLines;
};

/** 여러 줄을 `<br>`로 이어 붙인다. 원본 마크업의 줄바꿈을 그대로 재현한다. */
export function RichTextLines({ value, ...classNames }: RichLinesProps) {
  return (
    <>
      {value.map((lineValue, index) => (
        <Fragment key={index}>
          {index > 0 ? <br /> : null}
          <RichText value={lineValue} {...classNames} />
        </Fragment>
      ))}
    </>
  );
}
