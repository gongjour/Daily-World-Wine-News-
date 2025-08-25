// fetch-news.js
const fs = require("fs");
const axios = require("axios");
const dayjs = require("dayjs");

// 예시 기사들 (실제 크롤링 로직은 API 또는 RSS에서 작성 가능)
const news = [
  {
    title: "2025 수확량 급증 기대",
    source: "Decanter",
    excerpt: "부르고뉴와 샹파뉴 생산량 급등 예상",
    url: "https://www.decanter.com/fake-news-link-1",
    emoji: "🍇",
    publishedAt: dayjs().format()
  },
  {
    title: "소믈리에가 말하는 과대평가 와인",
    source: "VinePair",
    excerpt: "18인의 소믈리에가 언급한 와인 리스트",
    url: "https://www.vinepair.com/fake-news-link-2",
    emoji: "🍷",
    publishedAt: dayjs().format()
  }
];

fs.writeFileSync("news.json", JSON.stringify(news, null, 2), "utf-8");
console.log("✅ news.json updated");
