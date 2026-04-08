const FIELDS = [
  { key: 'name',        label: 'Name' },
  { key: 'source',      label: 'Source' },
  { key: 'stars',       label: 'Stars',        numeric: true },
  { key: 'downloads',   label: 'Downloads',    numeric: true },
  { key: 'language',    label: 'Language' },
  { key: 'license',     label: 'License' },
  { key: 'https',       label: 'HTTPS' },
  { key: 'auth',        label: 'Auth' },
  { key: 'category',    label: 'Category' },
  { key: 'updatedAt',   label: 'Last Updated' },
  { key: 'version',     label: 'Version' },
]

function formatValue(val) {
  if (val === null || val === undefined) return '—'
  if (typeof val === 'boolean') return val ? 'Yes' : 'No'
  if (typeof val === 'number') return val.toLocaleString()
  return String(val)
}

export default function CompareTable({ items }) {
  if (!items?.length) return null

  return (
    <div className="compare-table-wrapper">
      <table className="compare-table">
        <thead>
          <tr>
            <th className="field-col">Field</th>
            {items.map((item) => (
              <th key={item.id} className="item-col">{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FIELDS.map(({ key, label, numeric }) => {
            const values = items.map((i) => i[key])
            const maxVal = numeric
              ? Math.max(...values.map((v) => v ?? 0))
              : null

            return (
              <tr key={key}>
                <td className="field-label">{label}</td>
                {items.map((item, idx) => {
                  const val = item[key]
                  const isMax = numeric && val !== null && val === maxVal && maxVal > 0
                  return (
                    <td
                      key={item.id}
                      className={`item-value ${isMax ? 'highlight' : ''}`}
                    >
                      {formatValue(val)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <style>{`
        .compare-table-wrapper {
          overflow-x: auto;
        }
        .compare-table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--text-sm);
        }
        .compare-table th,
        .compare-table td {
          padding: var(--space-md) var(--space-lg);
          text-align: left;
          border-bottom: 1px solid var(--border-primary);
        }
        .compare-table th {
          font-weight: 600;
          color: var(--text-primary);
          background: var(--bg-tertiary);
          position: sticky;
          top: 0;
        }
        .field-col {
          width: 140px;
          min-width: 140px;
        }
        .field-label {
          font-weight: 500;
          color: var(--text-secondary);
        }
        .item-value {
          color: var(--text-primary);
        }
        .item-value.highlight {
          background: var(--color-success-light);
          color: var(--color-success);
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
