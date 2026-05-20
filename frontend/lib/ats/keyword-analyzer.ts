const COMMON_WORDS = new Set([
  "and",
  "the",
  "with",
  "for",
  "from",
  "that",
  "this",
  "you",
  "are",
  "will",
  "have",
  "has",
  "job",
  "work",
]);

export function extractKeywords(text: string): string[] {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9+#.\s-]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 2 && !COMMON_WORDS.has(word))
    )
  );
}

export function analyzeKeywordMatch(resumeText: string, jobDescription = "") {
  const resumeKeywords = extractKeywords(resumeText);
  const jobKeywords = extractKeywords(jobDescription);

  if (jobKeywords.length === 0) {
    const keywordDepthScore = Math.min(70, resumeKeywords.length * 2);
    return {
      score: keywordDepthScore,
      matchedKeywords: resumeKeywords,
      missingKeywords: [],
    };
  }

  const matchedKeywords = jobKeywords.filter((keyword) =>
    resumeKeywords.includes(keyword)
  );
  const missingKeywords = jobKeywords.filter(
    (keyword) => !resumeKeywords.includes(keyword)
  );

  return {
    score: Math.round((matchedKeywords.length / jobKeywords.length) * 100),
    matchedKeywords,
    missingKeywords,
  };
}
