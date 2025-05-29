'use client';

import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Simple blog post interface that matches your data
interface SimpleBlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
}

interface BlogCardProps {
  post: SimpleBlogPost;
  variant?: 'default' | 'compact';
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (variant === 'compact') {
    return (
      <Link href={`/blog/${post.id}`}>
        <article className="flex gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-all duration-200 group">
          <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden rounded-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {post.author}
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default card variant
  return (
    <Link href={`/blog/${post.id}`}>
      <article className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          
          <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </span>
              
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default BlogCard;