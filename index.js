const { fetchUAMNews } = require('./services/newsService');
const { summarizeArticles } = require('./services/summaryService');
const { sendSummaryEmail } = require('./services/mailService');
require('dotenv').config();

async function main() {
  console.log('🚀 UAM News Summarizer 시작...');

  try {
    // 1. Fetch News
    console.log('📰 최신 UAM 뉴스 수집 중...');
    const articles = await fetchUAMNews();
    console.log(`${articles.length}개의 기사를 찾았습니다.`);

    if (articles.length === 0) {
      console.log('새로운 뉴스가 없습니다. 종료합니다.');
      return;
    }

    // 2. Summarize with AI
    console.log('🤖 AI 요약 생성 중...');
    const summary = await summarizeArticles(articles);
    console.log('요약 완료!');

    // 3. Send Email
    console.log('📧 이메일 발송 중...');
    await sendSummaryEmail(summary, articles);
    console.log('✅ 모든 작업이 완료되었습니다.');

  } catch (error) {
    console.error('❌ 작업 도중 오류가 발생했습니다:', error.message);
  }
}

main();
