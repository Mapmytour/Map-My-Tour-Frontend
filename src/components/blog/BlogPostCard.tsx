'use client';

import { BlogCardProps } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPostCard({
  post,
  variant = 'default',
  showExcerpt = true,
  showAuthor = true,
  showDate = true,
  showCategories = true,
  showTags = false,
  showReadingTime = true
}: BlogCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatViewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const renderCompactCard = () => (
    <Link href={`/blog/${post.slug}`}>
      <article className="flex gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-all duration-200 group">
        {post.featuredImage && (
          <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden rounded-lg">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            {showDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.publishedAt)}
              </span>
            )}
            {showReadingTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime} min read
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );

  const renderMinimalCard = () => (
    <Link href={`/blog/${post.slug}`}>
      <article className="group cursor-pointer">
        <h3 className="font-medium text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-1">
          {post.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          {showDate && (
            <span>{formatDate(post.publishedAt)}</span>
          )}
          {showReadingTime && (
            <span>{post.readingTime} min read</span>
          )}
        </div>
      </article>
    </Link>
  );

  const renderFeaturedCard = () => (
    <Link href={`/blog/${post.slug}`}>
      <article className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        {post.featuredImage && (
          <div className="relative h-64 overflow-hidden">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Featured Badge */}
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-yellow-500 text-white font-semibold">
                ⭐ Featured
              </Badge>
            </div>
            
            {/* Categories on Image */}
            {showCategories && post.categories.length > 0 && (
              <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                {post.categories.slice(0, 2).map((category) => (
                  <Badge 
                    key={category.id} 
                    variant="secondary"
                    className="bg-white/90 text-slate-900 text-xs"
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                {post.title}
              </h2>
            </div>
          </div>
        )}
        
        <div className="p-6">
          {showExcerpt && (
            <p className="text-slate-600 mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-slate-500">
              {showAuthor && (
                <span className="flex items-center gap-2">
                  {post.author.avatar && (
                    <div className="w-6 h-6 relative rounded-full overflow-hidden">
                      <Image
                        src={post.author.avatar.url}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {post.author.name}
                </span>
              )}
              {showDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3 text-sm text-slate-500">
              {showReadingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min
                </span>
              )}
              {post.viewCount && (
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {formatViewCount(post.viewCount)}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );

  const renderDefaultCard = () => (
    <Link href={`/blog/${post.slug}`}>
      <article className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border">
        {post.featuredImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Categories */}
            {showCategories && post.categories.length > 0 && (
              <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                {post.categories.slice(0, 2).map((category) => (
                  <Badge 
                    key={category.id} 
                    variant="secondary"
                    style={{ backgroundColor: category.color + '20', color: category.color }}
                    className="text-xs font-medium"
                  >
                    {category.icon} {category.name}
                  </Badge>
                ))}
              </div>
            )}
            
            {post.featured && (
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-yellow-500 text-white">
                  Featured
                </Badge>
              </div>
            )}
          </div>
        )}
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          
          {showExcerpt && (
            <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          {/* Tags */}
          {showTags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag.id} 
                  variant="outline" 
                  className="text-xs"
                  style={{ borderColor: tag.color, color: tag.color }}
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              {showAuthor && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  {post.author.avatar && (
                    <div className="w-8 h-8 relative rounded-full overflow-hidden">
                      <Image
                        src={post.author.avatar.url}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="font-medium">{post.author.name}</span>
                </div>
              )}
              
              {showDate && (
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3 text-sm text-slate-500">
              {showReadingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min
                </span>
              )}
              {post.viewCount && (
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {formatViewCount(post.viewCount)}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );

  // Render based on variant
  switch (variant) {
    case 'compact':
      return renderCompactCard();
    case 'minimal':
      return renderMinimalCard();
    case 'featured':
      return renderFeaturedCard();
    default:
      return renderDefaultCard();
  }
}