# 결제/가맹점 대시보드 - 입사 과제

## 프로젝트 개요
결제대행사(PG) 도메인에 특화된 관리자용 대시보드 웹 애플리케이션입니다.  
`recruit.paysbypays.com` API를 기반으로 결제 현황, 거래 리스트, 가맹점 정보 등을 조회하고 필터링할 수 있도록 구현했습니다.

## 기술 스택
- **Runtime**: Node.js 20.15.0
- **Frontend**: React 19, Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Package Manager**: npm
- **State / Data Fetching**: React Query 기반 커스텀 훅 구조
- **Chart**: react-chartjs-2

## 사용 템플릿/라이브러리

### Tailadmin
- **이름**: Tailadmin
- **출처**: https://tailadmin.com
- **사용 부분** (그대로 사용):
  - 전체 레이아웃 구조 (헤더, 사이드바, 메인 컨텐츠)
  - 기본 UI 컴포넌트 스타일 및 Tailwind config
  - 공통 UI 컴포넌트 (Badge 등)
  
- **커스터마이징한 부분**:
  - API 연동을 위한 데이터 fetch 로직 및 React Query 기반 훅 구현
  - 대시보드 지표 컴포넌트 추가 (도넛 차트, 주요 통계 카드)
  - 도넛 차트 클릭 시 필터 연동 기능
  - 거래내역 리스트 페이지 전체 구현
    - 필터(상태/결제수단), 검색, 페이지네이션
    - URL query 기반 필터 유지
  - 가맹점 리스트 페이지 전체 구현
    - 상태/업종 필터, 검색, 페이지네이션
    - 테이블 행 클릭 시 상세 모달 표시
  - Table 컴포넌트 확장
    - onClick 이벤트 지원하도록 수정
    - 리스트 Row 클릭 활성화

### react-chartjs-2 / Chart.js
- **이름**: react-chartjs-2, chart.js
- **출처**:
  - https://github.com/reactchartjs/react-chartjs-2
  - https://www.chartjs.org/
- **사용한 부분 (그대로 사용)**
  - DoughnutChart 컴포넌트 구현
  - 차트 렌더링 및 애니메이션
- **커스터마이징한 부분**
  - 도넛 차트 클릭 이벤트(onClick) 활용해 필터 연동 기능 구현
   도넛 차트 색상/레이블을 프로젝트 도메인에 맞게 재구성
  - Chart.js 옵션 커스터마이징

## 디자인 의도 및 UI/UX 포인트

1. **데이터 중심 대시보드 구성**  
중요한 거래 정보를 빠르게 확인할 수 있도록 통계 카드 및 도넛 차트를 헤더 영역 아래에 배치.

2. **사용자 행동 흐름 최적화**  
도넛 차트 클릭 → 해당 상태의 거래 리스트로 즉시 이동하도록 연결.

3. **효율적인 데이터 탐색**  
거래 목록과 가맹점 목록에 필터·검색·페이지네이션을 제공하여 실제 운영환경에서 필요한 조회 UX를 구현.

4. **일관된 UI 사용**  
TailAdmin 기반으로 전체적인 레이아웃과 컴포넌트 스타일을 통일해 가독성과 유지보수성을 높임.

## 주요 구현 페이지

### ✅ 대시보드
- 전체 거래 수, 성공/실패 현황 등 주요 지표 카드
- react-chartjs-2 기반 도넛 차트
- 도넛 조각 클릭 시 거래내역 필터링 페이지로 이동

### ✅ 거래내역 페이지
- 전체/상태/결제수단 필터
- 가맹점코드 및 결제코드 검색 기능
- 페이지네이션
- status code & type code API 기반의 라벨 매핑 적용
- URL query 기반 필터 유지 기능

### ✅ 가맹점 리스트 페이지
- 가맹점 상태/업종/검색 기능 제공
- 테이블 Row 클릭 시 상세 정보 모달 표시
- 페이지네이션
- Status code API 기반 라벨 매핑

## 설치 및 실행

```bash
npm install
npm run dev
```
