const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'naver',
  host: 'smtp.naver.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendSummaryEmail(summary, articles) {
  const date = new Date().toLocaleDateString('ko-KR');
  
  // HTML Template
  let articlesHtml = articles.map(a => `
    <div style="margin-bottom: 20px; border-left: 4px solid #03C75A; padding-left: 15px;">
      <h3 style="margin: 0 0 10px 0;"><a href="${a.url}" style="color: #03C75A; text-decoration: none;">${a.title}</a></h3>
      <p style="margin: 0; color: #666; font-size: 14px;">${a.description}</p>
      <small style="color: #999;">출처: ${a.source.name}</small>
    </div>
  `).join('');

  const htmlContent = `
    <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <h1 style="color: #03C75A; border-bottom: 2px solid #03C75A; padding-bottom: 10px;">🛸 오늘자 UAM 뉴스 브리핑 (${date})</h1>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="margin-top: 0; font-size: 18px;">🤖 AI 요약 리포트</h2>
        <div style="white-space: pre-wrap; line-height: 1.6;">${summary}</div>
      </div>

      <h2 style="font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px;">📰 주요 기사 원문</h2>
      ${articlesHtml}

      <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
        이 메일은 UAM News Summarizer에 의해 자동으로 생성되었습니다.
      </footer>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `[UAM 뉴스] ${date} 브리핑 및 요약 리포트`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = { sendSummaryEmail };
