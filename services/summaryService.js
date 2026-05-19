const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function summarizeArticles(articles) {
  if (!articles || articles.length === 0) {
    return '최근 UAM 관련 뉴스가 없습니다.';
  }

  const articlesText = articles.map((a, i) => `[기사 ${i + 1}]\n제목: ${a.title}\n내용 요약: ${a.description}`).join('\n\n');

  const prompt = `
당신은 UAM(도심 항공 모빌리티) 전문 분석가입니다. 아래 제공된 기사 목록을 바탕으로 오늘자 UAM 뉴스 브리핑을 작성해주세요.

작성 가이드라인:
1. 각 기사의 핵심 내용을 1-2문장으로 요약해주세요.
2. 전체적인 산업 동향이나 눈여겨볼 점을 '핵심 요약(Key Takeaway)' 섹션으로 정리해주세요.
3. 한국어로 작성하며, 전문적이면서도 읽기 쉬운 어조를 유지하세요.

제공된 기사:
${articlesText}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error summarizing articles:', error.message);
    return '요약 생성 중 오류가 발생했습니다.';
  }
}

module.exports = { summarizeArticles };
