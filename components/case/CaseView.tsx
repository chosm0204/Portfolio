import Link from "next/link";

import { RichText, RichTextLines } from "@/components/RichText";
import { caseTitleTransitionName, TitleTransition } from "@/components/TitleTransition";
import { home } from "@/content/home";
import { reveal } from "@/lib/reveal";
import type { CaseContent } from "@/types/case";

import { CaseBlocks } from "./CaseBlocks";
import { CaseReading } from "./CaseReading";
import styles from "./Case.module.css";

type CaseViewProps = {
  content: CaseContent;
};

/**
 * 케이스 상세 한 장.
 * 카피는 전부 `content/cases/*.ts`에서 오고, 이 파일은 구조만 담당한다.
 * 마크업 기준: `ARCHIVE/04_IA_DESIGN/samples/case-clue.html`
 */
export function CaseView({ content }: CaseViewProps) {
  const tocEntries = content.sections.map((section) => ({
    id: section.id,
    tocLabel: section.tocLabel,
  }));

  const backLink = (
    <Link className={styles.back} href={content.backHref}>
      <span aria-hidden="true">← </span>
      {content.backLabel}
    </Link>
  );

  return (
    <div className={styles.layout}>
      <CaseReading
        navLabel={content.tocLabel}
        tocTitle={content.tocTitle}
        sections={tocEntries}
      />

      <div className={styles.column}>
        <main>
          <div className={`${styles.wrap} ${styles.backTop}`}>{backLink}</div>

          <header className={styles.head}>
            <div className={styles.wrap}>
              <span className={styles.caseLabel}>{content.caseLabel}</span>

              <TitleTransition name={caseTitleTransitionName(content.id)}>
                <h1 className={styles.title}>{content.title}</h1>
              </TitleTransition>

              <p className={styles.oneline}>
                <RichTextLines value={content.oneline} />
              </p>

              <div className={styles.overview}>
                <dl className={styles.overviewList}>
                  {content.overview.map((item) => (
                    <div key={item.label}>
                      <dt className={styles.overviewLabel}>{item.label}</dt>
                      <dd className={styles.overviewValue}>
                        <RichText value={item.value} subClassName={styles.sub} />
                      </dd>
                    </div>
                  ))}
                </dl>

                <div>
                  <p className={styles.roleLabel}>{content.roleLabel}</p>
                  <ul className={styles.roles}>
                    {content.roles.map((role) => (
                      <li
                        key={role.text}
                        className={
                          role.shared ? `${styles.role} ${styles.roleShared}` : styles.role
                        }
                      >
                        {role.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </header>

          {content.sections.map((section) => {
            const headingId = `${section.id}-title`;

            return (
              <section
                key={section.id}
                id={section.id}
                className={styles.section}
                {...(section.title
                  ? { "aria-labelledby": headingId }
                  : { "aria-label": section.kicker })}
              >
                <div className={styles.wrap}>
                  <span {...reveal()} className={styles.kicker}>
                    {section.no ? <i className={styles.kickerNo}>{section.no}</i> : null}
                    {section.kicker}
                  </span>

                  {section.title ? (
                    <h2 {...reveal(1)} id={headingId} className={styles.sectionTitle}>
                      {section.title}
                    </h2>
                  ) : null}

                  <CaseBlocks blocks={section.blocks} />
                </div>
              </section>
            );
          })}

          <div className={`${styles.wrap} ${styles.backTop}`}>{backLink}</div>
        </main>

        {/* 홈과 같은 꼬리말. 본문 열 안에 두어 좌측 목차와 어긋나지 않게 한다. */}
        <footer className={styles.footer}>
          <div className={styles.wrap}>{home.footer}</div>
        </footer>
      </div>
    </div>
  );
}
