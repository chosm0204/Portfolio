import styles from "./SiteFooter.module.css";

type SiteFooterProps = {
  text: string;
};

export function SiteFooter({ text }: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>{text}</div>
    </footer>
  );
}
