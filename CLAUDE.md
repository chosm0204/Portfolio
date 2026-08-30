# 조승민 포트폴리오 — 작업 규칙

이 파일은 이 저장소에서 작업할 때 **반드시 지켜야 할 선**을 정한다.
배경과 근거는 `ARCHIVE/`에 있다. 판단이 필요하면 `ARCHIVE/05_DECISIONS.md`를 먼저 본다.

---

## 🔴 사실 검증 규칙

**확인되지 않은 주장을 싣지 않는다.**

- 코드·문서·측정 기록으로 뒷받침되지 않는 수치와 기능은 쓰지 않는다
- 팀 프로젝트에서 **본인이 한 일과 팀이 한 일을 구분해 표기**한다
- 과장 어휘를 쓰지 않는다 — "전문가" · "혁신적" · "독창적" · "완벽한"
- 출처가 벤더 마케팅인 통계를 인용하지 않는다

> 판단 기준: **면접에서 "그 근거가 뭐죠?"라고 물으면 답할 수 있는가?**
> 답할 수 없으면 싣지 않는다.

**구체적인 금지 항목·확정 수치·기여 경계는 `CLAUDE.local.md`에 있다** (비공개, git 제외).
작업 전 반드시 함께 읽는다.

---

## 카피 톤 규칙

- **단정형.** "만듭니다" / "설계합니다". `~하려고 합니다` 금지
- **조건절로 시작해 역량을 암시한다.** "~있으면, ~합니다". "할 수 있는 사람입니다"라고 쓰지 않는다
- **"A가 아니라 B다" 대조**가 이 사이트의 문장 엔진이다. 주장은 대조로 박는다
- **해명·완곡 어미 금지** — `~니까요`, `~다 보면`. 짧게 끊고 단정한다
- `~라고 생각합니다`는 한 섹션에 최대 2회
- **첫 화면에 프로젝트 이름을 쓰지 않는다.** 사람이 먼저, 프로젝트는 근거로 뒤따른다
- 개발 용어를 남발하지 않는다. 비개발 채용담당자도 읽을 수 있어야 한다
- 모험적 구어(예: "딸깍") 금지. 격식 유지
- 국문 전용. 영문은 후순위

**확정 카피는 `ARCHIVE/03_CONTENT/CONTENT.md`가 정본이다.** 임의로 바꾸지 않는다.

---

## 디자인 토큰

```css
--bg:    #F7F8F9;  /* 배경 — 순백 아님 */
--card:  #FFFFFF;
--fg:    #14171C;  /* 본문 */
--sub:   #646B75;  /* 보조 */
--line:  #E2E5E9;
--pt:    #1F5F4A;  /* 딥그린 — 유일한 강조색 */
--pt-bg: #E7F0EC;
--dim:   #C9CED4;  /* Before 막대 */
```

**포인트 색은 '의미'에만 쓴다. 장식으로 쓰지 않는다.**
읽는 사람이 알아야 할 정보 — **강조 · 선택 · 현재 위치 · 측정값** — 을 나를 때만 허용한다.

허용 예: 섹션 라벨 / 지표 숫자 / After 막대 / 컨셉 배지 / 링크 /
note 좌측 보더(중요 문단) / 리스트 불릿 / 표의 채택안 강조 / 다이어그램의 "선택한 방법" / 목차 현재 항목

금지 예: 배경 그라데이션 / 아무 의미 없는 구분선 / 호버 시 색만 바뀌는 장식

> 판단 기준: **이 색을 회색으로 바꾸면 독자가 무언가를 놓치는가?**
> 답이 없으면 장식이다. 회색으로 내린다.

**다크모드 없음.** 라이트 단일.

**폰트** — Pretendard Variable(본문) + JetBrains Mono(숫자·코드). 2파일 이상 로딩하지 않는다.

**타입 스케일** — 히어로 `clamp(30px,4.4vw,46px)` / 섹션 제목 28~32 / 소제목 20 / 본문 **17** / 캡션 14 / 지표 44
**여백 3단계** — 그룹 간 88~104 / 그룹 내 28 / 컴포넌트 10
**한글 조판** — `word-break:keep-all` 필수, 본문 `line-height:1.7`, 본문 컨테이너 `max-width:720px`

**기술 스택 로고를 컬러로 쓰지 않는다.** 텍스트 배지로만 표기한다.

---

## 모션 — 이 네 개만

| 어디 | 무엇 | 시간 |
|---|---|---|
| 카드 → 케이스 상세 | 제목이 이어지는 전환 (View Transitions) | 320ms |
| 지표 진입 | 막대 차오름 + 숫자 카운트업. **한 번만** | 620 / 760ms |
| 목차 | 현재 섹션 표시 | — |
| 링크·버튼 | 호버·포커스 반응 | 120ms |

- easing `cubic-bezier(.2,0,0,1)`
- **`prefers-reduced-motion` 대응 필수** — 전부 즉시 완성 상태로
- ❌ 모든 섹션 페이드인 · 패럴랙스 · 스크롤 하이재킹 · 프리로더 · 커스텀 커서

**판단 기준**: *이 효과가 없으면 사용자가 뭘 놓치는가?* 답이 없으면 장식이다. 뺀다.

---

## 이미지

교체만 하면 되는 구조를 유지한다.
```html
<figure class="shot" data-slot="clue-workbench" data-ratio="16/9">
  <div class="ph">…자리표시…</div>   <!-- 이 한 줄만 <img>로 교체 -->
</figure>
```
- 비율을 미리 고정해 나중에 넣어도 레이아웃이 밀리지 않게 한다
- 스크린샷 기본 처리: 라운드 12px + 옅은 그림자. 브라우저 프레임 목업은 대표 화면 하나에만
- **다이어그램은 전부 인라인 SVG.** 이미지 파일로 만들지 않는다

⚠️ `ARCHIVE/.../09_화면캡처/CLUE_워크벤치_3패널.png`는 **분류 정합화 이전 화면**이다.
탭이 `행정/원본·문맥·조건·활동`(구 분류)으로 되어 있어 ACID 설명과 어긋난다. 재캡처 전까지 쓰지 않는다.

---

## 품질 기준

- Lighthouse 4개 항목 90+
- 명도 대비 4.5:1 이상
- 키보드만으로 전 페이지 이동 가능, 포커스 표시 명확
- **본문이 view-source에 보일 것** (SSG/SSR) — 국내 포트폴리오의 최대 공통 결함이 CSR 배포다
- 모바일에서 표·다이어그램이 깨지지 않을 것
- **인쇄 스타일 필수** — 웹→PDF 변환이 전제다. 호버로만 드러나는 정보를 만들지 않는다
- OG 이미지 — 지원서 링크의 미리보기

---

## 공개 전 점검

- [ ] `.env` 커밋 이력 확인 (CLUE는 `api/.env`·`server/.env` 존재)
- [ ] 하드코딩된 API 키 없는지 (DuDu `src/cho/Search.jsx` 전례)
- [ ] 개인정보 노출 범위: **이름·사진·이메일·전화·GitHub만.**
      학번·생년월일·MBTI·장학금 내역은 넣지 않는다
- [ ] 🔴 **제3자 실명을 쓰지 않는다.** 지도 교수·팀원 이름 등. (2026-08-30 `지도 김정이 교수` 제거)
- [ ] 🔴 **"성결"이 들어가는 표기는 전부 제거한다.** 학교가 식별되는 고유명사를 쓰지 않는다.
      `성결대학교 대표` → `멋쟁이사자처럼 14기 대표`
      `성결튜터링 · 성결스터디` → `교내 튜터링 · 스터디`
      `학과 경진대회`는 학교명이 없으므로 그대로 둔다
- [ ] 전화번호는 봇 스크래핑 방지 처리

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
