# 편집 안내 (Candela Lighting Lab 사이트)

수정 후에는 항상 저장소 폴더에서:
```bash
git add -A && git commit -m "수정 내용" && git push origin main
```
→ 1분쯤 뒤 https://candelalightinglab.github.io 에 자동 반영됩니다.

---

## 📸 1. 기존 프로젝트에 사진 추가

**2곳**만 고치면 됩니다.

1) **사진 파일 넣기** — 해당 프로젝트 폴더에 이미지 복사
   `assets/images/projects/<프로젝트이름>/`
   예: `assets/images/projects/seoul-craft-museum/seoul-craft-museum-09.jpg`
   - 파일명은 자유지만 `프로젝트이름-09.jpg`처럼 이어서 붙이면 깔끔합니다.
   - 사진이 옆으로 눕거나 큰 경우: 미리 회전 보정 + 가로 2000px 정도로 줄이면 좋습니다(선택).

2) **목록에 파일명 추가** — `_projects/<프로젝트이름>.md` 파일의 `images:` 밑에 한 줄 추가
   ```yaml
   images:
     - seoul-craft-museum-01.jpg
     - seoul-craft-museum-02.jpg
     - seoul-craft-museum-09.jpg   # ← 추가
   ```
   - 슬라이드 갤러리에 **적은 순서대로** 나옵니다. 순서 바꾸려면 줄 순서를 바꾸세요.
   - `cover:` 를 새 사진으로 바꾸면 대표(썸네일) 이미지가 바뀝니다.

---

## 🆕 2. 새 프로젝트 추가

**2곳**을 만들면 자동으로 목록·페이지가 생깁니다.

1) **사진 폴더 만들기** — `assets/images/projects/<새프로젝트이름>/` 폴더를 만들고 사진을 넣습니다.
   - `<새프로젝트이름>`(slug)은 영문 소문자·하이픈만. 예: `busan-museum`

2) **프로젝트 파일 만들기** — `_projects/<새프로젝트이름>.md` 를 만듭니다.
   기존 파일 하나(`_projects/seoul-craft-museum.md`)를 복사해서 고치는 게 가장 쉽습니다:
   ```yaml
   ---
   slug: busan-museum                 # 폴더 이름과 똑같이
   title: "Busan Museum"              # 화면에 보일 영문 제목
   title_kr: "부산박물관"              # 참고용(화면 미표시)
   category: "Museum"                 # 분류 (타일·상단에 표시)
   location: "Busan, Korea"           # 위치
   region: kr                         # kr = Korea/Asia 섹션, us = New York/USA 섹션
   order: 10                          # 정렬 순서(숫자 작을수록 앞). 같은 region 안에서 정렬
   draft: false                       # true 로 두면 숨김(공개 안 됨)
   cover: busan-museum-01.jpg         # 타일 대표 이미지
   images:
     - busan-museum-01.jpg
     - busan-museum-02.jpg
   ---

   여기에 프로젝트 설명을 씁니다. 여러 문단·**굵게**·목록 가능.
   (이 글이 슬라이드 갤러리 밑에 표시됩니다.)
   ```
   → 저장하면 `Projects` 페이지 그리드와 `/projects/busan-museum/` 페이지가 자동 생성됩니다.

3) (선택) **히어로에 넣기** — 첫 화면 슬라이드에 넣고 싶으면 `_data/copy.yml` 의 `home.hero_slides` 에 한 줄 추가:
   ```yaml
   hero_slides:
     - { project: busan-museum, image: busan-museum-01.jpg }
   ```

---

## ✏️ 3. 페이지별 문구(텍스트) 수정 — 어디를 고치나

대부분의 페이지 문구는 **`_data/copy.yml` 한 파일**에 모여 있습니다.
아래에서 "화면의 어떤 문구"가 "어느 항목"인지 찾아 고치면 됩니다.
(`kicker` = 각 제목 위의 작은 대문자 라벨, `intro` = 제목 밑 설명 문장)

### 🏠 홈 (index.html + `_data/copy.yml` 의 `home:`)
| 화면 문구 | 위치 |
|---|---|
| 첫 화면 큰 문구 "Light that reveals the object." | `copy.yml` → `home: hero_title` |
| 그 위 작은 라벨 | `home: hero_kicker` |
| 그 밑 한 줄 소개 | `home: hero_sub` |
| 히어로 배경 사진(슬라이드) | `home: hero_slides` (project·image 목록) |
| 중간 소개 제목 "Lighting for museums…" | `home: intro_heading` |
| 그 위 라벨 "Candela Lighting Lab" | `home: intro_kicker` |
| 소개 본문 문단 | `home: intro_body` |
| 작품 섹션 라벨 "Selected Work" / "Korea & Asia" | **`index.html`** (`<h2>Selected Work</h2>`, `<span class="count">`) |
| "All projects — …" 버튼 글자 | **`index.html`** (맨 아래 `btn-line`) |

### 📁 Projects 목록 (projects.html + `copy.yml` 의 `projects:`)
| 화면 문구 | 위치 |
|---|---|
| 페이지 상단 라벨 / 설명 | `projects: kicker` / `projects: intro` |
| 섹션 제목 "Recent Work — Korea & Asia" | **`projects.html`** (`<h2>`) |
| 섹션 제목 "New York / USA — with CBB" | **`projects.html`** (`<h2>`) |
| 각 프로젝트 카드의 제목·분류·위치 | 해당 `_projects/<이름>.md` 의 `title`·`category`·`location` |

### 🖼 개별 프로젝트 페이지 (`_projects/<이름>.md`)
| 화면 문구 | 위치 |
|---|---|
| 제목 / 분류·위치 라벨 | `.md` 위쪽 `---` 안의 `title` / `category`·`location` |
| 슬라이드 갤러리 밑 **설명 글** | `.md` 아래쪽 `---` **뒤 본문** (여러 문단·마크다운 가능) |

### 👤 About (about.html + `copy.yml` 의 `about:`)
| 화면 문구 | 위치 |
|---|---|
| 상단 라벨 / 설명 | `about: kicker` / `about: intro` |
| 굵은 소개 문단(가운데) | `about: lede` |
| 학력·경력·강의 목록 | **`about.html`** (`<dl class="cv-block">` 안의 `<dd>` 줄들) |

### 🎛 Expertise (expertise.html + `copy.yml` 의 `expertise:`)
| 화면 문구 | 위치 |
|---|---|
| 상단 라벨 / 설명 | `expertise: kicker` / `expertise: intro` |
| "Calculation & simulation" 제목 / 그 밑 문장 | `expertise: sim_heading` / `expertise: sim_body` |
| 5단계(Site Research…Construction Administration) 항목 | **`expertise.html`** (`<div class="phase">` 블록들) |

### ✉️ Contact (contact.html + `copy.yml` 의 `contact:`)
| 화면 문구 | 위치 |
|---|---|
| 상단 라벨 / 설명 | `contact: kicker` / `contact: intro` |
| 카드 밑 작은 글씨(회사명·직함) | `contact: note` |
| **이메일 주소** | `_config.yml` 의 `email` |

---

> **참고**
> - `_data/copy.yml` 안에는 각 항목마다 주석(설명)이 달려 있으니 그대로 값만 바꾸면 됩니다.
> - 마크다운(`**굵게**` 등)은 `about: lede`, 프로젝트 설명 본문에서 됩니다. 나머지 짧은 문구는 그냥 글자만 바꾸세요.
> - `_data/` 안의 `photo-curation*`, `cv-*`, `projects-bilingual`, `company-profile*` 등은 작업 기록/참고 자료이며 사이트에는 나오지 않습니다.
> - 문구에 `<br>`(줄바꿈), `&amp;`(&) 같은 표기가 보이면 그대로 두고 글자만 바꾸면 됩니다.
