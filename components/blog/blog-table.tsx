interface BlogTableProps {
  headers: string[]
  rows: string[][]
}

export default function BlogTable({ headers, rows }: BlogTableProps) {
  if (!headers || !rows || rows.length === 0) return null

  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-white/15 bg-slate-950/60 shadow-lg">
      <table className="w-full text-left text-sm text-gray-200">
        <thead className="bg-slate-900/80 border-b border-white/10 text-xs uppercase tracking-wider text-cyan-300">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} scope="col" className="px-4 py-3.5 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="hover:bg-white/[0.02] transition-colors odd:bg-transparent even:bg-white/[0.01]"
            >
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-4 py-3 align-top leading-relaxed text-gray-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
