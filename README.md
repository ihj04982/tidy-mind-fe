# 🧠 Tidy Mind

AI 기반 개인 메모 및 할 일 관리 애플리케이션

> 빠르게 메모하고, 자동으로 분류되며, 실행 가능한 형태로 정리되는 생산성 애플리케이션

---

## 🔗 Demo

- [Live Demo](https://tidymind-ai.vercel.app/)

---

## 📌 Features

### 🧠 AI 기반 메모 입력

- AI 자동 분류: 입력 내용을 기반으로 Task / Reminder / Idea / Personal / Goal 등으로 분류
- 이미지 업로드: Cloudinary 연동, 드래그 앤 드롭 / 미리보기 / 삭제 지원
- 음성 입력: 마이크 클릭으로 실시간 음성 → 텍스트 변환 (`react-speech-recognition`)

### 📚 컬렉션

- 날짜 그룹화: 오늘 / 어제 / 7일 이내 / 기타 기준 자동 분류
- 카테고리 필터: 원하는 카테고리만 선택 가능
- 메모 편집: 상세 보기, 제목/내용/카테고리/이미지 수정 가능

### 📅 캘린더

- 일정 시각화: FullCalendar 기반 UI에서 Task / Reminder를 날짜별 표시
- Heatmap: 월별 완료 항목 수를 색상 강도로 표현
- Task Board: 월별 할 일 목록 표시, 미완료 우선 정렬, 체크박스로 완료 처리


### 🔐 인증

- 기본 로그인: 이메일/비밀번호 기반
- 소셜 로그인: Google OAuth 연동
- 보호 라우팅: 인증되지 않은 접근 차단

### 💡 UI/UX

- 테마: 다크 / 라이트 모드 전환 지원
- 반응형: 모바일 / 태블릿 / 데스크톱 대응
- 피드백: 작업 완료 및 에러에 대한 토스트 알림 제공

---

## ⚙️ Tech Stack

| 항목           | 기술                                       |
|----------------|--------------------------------------------|
| **Frontend**   | React 19, Vite 7                           |
| **State**      | Redux Toolkit                              |
| **Routing**    | React Router DOM 7                         |
| **UI**         | MUI 7, Emotion                             |
| **Calendar**   | FullCalendar, daygrid                      |
| **Speech**     | react-speech-recognition                   |
| **Image**      | Cloudinary                                 |
| **Auth**       | react-oauth/google                         |
| **Utils**      | date-fns, axios, lucide-react              |
| **Linting**    | ESLint 9, Prettier 3, Husky, lint-staged   |

---

## 📸 Screenshots

| 메인 입력창                                       | 컬렉션                                         | 캘린더 뷰                                       |
|--------------------------------------------------|------------------------------------------------|------------------------------------------------|
| ![main](https://images.tango.us/workflows/b068e900-49f2-42e4-8a12-f990a7d1c376/steps/320ce543-842b-422b-bb43-0690ecce4474/d65e7f02-2af3-441b-b02a-d3dee52adb37.png?mark-x=499&mark-y=511&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz01NDEmaD03NCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)     | ![col](https://images.tango.us/workflows/b068e900-49f2-42e4-8a12-f990a7d1c376/steps/b595efdc-1119-4a41-b09d-aa760fd48e3e/dbb45f74-e869-4674-9469-300ea292c4e4.png?mark-x=909&mark-y=410&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz00NTkmaD0xMTUmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)   | ![cal](https://images.tango.us/workflows/b068e900-49f2-42e4-8a12-f990a7d1c376/steps/18f7f6e3-b9d7-4f7a-a25c-e034b7cef79f/3bf9f459-6167-4b64-b1db-aef0bb848660.png?mark-x=223&mark-y=76&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTMlMkNGRjc0NDImdz04NjQmaD04MzEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)   |


---

## 👤 Contributors

- [bytesbyt](https://github.com/bytesbyt)
- [ihj04982](https://github.com/ihj04982)
- [JiHy0ung](https://github.com/JiHy0ung)
- [junsu0573](https://github.com/junsu0573)
