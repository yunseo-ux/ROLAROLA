# ROLAROLA 전체 레이아웃 구현

2026-10-12 사용자 요청에 따라 개발 준비 단계에서 메인 레이아웃 구현 단계로 진행했다.
근거: [Figma main 179:2673](https://www.figma.com/design/OQqcPoFp7oPmqpco4HZSvP/?node-id=179-2673).

## 구현 범위

- SiteLayout에 SiteHeader / SiteFooter 연결.
- HomePage에 hero, 브랜드 소개, 2026 SUMMER 1ST 상품 소개, 브랜드 디테일, SHOP BY CATEGORY, 캠페인 비주얼, WHY NOT FRIENDS / 룩북, 컬렉션 목록 구현.
- ArrowLink / ProductStory / CollectionSection 분리. 기존 색·폰트·간격 토큰 재사용.
- Figma design context의 원본 SVG 에셋 39개를 src/assets/images에 저장. homeAssets.js가 지역 파일 import를 단일 관리한다. 사진 SVG는 원본 내부 이미지와 크롭을 보존했으며 화면 전체 스크린샷을 구현 에셋으로 사용하지 않았다.
- JetBrains Mono 500/600, Roboto 400, Pretendard 500을 npm 패키지에서 로컬 로딩. 외부 폰트 CDN 사용 없음.
- 실제 `/` 경로 유지. 새 페이지나 배포 도메인 추가 없음.

## 동작과 미확정 링크

- SHOP / ABOUT / COLLECTION: 현재 홈의 해당 섹션으로 이동. 최종 IA 승인 후 독립 페이지로 연결할 수 있다.
- 모바일 메뉴: 열기·닫기 / aria-expanded / 섹션 이동 후 닫기.
- 컬렉션: 가로 스크롤과 PREVIOUS / NEXT 버튼. 키보드 포커스 및 reduced-motion 대응.
- WHY NOT FRIENDS 착장 목록: 가로 스크롤.
- 상품 상세·로그인·검색·장바구니·언어 전환·COMMUNITY·정책·소셜 목적지는 미확정이므로 새 URL을 생성하지 않았다. 해당 버튼은 비활성 상태다.
- 푸터 회사·고객센터 정보는 Figma 표기대로 반영했다. 실제 운영 정보의 최신 여부는 배포 전 확인해야 한다.

## 반응형 구현상 판단

- 1920px에서 Figma의 8개 메인 섹션 시작 위치·높이를 맞췄다. Grid/Flex 흐름을 사용하며 사진 위 문구·장식에 한해 absolute 배치를 사용했다.
- Tablet 전용 시안이 없어 701~1100px은 현재 PC 구성을 조정한 임시 대응 구간이다. 공식 Figma breakpoint가 아니다.
- 700px 이하는 세로 흐름을 사용한다. 402px 시안의 색·타이포그래피·대표 간격·카드 크기를 참고했다.
- 모바일 헤더·푸터는 원본의 1px대 글자와 15px대 헤더를 그대로 복사하지 않았다. 가독성과 조작을 위한 메뉴와 푸터 크기는 구현상 선택이며 최종 디자인 승인이 필요하다.
- 모바일 사진은 로컬 원본 SVG에 object-fit을 적용했다. 별도 모바일 전용 crop·아트 디렉션은 확인 필요하다.
- Figma에서 확인되지 않은 모션 수치를 디자인 토큰으로 추가하지 않았다. 브라우저 기본 smooth scroll은 reduced-motion 환경에서 비활성 처리한다.

## 검증

- production build 성공.
- Chrome에서 1920 / 1024 / 402 / 320px 검증. 각 화면 이미지 51개 정상 로딩, JavaScript 오류 없음, 페이지 수평 넘침 없음, 깨진 섹션 앵커 없음.
- 컬렉션 NEXT 스크롤, 모바일 메뉴 열기·닫기 확인.
- 1920px 섹션 y/height: Hero 0/1110, Brand 1110/968, Summer 2078/2772, Details 4850/1004, Category 5854/1268, Romance 7122/1089, Friends 8211/2033, Collection 10244/1050.
- 검증 스크립트: scripts/verify-layout.mjs. 결과·스크린샷: artifacts/ (Git 제외).
- Git commit / push / merge 수행 없음.

## 남은 확인

### 후속 con4 호버 구현

- `ShopCategorySection.jsx`와 `src/data/categories.js`로 카테고리 섹션을 분리했다.
- Figma 활성 상태: VIEW ALL `160:1313`, NEW ARRIVALS `307:794`, BEST `307:846`, (NU)BASIC `307:898`, MAISON DE ROLA `307:950`, OUTWEAR `307:1002`, TOP `307:1054`, DRESS `308:1016`, BOTTOM `308:1068`, HOME `308:1120`.
- 각 프레임의 사진을 `src/assets/images/category-*.svg` 10개로 저장했다. 새 이미지·메뉴·URL을 임의 생성하지 않았다.
- 기본 상태에는 사진이 없다. 마우스 호버 시 해당 사진과 전폭 분홍색 행 배경이 나타나며, 항목을 벗어나면 해제된다.
- 키보드 Tab 포커스에도 동일한 사진을 표시하며 Escape 또는 목록 밖 포커스 이동으로 해제한다.
- 모바일은 탭으로 사진 표시/해제. PC 호버 사진을 좁은 화면 오른쪽에 배치하며 작은 화면에서는 크기를 줄였다.
- PC 사진 geometry: x=64, y=712, width=302, height=343. 강조 띠 geometry: x=0, y=408+66×index, width=1920, height=66. 색 #FFE8EC.
- `scripts/verify-category-hover.mjs`에서 10개 이미지 매핑·원본 파일 존재·geometry·마우스 해제·키보드·402/320px 터치 동작·JavaScript 오류 없음 검증.

### 계속 확인할 항목

정식 IA·독립 페이지 경로, Tablet 디자인, 모바일 메뉴·푸터 최종 크기, 이미지 export 최적화, favicon, 서비스/API 연동, 배포 도메인.
원본 사진 SVG가 합계 약 22.7MB이므로 현재 레이아웃 확인에는 적합하지만 배포 전 승인된 원본에서 WebP/AVIF 등 최적화 작업이 필요하다. 현재는 원본 에셋을 변경하지 않았다.
