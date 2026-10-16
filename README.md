# ROLAROLA Website Renewal

HTML, CSS, JavaScript로 구성한 로라로라 사이트입니다. React나 JSX 없이 동작합니다.

## 실행

`index.html`을 브라우저에서 바로 열 수 있습니다. 이미지와 폰트도 로컬 파일을 사용합니다.

개발 서버를 사용하려면:

```sh
npm install
npm run dev
```

배포 파일 생성 및 미리보기:

```sh
npm run build
npm run preview
```

`dist` 폴더를 정적 호스팅에 업로드하면 됩니다. PowerShell에서 실행 정책 오류가 나면 `npm.cmd`를 사용하세요.

## 파일 구성

- `index.html`: 헤더, 메인 섹션, 상품 카드, 푸터
- `src/main.js`: 모바일 메뉴, 카테고리 미리보기, 상품 팝업, 드래그, 컬렉션 이동, 사진 등장 효과
- `src/styles/`: 폰트, 디자인 토큰, 공통 스타일, 반응형 레이아웃
- `src/assets/`: 기존 이미지와 로컬 폰트

기존 디자인과 반응형 레이아웃을 유지했습니다. 기존에 연결되지 않았던 로그인, 장바구니, 상품 상세 등의 버튼은 비활성 상태입니다.

## 검증

개발 서버 실행 후 `node scripts/verify-layout.mjs`와 `node scripts/verify-category-hover.mjs`로 레이아웃과 카테고리 동작을 확인합니다. Playwright와 Chrome이 필요합니다.
