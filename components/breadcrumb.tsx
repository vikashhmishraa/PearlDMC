'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-secondary/5 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>

          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
