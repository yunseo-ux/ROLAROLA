# ROLAROLA Design Tokens

작성일: 2026-10-12. 기술 환경: React + Vite / CSS.

> 후속 전체 레이아웃 구현에서 관찰 토큰을 CSS에 적용했다. 아래 미확정 항목은 계속 미확정이며, 700/1100px 반응형 구간·모바일 헤더/푸터 크기는 Figma 확정 토큰이 아닌 구현상 선택이다. 상세는 [구현 기록](./docs/Layout-implementation.md)을 참고한다. JetBrains Mono / Roboto / Pretendard는 로컬 폰트 패키지로 추가했다.

## 1. 근거와 확정 범위

- [데스크톱 main · 179:2673](https://www.figma.com/design/OQqcPoFp7oPmqpco4HZSvP/?node-id=179-2673): 1920 × 12077.
- [모바일 반응형 · 179:2224](https://www.figma.com/design/OQqcPoFp7oPmqpco4HZSvP/?node-id=179-2224): 402 × 7930.
- 문서 페이지: 레퍼런스 `0:1`, 와이어프레임 `31:13`, 디자인 `160:781`.
- 위 화면의 design context 및 스크린샷과 페이지 metadata를 확인했다. 별도 IA 또는 스타일 가이드로 명시된 영역은 식별하지 못했다.
- main에 대한 변수 조회 결과는 `{}`. 이는 해당 조회에서 변수 정의가 반환되지 않았다는 의미이며, 파일 전체에 변수가 없다는 의미는 아니다.
- 아래 수치는 화면에서 관찰한 값이다. 전역 디자인 시스템으로 승인된 값과 구분한다. 생성된 코드의 좌표와 크기를 반응형 CSS에 그대로 복사하지 않는다.
- CSS 변수는 `--rr-{category}-{role-or-value}` 형식을 사용한다. `src/styles/tokens.css`의 관찰된 기본값을 현재 페이지 스타일에서 재사용한다.

## 2. Brand Color / Semantic Color

| CSS 토큰 | 관찰값 | 사용 근거 |
| --- | --- | --- |
| `--rr-color-pink-100` | #F9EEF0 | PC `179:2909`, 모바일 `179:2235` 배경/bg1 |
| `--rr-color-rose-500` | #D2495C | PC `179:2911`, 모바일 `179:2238` 브랜드 문구 |
| `--rr-color-category-hover` | #FFE8EC | 카테고리 호버 `160:1315`, `308:1172` 등 |
| `--rr-color-cream-desktop` | #F8F5EF | PC `179:2699`, `179:2675` 배경/bg3 |
| `--rr-color-cream-mobile` | #F7F3E9 | 모바일 `179:2243` 배경/bg3 |
| `--rr-color-black` | #000000 | 내비게이션 목록·본문 |
| `--rr-color-white` | #FFFFFF | PC 헤더 `179:2941`, hero 문구 |
| `--rr-color-gray-950` | #0C0C0C | PC 컬렉션 제목 `179:2711` |
| `--rr-color-gray-900` | #141414 | PC 섹션 제목 `179:2705` |
| `--rr-color-gray-500` | #838383 | PC 카테고리 순번 `179:2804` |

핑크·로즈는 브랜드 표현에 사용된 색이다. 공식 primary/secondary 구분은 미확정이다.
같은 bg3 이름에 PC·모바일 색상이 다르므로 하나의 색으로 통일하지 않았다.
성공·오류·경고·정보·disabled·focus 색상은 확인되지 않았다.
향후 `--rr-color-text-primary`, `--rr-color-surface-default`, `--rr-color-action-default`처럼 역할별 별칭을 승인 후 추가한다. 임의 색상은 넣지 않는다.

## 3. Typography / Weight / Line Height

| 속성 | 관찰값 | CSS 토큰 / 근거 |
| --- | --- | --- |
| 기본 영문 폰트 | JetBrains Mono | `--rr-font-family-mono` |
| 카테고리 순번 | Roboto Regular | `--rr-font-family-index`, PC `179:2804` |
| 모바일 컬렉션 제목 | Pretendard Medium | `--rr-font-family-collection-mobile`, `I179:2346;179:1667;156:781` |
| weight | Regular 400 / Medium 500 / SemiBold 600 | `--rr-font-weight-regular/medium/semibold` |
| 제목 line-height | 1.2 | `--rr-line-height-heading` |
| Auto line-height | normal | `--rr-line-height-auto`; 픽셀값으로 추정하지 않음 |
| 제목 letter-spacing | -2% | `--rr-letter-spacing-heading: -0.02em` |
| 본문 letter-spacing | -4% | `--rr-letter-spacing-body: -0.04em` |
| 내비게이션 / CTA letter-spacing | -3% | `--rr-letter-spacing-navigation: -0.03em` |

| 역할 | PC | Mobile | 근거 |
| --- | --- | --- | --- |
| 브랜드 소개 제목 | 45px / 600 / 1.2 / -0.9px | 24px / 600 / 1.2 / -0.48px | `179:2911`, `179:2238` |
| 브랜드 소개 본문 | 20px / 500 / normal / -0.8px | 15px / 500 / normal / -0.6px | `179:2913`, `179:2240` |
| 카테고리 목록 | 55px / 600 / 1.2 / -1.1px | 별도 모바일 문맥 유지 | `179:2793` |
| PC 내비게이션 | 20px / 500 / normal / -0.6px | 수치 검토 필요 | `179:2941`, `179:2405` |
| PC CTA | 19px / 500 / normal / -0.57px | SHOP THE COLLECTION 13px / 500 / normal / -0.39px | `179:2701`, `179:2245` |
| 컬렉션 카드 제목 | 20px / 600 / 1.2 / -0.4px | Pretendard 12px / 500 / normal | `179:2711`, `179:2346` 인스턴스 내부 |
| 카테고리 순번 | Roboto 15px / 400 / normal | 전역 축척 미정 | `179:2804` |

위 모바일 수치는 대응 요소에서 확인한 값만 기재했다. PC 값을 자동 축소하거나 clamp 공식을 임의로 지정하지 않는다.
역할별 크기 변수는 추후 `--rr-font-size-brand-heading-desktop`처럼 정의한다. 모든 수치를 하나의 전역 본문 크기로 통일하지 않는다.

### 폰트·수치 확인 필요

- 폰트 파일·라이선스·weight 파일·한글 fallback은 미제공. 폰트 변수 선언만 하며 `@font-face`와 외부 CDN은 추가하지 않았다.
- 모바일 헤더 높이 15.703px, 로고 37 × 8px. 일부 텍스트는 design context에서 1.26px로 반환되지만 metadata 텍스트 상자는 높이 8px이다.
- 모바일 푸터도 1.05 / 1.26 / 1.88px 등 비정상적으로 작은 텍스트가 반환된다. 모바일에 0px 텍스트 값도 관찰된다.
- 위 이상값은 원본 인스턴스·축척·숨김 의도를 확인해야 하며, 사용 가능한 타이포그래피 토큰으로 등록하지 않았다.

## 4. Spacing / Container / Grid

| 관찰 항목 | 값 | 근거·범위 |
| --- | --- | --- |
| PC 작업 프레임 폭 | 1920px | `179:2673`; 최대 컨테이너나 breakpoint를 의미하지 않음 |
| 모바일 작업 프레임 폭 | 402px | `179:2224`; breakpoint를 의미하지 않음 |
| PC 대표 좌우 여백 | 64px | `--rr-layout-gutter-desktop`, `179:2941`, `179:2706` |
| 모바일 대표 좌우 여백 | 12px | `--rr-layout-gutter-mobile`, `179:2232`, `179:2245` |
| PC 헤더 높이 | 75px | `179:2940`; 고정/스크롤 동작 미확정 |
| PC 헤더 메뉴 간격 | 29px | `--rr-space-29`, `179:2941`, `179:2945` |
| PC 푸터 행 간격 | 8px | `--rr-space-8`, `179:2685`, `179:2690` |
| PC 상품 제목·본문 간격 | 10px | `--rr-space-10`, `179:2893` |
| PC 컬렉션 이미지·제목 간격 | 19px | `--rr-space-19`, `179:2709` |
| PC 상품 속성 행 간격 | 24px | `--rr-space-24`, `179:2897` |
| 모바일 브랜드 소개 요소 간격 | 32px | `--rr-space-32`, `179:2236` |

간격은 관찰된 값만 등록했다. 4px/8px 배수 체계로 재해석하지 않았다.
1920 - 64 × 2 = 1792px은 대표 여백 기준 산술값이며 공식 max-width는 아니다. 모바일 브랜드 소개 실제 그룹은 379px이며 모든 영역에 378px을 강제하지 않는다.
푸터 좌측 160px 등 별도 여백이 있으므로 모든 섹션에 동일 gutter를 일괄 적용하지 않는다.
공식 column 수·column gap·tablet grid·최대 컨테이너는 미확정이다.

## 5. Border / Radius / Shadow

- PC 컬렉션 구분선은 `179:2712` design context에서 1px 렌더링 보정이 나타난다. 모바일 대응 `179:2347`은 0.5px이다.
- CTA 밑줄은 SVG 에셋으로 반환된다. 보정 inset을 원본 stroke-width와 동일하다고 확정하지 않는다.
- 모바일 EXPLORE 아이콘은 #5E5E5E / 0.5px border, rgba(85,85,85,0.8) 배경으로 반환된다. 일반 버튼이 아닌 placeholder 여부 확인이 필요하다.
- 전역 border 색·굵기, radius, shadow 스타일은 미확정이다. 그림자 없음·radius 0을 전체 UI 기준으로 선언하지 않는다.
- 승인 후 네이밍: `--rr-border-width-divider`, `--rr-radius-card`, `--rr-shadow-overlay`.

## 6. Responsive Breakpoints

- 지원 범위: PC / Tablet / Mobile (사용자 요구).
- 확인한 화면: PC 1920px, Mobile 402px. Tablet 전용 프레임은 현재 조사에서 식별하지 못했다.
- breakpoint·각 구간 최소/최대 폭·tablet 재배치·모바일 메뉴 동작은 미확정이다.
- 768/1024/1280px 등 관행적인 breakpoint를 임의로 추가하지 않는다. 현재 media query는 없다.
- 확정 시 CSS media query의 실제 수치를 문서화한다. CSS custom property를 `@media (min-width: var(...))`에 직접 사용하지 않는다.

## 7. Button / Navigation / Card

### Button / TextLink

- PC CTA는 대문자 라벨 + 밑줄 + 화살표. 예: VIEW THE COLLECTION `179:2700` (라벨 19px, 아이콘 19 × 19px, 밑줄 영역 폭 227px).
- CONTACT US는 13px 라벨과 16px 아이콘으로 별도 크기다. 모든 CTA 폭을 227px로 통일하지 않는다.
- filled button, disabled, loading, focus, hover 수치는 미확정이다.

### Navigation

- PC 헤더: 좌측 SHOP / ABOUT / COLLECTION, 중앙 로고 176 × 37px, 우측 COMMUNITY / SEARCH / LOGIN / CART / KR|EN.
- 모바일은 같은 라벨이 확인되지만 축척 이상이 있어 최종 레이아웃 승인 필요.
- 카테고리: VIEW ALL / NEW ARRIVALS / BEST / (NU)BASIC / MAISON DE ROLA / OUTWEAR / TOP / DRESS / BOTTOM / HOME.
- OUTWEAR는 디자인 원문을 유지했다. 영문 표기 교정은 별도 확인 사항이다.
- dropdown·active·sticky 규칙은 아직 확정하지 않는다.

후속 사용자 요청으로 con4 호버를 구현했다. PC 활성 행 배경은 #FFE8EC이며 높이는 66px (1920px 프레임 기준)이다. 이미지 위치는 x=64/y=712, 크기는 302×343px이며 10개 카테고리별 원본 이미지를 사용한다. `160:1313`~`308:1120` 디자인 상태를 근거로 한다. 별도 transition 수치는 추가하지 않았다.

### Card

- PC 컬렉션: `179:2709` 카드 폭 302px, 이미지 302 × 409px, 이미지·제목 간격 19px.
- 모바일 컬렉션: `179:2346` 카드 168 × 252px, 이미지 168 × 210px, 제목 y=220px, 12px Pretendard Medium.
- PC 상품 소개: `179:2892` 이미지 886 × 796px, 제목 30px SemiBold, 설명 20px Medium, 색상·사이즈 18px Medium.
- 같은 콘텐츠의 PC·모바일 이미지 비율이 다르다. object-fit·crop·전용 이미지 제공 여부 확인 필요.
- 컬렉션/착장 그룹이 프레임 폭을 넘어 배치되어 있다. 가로 스크롤·캐러셀·마스킹 중 어느 동작인지는 정적 화면만으로 확정하지 않는다.

## 8. Interaction / Transition / Animation

- 디자인 페이지에 카테고리 변형 `con4_2`~`con4_11`, 모바일 변형 `con4-2`~`con4-11`, popup1~3 프레임이 있다.
- 변형의 존재는 확인했지만 hover/click/scroll 트리거, 표시 조건, focus 이동, 닫기 방식은 미확정이다. 변형 프레임을 독립 페이지로 만들지 않는다.
- duration·delay·easing·자동 재생 주기·스크롤 애니메이션 값은 확인되지 않았다.
- `--rr-motion-duration-*`, `--rr-motion-easing-*`는 승인 이후 등록한다. 임의의 200ms나 ease를 기본값으로 확정하지 않는다.
- 키보드 접근성·reduced-motion 처리는 구현 시 검토할 개발 요구이며 Figma 확정값과 구분한다.

## 9. 개발 시작 전 승인 항목

1. 공식 스타일 가이드 / 전역 semantic 토큰과 PC·모바일 크림색 차이.
2. 모바일 헤더·푸터 축척 이상, placeholder 아이콘, 0px 텍스트.
3. Tablet 화면 및 breakpoint / 중간 폭 레이아웃.
4. 폰트 원본, 한글 fallback, 로고·favicon 및 이미지 export 기준.
5. 카테고리 변형·popup·가로로 넘치는 카드의 동작과 motion 수치.

현재 문서는 확인된 관찰값과 미확정 목록을 제공하며, 미확정 값을 임의로 채운 완성형 디자인 시스템은 아니다.
