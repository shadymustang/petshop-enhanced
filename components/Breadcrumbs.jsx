import Link from 'next/link';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
      <ol className="flex gap-2">
        {items.map((it, idx) => (
          <li key={it.href || it.label}>
            {it.href ? <Link href={it.href}>{it.label}</Link> : <span>{it.label}</span>}
            {idx < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
