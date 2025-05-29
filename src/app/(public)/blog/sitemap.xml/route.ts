import { blogService } from '@/service/blog-service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mapmytour.in';
    
    // Get all posts
    const postsResponse = await blogService.getAllPosts({ limit: 1000 });
    const posts = postsResponse.posts;
    
    // Get all categories
    const categoriesResponse = await blogService.getAllCategories();
    const categories = categoriesResponse.categories;
    
    // Get all tags
    const tagsResponse = await blogService.getAllTags();
    const tags = tagsResponse.tags;
    
    // Build sitemap URLs
    const urls: Array<{
      loc: string;
      lastmod: string;
      changefreq: string;
      priority: string;
    }> = [];
    
    // Add main blog pages
    urls.push({
      loc: `${baseUrl}/blog`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '1.0'
    });
    
    urls.push({
      loc: `${baseUrl}/blog/categories`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.8'
    });
    
    urls.push({
      loc: `${baseUrl}/blog/tags`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.8'
    });
    
    urls.push({
      loc: `${baseUrl}/blog/archive`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7'
    });
    
    urls.push({
      loc: `${baseUrl}/blog/search`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.6'
    });
    
    // Add blog posts
    posts.forEach(post => {
      urls.push({
        loc: `${baseUrl}/blog/${post.slug}`,
        lastmod: post.updatedAt.toISOString(),
        changefreq: 'weekly',
        priority: post.featured ? '0.9' : '0.8'
      });
    });
    
    // Add category pages
    categories.forEach(category => {
      urls.push({
        loc: `${baseUrl}/blog/categories/${category.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.7'
      });
    });
    
    // Add tag pages
    tags.forEach(tag => {
      urls.push({
        loc: `${baseUrl}/blog/tags/${tag.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.6'
      });
    });
    
    // Generate XML
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

    return new NextResponse(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Alternative method using Next.js built-in sitemap generation
export async function generateSitemap() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mappaytour.com';
    
    const postsResponse = await blogService.getAllPosts({ limit: 1000 });
    const posts = postsResponse.posts;
    
    const categoriesResponse = await blogService.getAllCategories();
    const categories = categoriesResponse.categories;
    
    const tagsResponse = await blogService.getAllTags();
    const tags = tagsResponse.tags;
    
    const staticPages = [
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/blog/categories`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/blog/tags`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/blog/archive`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/blog/search`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
    ];
    
    const postPages = posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: post.featured ? 0.9 : 0.8,
    }));
    
    const categoryPages = categories.map(category => ({
      url: `${baseUrl}/blog/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
    
    const tagPages = tags.map(tag => ({
      url: `${baseUrl}/blog/tags/${tag.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
    
    return [...staticPages, ...postPages, ...categoryPages, ...tagPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [];
  }
}