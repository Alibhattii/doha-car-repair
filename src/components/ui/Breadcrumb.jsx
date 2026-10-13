import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }) {
  // items: [{ label: 'Home', to: '/' }, { label: 'About' }]
  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <ol itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-2"
            itemScope
            itemType="https://schema.org/ListItem"
            itemProp="itemListElement"
          >
            {item.to ? (
              <Link to={item.to} itemProp="item" className="text-primary hover:underline">
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span className="text-gray-500 font-medium" itemProp="name" aria-current="page">
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(i + 1)} />
            {i < items.length - 1 && (
              <span className="breadcrumb-sep" aria-hidden="true">
                ›
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
