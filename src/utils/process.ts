import wordBank from './wordBank.json';

interface Result {
  keyword: string;
  occurrences: number;
}

function processResume(resumeText: string): Result[] {
  const results: Result[] = [];

  for (const keyword of wordBank.keywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = resumeText.match(regex);

    if (matches) {
      results.push({ keyword, occurrences: matches.length });
    }
  }

  return results;
}

export default processResume;