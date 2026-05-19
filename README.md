# UAM News Summarizer

최신 UAM(도심 항공 모빌리티) 뉴스를 수집하여 AI가 요약한 리포트를 이메일로 보내주는 프로그램입니다.

## 🛠 사전 준비 사항

프로그램을 실행하기 위해 다음 세 가지 설정이 필요합니다.

### 1. GNews API 키 발급
1. [gnews.io](https://gnews.io/)에 접속하여 회원가입합니다.
2. 대시보드에서 무료 API Key를 복사합니다.

### 2. Google Gemini API 키 발급
1. [Google AI Studio](https://aistudio.google.com/)에 접속합니다.
2. "Get API key"를 클릭하여 새 API Key를 생성하고 복사합니다.

### 3. 네이버 메일 설정 (SMTP & 앱 비밀번호)
1. 네이버 메일 로그인 -> 왼쪽 하단 '환경설정' -> 'POP3/IMAP 설정' 클릭
2. 'IMAP/SMTP 설정' 탭에서 'IMAP/SMTP 사용'을 **사용함**으로 변경하고 저장합니다.
3. 네이버 계정 보안 설정 -> '2단계 인증' 사용 중인지 확인합니다.
4. '2단계 인증' 설정 내 '애플리케이션 비밀번호' 생성 메뉴에서 **비밀번호 생성**을 클릭합니다.
5. 종류를 '직접 입력(예: NewsApp)'으로 선택하고 생성된 12자리 비밀번호를 복사합니다. (이 비밀번호가 실제 메일 비밀번호 대신 사용됩니다.)

## 🚀 설치 및 실행 방법

1. `.env.example` 파일을 복사하여 `.env` 파일을 생성합니다.
   ```bash
   cp .env.example .env
   ```
2. `.env` 파일에 위에서 준비한 API 키와 정보를 입력합니다.
   - `GNEWS_API_KEY`: GNews API 키
   - `GEMINI_API_KEY`: Gemini API 키
   - `EMAIL_PASS`: 네이버에서 생성한 **앱 비밀번호** (12자리)

3. 의존성 라이브러리를 설치합니다.
   ```bash
   npm install
   ```

4. 프로그램을 실행합니다.
   ```bash
   node index.js
   ```

## ☁️ 컴퓨터가 꺼져 있어도 자동 실행하기 (GitHub Actions)

이 프로그램은 GitHub 서버에서 매일 아침 8시에 자동으로 실행되도록 설정되어 있습니다.

### 1. GitHub 저장소 생성 및 코드 업로드
1. [GitHub](https://github.com/)에 새 저장소(Repository)를 만듭니다 (비공개/Private 권장).
2. 이 폴더의 모든 파일을 저장소에 업로드(Push)합니다.

### 2. GitHub Secrets 설정 (필수!)
API 키와 비밀번호를 GitHub에 안전하게 등록해야 프로그램이 작동합니다.
1. GitHub 저장소 페이지의 **Settings** -> **Secrets and variables** -> **Actions**로 이동합니다.
2. **New repository secret** 버튼을 눌러 아래 5개를 각각 등록합니다.
   - `GNEWS_API_KEY`: GNews API 키
   - `GEMINI_API_KEY`: Gemini API 키
   - `EMAIL_USER`: 961855@naver.com
   - `EMAIL_PASS`: 네이버 앱 비밀번호 (12자리)
   - `EMAIL_TO`: 961855@naver.com

### 3. 작동 확인
1. 저장소의 **Actions** 탭으로 이동합니다.
2. 왼쪽 메뉴에서 `Daily UAM News Summarizer`를 선택합니다.
3. **Run workflow** 버튼을 눌러 수동으로 즉시 실행해 볼 수 있습니다.
4. 성공하면 매일 아침 8시(한국 시간)에 자동으로 메일이 발송됩니다.

