import { blogService } from '@/service/blog-service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const feed = await blogService.generateRSSFeed();
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${feed.title}]]></title>
    <description><![CDATA[${feed.description}]]></description>
    <link>${feed.link}</link>
    <language>${feed.language}</language>
    <lastBuildDate>${feed.lastBuildDate}</lastBuildDate>
    <atom:link href="${feed.link}/rss.xml" rel="self" type="application/rss+xml" />
    <generator>MapMyTour Blog RSS Generator</generator>
    <webMaster>support@mappaytour.com (MapMyTour Team)</webMaster>
    <managingEditor>editorial@mappaytour.com (MapMyTour Editorial Team)</managingEditor>
    <copyright>© ${new Date().getFullYear()} MapMyTour. All rights reserved.</copyright>
    <category>Travel</category>
    <category>Tourism</category>
    <category>Destinations</category>
    <ttl>60</ttl>
    
    <image>
      <url>${process.env.NEXT_PUBLIC_SITE_URL || 'https://mappaytour.com'}/images/logo-rss.png</url>
      <title>${feed.title}</title>
      <link>${feed.link}</link>
      <width>144</width>
      <height>144</height>
      <description>MapMyTour Blog RSS Feed</description>
    </image>
    
    ${feed.items.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description}]]></description>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <author>${item.author}</author>
      <dc:creator><![CDATA[${item.author}]]></dc:creator>
      ${item.categories.map(category => `<category><![CDATA[${category}]]></category>`).join('')}
      <content:encoded><![CDATA[${item.content}]]></content:encoded>
    </item>`).join('')}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
        'X-Robots-Tag': 'noindex', // Prevent indexing of RSS feed itself
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Generate sitemap for RSS feed
export async function generateSitemap() {
  try {
    const feed = await blogService.generateRSSFeed();
    
    return feed.items.map(item => ({
      loc: item.link,
      lastModified: new Date(item.pubDate).toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error generating RSS sitemap:', error);
    return [];
  }
}