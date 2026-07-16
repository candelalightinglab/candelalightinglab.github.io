# CandelaLightingLab — Website

백승주 소장(2018–)의 건축·박물관/전시 조명 디자인 스튜디오 홈페이지.
커스텀 Jekyll + GitHub Pages. 다크·미니멀 테마, 영문 위주.

- 배포 예정: https://candelalightinglab.github.io
- 계획 원본: Dropbox `…/Joo/CandelaLightingLab_웹사이트_계획.md`

## 구조
```
Home       다크 히어로(국내 대표작) + 회사명 + 태그라인 → 국내 최신작 프리뷰
Projects   ▸ Recent Work (Korea)          ← 전면·주력
           ▸ New York / USA (with CBB)    ← 별도 과거 섹션
Expertise  건축조명 · 박물관/전시조명 · 라이팅 컨설팅
About      백승주 소장 (Parsons MFA Lighting · 前 NY CBB)
Contact    (공개용 연락처 — 확정 필요)
```

## 자료 원칙 (중요)
- 원본 대량 자료(사진·도면)는 Dropbox `Joo` 폴더에 그대로 두고,
  **선별한 대표 사진만** 이 저장소 `assets/images/`로 복사한다.
- Joo 폴더의 개인·법률·가족 문서는 **절대 사용하지 않는다.**
- 개인 연락처는 공개 사이트에 넣지 않는다.

## 로컬 실행
```bash
bundle install
bundle exec jekyll serve
```

## 착수 전 필요한 것
1. 회사 정식 명칭 확정 (+ 로고)
2. 공개 가능한 연락처
3. GitHub 계정 `candelalightinglab` + `candelalightinglab.github.io` 저장소 + PAT
