// fetch-news.js
import fs from 'fs';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const NEWS_COUNT = 25;
const OUTPUT_FILE = 'news.json';

async function fetchWineNews() {
  try {
    const response = await fetch("https://www.decanter.com/wine-news/");
    const html = await response.text();
    const root = parse(html);

    const articles = root.querySelectorAll("article");
    const newsItems = [];

    for (let i = 0; i < Math.min(NEWS_COUNT, articles.length); i++) {
      const article = articles[i];
      const aTag = article.querySelector('a');
      const title = aTag?.text.trim() || "Untitled";

      const href = aTag?.getAttribute('href');
      const url = href?.startsWith('http')
        ? href
        : (href ? `https://www.decanter.com${href}` : '');

      const excerpt = article.querySelector('p')?.text.trim() || '';

      const imgTag = article.querySelector('img');
      const image = imgTag?.getAttribute('data-src') ||
                    imgTag?.getAttribute('src') ||
                    `https://picsum.photos/seed/${i}/400/250`;

      const publishedAt = new Date().toISOString();

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

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(newsItems, null, 2), 'utf8');
    console.log(`✅ Fetched ${newsItems.length} news articles`);
  } catch (err) {
    console.error('❌ Failed to fetch news:', err);
  }
}

fetchWineNews();
