export function calculateReadabilityScore(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter((sentence) => sentence.trim());

  if (words.length === 0 || sentences.length === 0) return 0;

  const averageSentenceLength = words.length / sentences.length;
  const longWords = words.filter((word) => word.length > 12).length;
  const longWordRatio = longWords / words.length;

  let score = 100;
  if (averageSentenceLength > 25) score -= 25;
  if (averageSentenceLength > 35) score -= 20;
  if (longWordRatio > 0.2) score -= 20;
  if (words.length < 100) score -= 15;

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function calculateStructureScore(data: Record<string, any>): number {
  const personalInfo = data.personalInfo ?? {};
  const experience = Array.isArray(data.experience) ? data.experience : [];
  const education = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  let score = 0;

  const contactFields = [
    personalInfo.fullName,
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
  ].filter(Boolean).length;
  score += Math.min(20, contactFields * 5);

  const summaryWords = String(personalInfo.summary || "").trim().split(/\s+/).filter(Boolean).length;
  if (summaryWords >= 35) score += 15;
  else if (summaryWords >= 20) score += 10;
  else if (summaryWords >= 10) score += 5;

  const qualityExperience = experience.filter((exp: Record<string, any>) => {
    const title = exp.jobTitle || exp.position;
    const company = exp.company;
    const bullets = Array.isArray(exp.bullets) ? exp.bullets.filter(Boolean) : [];
    const descriptionWords = String(exp.description || "").trim().split(/\s+/).filter(Boolean).length;
    return title && company && (bullets.length >= 2 || descriptionWords >= 25);
  }).length;
  score += Math.min(30, qualityExperience * 15);

  const qualityEducation = education.filter((edu: Record<string, any>) => edu.school && edu.degree).length;
  score += qualityEducation > 0 ? 15 : 0;

  if (skills.length >= 12) score += 20;
  else if (skills.length >= 8) score += 15;
  else if (skills.length >= 5) score += 10;
  else if (skills.length >= 3) score += 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}
