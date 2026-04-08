/**
 * Fuzzy character-overlap scorer.
 *
 * Counts how many characters from the query appear in each candidate
 * (case-insensitive). Score = matches / query.length.
 *
 * Simple enough that we don't need an external library — keeps the
 * bundle small and our use case (suggesting alternatives on empty
 * results) doesn't need sophisticated fuzzy matching.
 */

export function fuzzyMatch(query, candidates, topN = 3) {
  if (!query || !candidates?.length) return []

  const q = query.toLowerCase()

  const scored = candidates
    .map((candidate) => {
      const c = candidate.toLowerCase()
      let matches = 0
      for (const char of q) {
        if (c.includes(char)) matches++
      }
      return { candidate, score: matches / q.length }
    })
    .filter((item) => item.score > 0.3)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)

  return scored.map((s) => s.candidate)
}
