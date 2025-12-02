# 결제/가맹점 대시보드 - 입사 과제

## 프로젝트 개요
결제대행사(PG) 도메인에 특화된 대시보드 페이지입니다.
recruit.paysbypays.com API를 활용하여 가맹점, 거래내역, 정산 등을 시각화합니다.

## 기술 스택
- **Runtime**: Node.js 20.15.0
- **Frontend**: React 19, Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Package Manager**: npm

## 사용 템플릿/라이브러리

### Tailadmin
- **이름**: Tailadmin
- **출처**: https://tailadmin.com
- **사용 부분** (그대로 사용):
  - 전체 레이아웃 구조 (헤더, 사이드바, 메인 컨텐츠)
  - 기본 UI 컴포넌트 (테이블, 카드, 버튼 등)
  - Tailwind 기본 스타일링
  
- **커스터마이징한 부분**:
  - API 통합 (recruit.paysbypays.com 데이터 연동)
  - 대시보드 메인 페이지 (거래 통계, 주요 지표)
  - 거래내역 리스트 페이지 (필터링, 검색)
  - 가맹점 조회 페이지

## 디자인 의도 및 UI/UX 포인트

1. **직관적인 정보 구조**: 결제 현황을 한눈에 파악할 수 있도록 주요 지표를 상단에 배치
2. **효율적인 데이터 탐색**: 테이블 기반의 거래내역으로 필터링/검색 용이
3. **일관된 디자인**: Tailadmin 기반으로 전문적이고 통일된 UI 제공

## 주요 구현 페이지

- **대시보드**: 거래 통계, 매출 현황
- **거래내역**: 거래 리스트 조회, 상세 정보
- **가맹점**: 가맹점 정보 조회
- *(추가): 정산 현황, 거래 분석 등*

## 설치 및 실행

```bash
npm install
npm run dev
```

## 폴더 구조

```
src/
├── app/              # Next.js 라우트
├── components/       # 재사용 가능한 컴포넌트
├── hooks/            # 커스텀 훅
├── lib/              # 유틸리티 함수
└── styles/           # 전역 스타일
```
