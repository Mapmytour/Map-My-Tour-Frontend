'use client';

interface BlogLoadingSkeletonProps {
  variant?: 'grid' | 'list' | 'featured' | 'sidebar';
  count?: number;
}

export default function BlogLoadingSkeleton({ 
  variant = 'grid', 
  count = 6 
}: BlogLoadingSkeletonProps) {
  
  const GridSkeleton = () => (
    <div className="animate-pulse bg-white rounded-xl overflow-hidden shadow-sm border">
      {/* Image placeholder */}
      <div className="h-48 bg-slate-200"></div>
      
      <div className="p-6">
        {/* Categories */}
        <div className="flex gap-2 mb-3">
          <div className="h-6 bg-slate-200 rounded-full w-20"></div>
          <div className="h-6 bg-slate-200 rounded-full w-16"></div>
        </div>
        
        {/* Title */}
        <div className="h-6 bg-slate-200 rounded mb-3"></div>
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
        
        {/* Excerpt */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-2/3"></div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
            <div className="h-4 bg-slate-200 rounded w-20"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-4 bg-slate-200 rounded w-16"></div>
            <div className="h-4 bg-slate-200 rounded w-12"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const ListSkeleton = () => (
    <div className="animate-pulse bg-white rounded-xl overflow-hidden shadow-sm border">
      <div className="flex">
        {/* Image */}
        <div className="w-64 h-48 bg-slate-200 flex-shrink-0"></div>
        
        <div className="flex-1 p-6">
          {/* Categories */}
          <div className="flex gap-2 mb-3">
            <div className="h-6 bg-slate-200 rounded-full w-20"></div>
            <div className="h-6 bg-slate-200 rounded-full w-16"></div>
          </div>
          
          {/* Title */}
          <div className="h-7 bg-slate-200 rounded mb-3"></div>
          <div className="h-7 bg-slate-200 rounded w-2/3 mb-4"></div>
          
          {/* Excerpt */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
              <div className="h-4 bg-slate-200 rounded w-24"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-4 bg-slate-200 rounded w-20"></div>
              <div className="h-4 bg-slate-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FeaturedSkeleton = () => (
    <div className="animate-pulse">
      {/* Main Featured */}
      <div className="h-[500px] bg-slate-200 rounded-2xl mb-12"></div>
      
      {/* Featured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-64 bg-slate-200"></div>
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                <div className="h-6 bg-yellow-200 rounded-full w-16"></div>
              </div>
              <div className="h-6 bg-slate-200 rounded mb-3"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-16"></div>
                </div>
                <div className="flex gap-3">
                  <div className="h-4 bg-slate-200 rounded w-12"></div>
                  <div className="h-4 bg-slate-200 rounded w-12"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SidebarSkeleton = () => (
    <div className="space-y-8">
      {/* Search Widget */}
      <div className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
        <div className="h-5 bg-slate-200 rounded w-24 mb-4"></div>
        <div className="h-12 bg-slate-200 rounded-lg"></div>
      </div>

      {/* Stats Widget */}
      <div className="bg-slate-200 rounded-xl p-6 animate-pulse">
        <div className="h-5 bg-slate-300 rounded w-20 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-8 bg-slate-300 rounded w-12 mx-auto mb-2"></div>
              <div className="h-3 bg-slate-300 rounded w-16 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
        <div className="h-5 bg-slate-200 rounded w-24 mb-6"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
        <div className="h-5 bg-slate-200 rounded w-20 mb-6"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-200 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
        <div className="h-5 bg-slate-200 rounded w-20 mb-6"></div>
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-6 bg-slate-200 rounded-full w-16"></div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-slate-200 rounded-xl p-6 animate-pulse">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-slate-300 rounded-full mx-auto mb-3"></div>
          <div className="h-5 bg-slate-300 rounded w-24 mx-auto mb-2"></div>
          <div className="h-4 bg-slate-300 rounded w-32 mx-auto"></div>
        </div>
        <div className="space-y-3">
          <div className="h-12 bg-slate-300 rounded-lg"></div>
          <div className="h-12 bg-slate-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  // Render based on variant
  switch (variant) {
    case 'list':
      return (
        <div className="space-y-6">
          {[...Array(count)].map((_, i) => (
            <ListSkeleton key={i} />
          ))}
        </div>
      );
    
    case 'featured':
      return <FeaturedSkeleton />;
    
    case 'sidebar':
      return <SidebarSkeleton />;
    
    default:
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(count)].map((_, i) => (
            <GridSkeleton key={i} />
          ))}
        </div>
      );
  }
}