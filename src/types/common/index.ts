export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
  totalPages?: number;
}

export interface SearchParams {
  query?: string;
  category?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  duration?: string;
  difficulty?: string;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface NavMenuItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavMenuItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}