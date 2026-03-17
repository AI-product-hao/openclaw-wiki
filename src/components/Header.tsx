import Link from 'next/link';

const navItems = [
  { href: '/tutorials', label: 'Tutorials' },
  { href: '/agents', label: 'Agents' },
  { href: '/tools', label: 'Tools' },
  { href: '/templates', label: 'Templates' },
  { href: '/guides', label: 'Guides' },
  { href: '/search', label: 'Search' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-zinc-900 dark:text-white">
              OpenClaw<span className="text-blue-600">Wiki</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/search"
            className="md:hidden p-2 text-zinc-600 dark:text-zinc-400"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
