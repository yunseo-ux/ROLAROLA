# ROLAROLA Website Renewal — 개발 준비

작성일: 2026-10-12.

> 이 문서는 초기 개발 준비 단계의 기록이다. 이후 사용자의 전체 레이아웃 구현 요청에 따른 현재 상태는 [Layout-implementation.md](./Layout-implementation.md)를 참고한다. 아래의 빈 placeholder·구현 전 설명은 초기 상태를 기록한 것이다.

## 1. 프로젝트 분석과 작업 범위

처음 확인한 작업 디렉터리는 숨김 파일 포함 0개 항목이며 `.git`, `package.json`도 없었다. 기존 프레임워크·라우팅·라이브러리·브랜드 문자열·내부 링크·중복 컴포넌트·재사용 코드를 조사할 대상이 없었다.
사용자 후속 지시에 따라 React + Vite / JavaScript / CSS 신규 개발 환경만 구성했다. 실제 메인·서브페이지 디자인은 구현하지 않았다. Git 초기화·commit·push·merge는 수행하지 않는다.

| 생성 범위 | 영향 |
| --- | --- |
| Vite 및 React 진입점, 패키지·설정 | 개발 서버와 production build 기반 |
| `/` 라우트와 HomePage | 빈 route placeholder만 표시 |
| SiteLayout | main + Outlet 슬롯; Header/Footer 시각 UI 없음 |
| CSS 변수·최소 reset | 관찰값 선언 및 box-sizing/body margin만 설정 |
| 사이트 메타데이터 | 타이틀·application-name·OG 이름 ROLAROLA |
| navigation 데이터 | Figma에 보이는 라벨과 출처만 기록; 미확정 href 없음 |
| 분석 문서 | IA·토큰·구조·미확정 항목 기록 |

## 2. 사이트 기본 정보

| 항목 | 현재 설정 / 확인 필요 |
| --- | --- |
| 프로젝트명 | ROLAROLA Website Renewal |
| 사이트명 / title | ROLAROLA |
| 국문명 | 로라로라 |
| description | ROLAROLA (로라로라); 정식 SEO 문구 승인 전 최소 식별값 |
| lang | ko; KR/EN 전환 경로·번역 방식 미확정 |
| 로고 | Figma에 traced vector 확인. 원본 승인·내보내기 전 파일 미생성 |
| favicon | 미제공; 임의 아이콘과 Vite 기본 로고를 추가하지 않음 |
| 배포 도메인 | 미확정; canonical·og:url·sitemap 절대 URL 미생성 |
| OG image | 원본 미제공; 임시 이미지 URL 미설정 |
| 기존 사이트 참고 | Figma 레퍼런스 `25:6`에 https://www.rolarola.com/main/index.php 기재. 새 배포 주소로 채택하지 않음; 실제 운영 상태 미검증 |
| 회사 정보 | 디자인의 ㈜바이와이제이·고객센터·이메일은 브랜드명 대체 대상이 아님. 운영자 승인 전 사이트 데이터에 복제하지 않음 |
| 외부 링크 | Instagram·Kakaotalk·Contact 라벨 확인; 실제 URL 미확정 |

## 3. Figma 및 IA 확인

출처: [PC main](https://www.figma.com/design/OQqcPoFp7oPmqpco4HZSvP/?node-id=179-2673), [Mobile](https://www.figma.com/design/OQqcPoFp7oPmqpco4HZSvP/?node-id=179-2224).
파일의 레퍼런스·와이어프레임·디자인 페이지 metadata를 조사하고 PC·모바일 design context와 스크린샷을 확인했다.
별도 IA로 명시된 노드는 식별하지 못했다. 아래 계층은 화면 근거를 정리한 것이며 승인된 전체 IA가 아니다.

### 등록한 페이지 및 라우팅

| 확인 페이지 | 컴포넌트 | 등록 경로 | 상태 |
| --- | --- | --- | --- |
| 메인 (PC / Mobile) | HomePage | `/` | 빈 placeholder; 디자인 구현 전 |

PC main 2개는 별도 URL로 만들지 않는다. 카테고리 상태·popup 프레임도 URL로 등록하지 않는다.
현재 React Router는 `/` index route만 등록한다. 다른 경로는 기본 router 미일치 처리이며 별도 404 페이지를 제작하지 않았다.

### 화면에서 확인된 메뉴·콘텐츠 계층

| 구분 / 1DEPTH | 확인된 2DEPTH / 요소 | 목적지·상세 상태 |
| --- | --- | --- |
| SHOP | VIEW ALL, NEW ARRIVALS, BEST, (NU)BASIC, MAISON DE ROLA, OUTWEAR, TOP, DRESS, BOTTOM, HOME | 홈의 SHOP BY CATEGORY에서 확인; 정식 SHOP 하위 IA·목록 페이지·경로 미확정 |
| ABOUT | 브랜드 소개 문구, hero ABOUT CTA | 독립 페이지인지 섹션 이동인지 미확정 |
| COLLECTION | ROLAROLA COLLECTION 카드, VIEW THE COLLECTION CTA | 목록·상세 화면·경로 미확정 |
| COMMUNITY | 헤더 라벨만 확인 | 2DEPTH / 상세 미확정 |
| 유틸리티 | SEARCH, LOGIN, CART, KR\|EN | 페이지·모달·외부 연결·언어 경로 미확정 |
| Footer | 이용안내, 이용약관, 개인정보처리방침, CONTACT US, INSTAGRAM, KAKAOTALK | 목적지·내부/외부 여부 미확정 |
| 상품 소개 CTA | VIEW DETAILS | 상품 상세 필요성은 나타나지만 상세 디자인·URL 미확정 |

회원가입·마이페이지·FAQ·공지·결제 등 확인되지 않은 페이지/메뉴는 추가하지 않았다.
상세 ID·slug 규칙과 `/shop`, `/about` 등의 추정 경로도 등록하지 않았다.

### Header / Navigation / Footer 설계

- `src/routes/routePaths.js`: 확인된 실제 경로만 단일 관리.
- `src/data/navigation.js`: 공통 메뉴 데이터 출처. 헤더/푸터는 각 표시 그룹을 사용하되 같은 항목의 label·destination은 중복 선언하지 않는다.
- 아직 링크가 없는 관찰 데이터는 메뉴 UI로 렌더링하지 않는다. `#`나 빈 문자열을 목적지로 대체하지 않는다.
- IA 확정 이후 항목별 `parentId`, `destination`(route / external / action), `placements`, `children`을 추가한다. 외부 링크와 언어 전환은 무조건 내부 페이지로 취급하지 않는다.
- Header와 Footer가 같은 IA를 사용한다는 것은 같은 데이터 원천을 공유한다는 뜻이며, 디자인에 없는 동일 메뉴를 양쪽에 강제로 추가한다는 뜻이 아니다.
- SiteLayout에 SiteHeader, PrimaryNavigation, SiteFooter를 연결하는 것은 실제 레이아웃 구현 단계에서 진행한다.

## 4. 네이밍·컴포넌트 구분

| 대상 | 규칙 | 예시 / 상태 |
| --- | --- | --- |
| 페이지 | PascalCase + Page | HomePage (빈 placeholder) |
| 공통 레이아웃 | PascalCase + 역할 | SiteLayout 생성; SiteHeader / SiteFooter / PrimaryNavigation 설계만 |
| 재사용 UI | PascalCase | ArrowLink / CollectionCard: 중복 UI 후보, 구현 전 |
| 홈 전용 UI | PascalCase + 역할 | HomeHero / BrandIntroductionSection / ShopCategorySection / CollectionSection: 분리 후보 |
| CSS 클래스 | kebab-case | site-main / collection-card |
| URL | kebab-case | `/`만 등록; 미확정 slug 생성하지 않음 |
| CSS 변수 | --rr-category-role | --rr-color-pink-100 |

레이아웃은 `components/layout`, 여러 페이지에서 재사용이 확인된 UI는 `components/common`, 홈 전용 UI는 향후 `pages/home/components`로 둔다.
반복 요소를 데이터로 표현하고, 페이지별 예외를 공통 컴포넌트에 무리하게 합치지 않는다. 디자인 확인 전 버튼·카드 파일을 빈 껍데기로 대량 생성하지 않았다.

## 5. 폴더 구조

```text
rolarola/
├─ package.json
├─ package-lock.json             # 설치 버전 고정
├─ vite.config.js
├─ index.html
├─ .gitignore
├─ README.md
├─ Design-token.md
├─ docs/
│  └─ Development-preparation.md
├─ public/                       # 승인된 favicon 등 공개 파일용, 현재 .gitkeep
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ components/
   │  ├─ common/                 # .gitkeep
   │  └─ layout/
   │     └─ SiteLayout.jsx
   ├─ pages/
   │  └─ HomePage.jsx
   ├─ assets/
   │  ├─ images/                 # .gitkeep
   │  ├─ icons/                  # .gitkeep
   │  └─ fonts/                  # .gitkeep
   ├─ styles/
   │  ├─ global.css
   │  └─ tokens.css
   ├─ routes/
   │  ├─ routePaths.js
   │  └─ router.jsx
   └─ data/
      ├─ site.js
      └─ navigation.js
```

## 6. 이미지·폰트·충돌 점검

- 로컬 에셋은 아직 없다. 깨진 로컬 이미지·폰트 경로와 임시 Figma 에셋 URL을 코드에 넣지 않았다.
- Figma 에셋 URL은 임시이므로 구현 때 승인된 파일로 내려받아 `src/assets` 또는 `public`에 보관한다.
- SVG 로고를 텍스트 폰트로 재현하지 않는다. favicon은 별도 승인된 소스가 필요하다.
- React/Vite 기본 데모·카운터·로고 파일은 생성하지 않았다.
- 기존 코드가 없으므로 기존 CSS·라우팅과의 충돌은 없다. 현재 전역 reset은 box-sizing / body margin으로 제한했다.
- React Router BrowserRouter 방식이므로 실제 정적 호스팅에서는 향후 등록될 경로의 새로고침 fallback을 확인해야 한다. 배포 플랫폼은 미확정이다.
- 사용자 요구인 PC/Tablet/Mobile 지원은 향후 구현 범위다. 현재 기본 구조에 반응형 화면이 구현됐다는 의미는 아니다.

## 7. 개발 전 확인 필요

1. 정식 IA와 메인 이외 페이지 범위·디자인·이동 목적지.
2. Tablet 전용 기준 및 breakpoint / 모바일 메뉴·푸터 축척 이상.
3. 폰트 파일·라이선스·한글 fallback·로고·favicon·OG 이미지.
4. 디자인의 bg3 PC/Mobile 색상 차이와 OUTWEAR 표기 의도.
5. popup·카테고리 상태·가로로 넘치는 카드 동작, transition·animation 수치.
6. 배포 도메인·SEO 문구·언어 전환·상품 데이터 및 서비스 연동 범위.

미확정 항목은 디자인 구현 단계에 영향을 주며, 현재 개발 환경 초기화를 막는 항목은 아니다.

## 8. 검증 결과

- Node.js 24.18.0; React 19.3.0, React DOM 19.3.0, React Router DOM 7.18.4, Vite 8.3.4, React plugin 6.1.2 설치. package-lock.json 생성.
- `npm.cmd run build` 성공: 29 modules transformed, dist 생성. node_modules와 dist는 .gitignore 대상이다.
- Vite 개발 서버 시작 성공; `/`, `/src/main.jsx`, `/src/routes/router.jsx` HTTP 200 확인. HTML title ROLAROLA 확인.
- src와 index.html에서 외부 URL·href·@font-face·@media 검색 결과 없음. 미승인 배포 도메인이나 에셋 경로를 연결하지 않았다.
- npm 설치 시 audit 결과 취약점 0개. 이는 설치 당시 패키지 보고 결과다.
- 실제 UI를 구현하지 않았으므로 브라우저 시각 검증·반응형 검증·기능 E2E 테스트는 수행 대상이 아니다. HTTP 응답 검증은 브라우저 렌더링 검증을 대신하지 않는다.
