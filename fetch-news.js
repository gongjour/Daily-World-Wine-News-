// fetch-news.js
import fs from 'fs';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const NEWS_COUNT = 25;
const OUTPUT_FILE = 'news.json';

async function fetchWineNews() {
  const response = await fetch("https://www.decanter.com/wine-news/");
  const html = await response.text();
  const root = parse(html);

  const articles = root.querySelectorAll("article");

  const newsItems = [];

  for (let i = 0; i < Math.min(NEWS_COUNT, articles.length); i++) {
    const article = articles[i];
    const aTag = article.querySelector('a');
    const title = aTag?.text.trim() || "Untitled";
    const url = aTag?.getAttribute('href')?.startsWith('http') ? aTag.getAttribute('href') : `https://www.decanter.com${aTag.getAttribute('href')}`;
    const excerpt = article.querySelector('p')?.text.trim() || '';
    const publishedAt = new Date().toISOString(); // Decanter doesn't expose dates easily
    const image = article.querySelector('img')?.getAttribute('src') || `https://picsum.photos/seed/${i}/400/250`;

    newsItems.push({
      title,
      excerpt,
      url,
      source: "Decanter",
      publishedAt,
      emoji: "🍷",
      imageUrl: image
    });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(newsItems, null, 2));
  console.log(`✅ Fetched ${newsItems.length} news articles`);
}

fetchWineNews();
