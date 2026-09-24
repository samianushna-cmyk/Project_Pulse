/**
 * Explainable Skill Matching Utility for ProjectPulse
 *
 * Deterministic and transparent matching algorithm:
 * - Normalizes strings (case-insensitive and trimmed).
 * - Deduplicates skills.
 * - Match percentage formula:
 *     score = Math.round((matchedCount / totalRequiredSkills) * 100)
 * - Assigns explainable suggested role based on matched skills and rules.
 */

/**
 * Determine suggested role based on matched skills and student skills
 *
 * Transparent Rule Set:
 * 1. React / Tailwind -> Frontend
 * 2. Node.js / Express -> Backend
 * 3. MongoDB / Mongoose -> Database
 * 4. Figma / UIUX -> Designer
 * 5. Testing / Postman -> QA
 * 6. Git / GitHub / Documentation -> Deployment Lead
 * 7. Default -> General Contributor
 *
 * @param {string[]} matchedSkills - List of matched required skills
 * @param {string[]} studentSkills - Full list of student skills
 * @returns {string} Suggested role title
 */
export const determineSuggestedRole = (matchedSkills = [], studentSkills = []) => {
  // Use matched skills first if present; otherwise fall back to student's overall skills
  const skillsToEvaluate = matchedSkills.length > 0 ? matchedSkills : studentSkills;

  if (!skillsToEvaluate || skillsToEvaluate.length === 0) {
    return 'General Contributor';
  }

  const normalized = skillsToEvaluate.map((s) => s.toLowerCase().trim());

  const hasSkill = (...keywords) => {
    return keywords.some((kw) =>
      normalized.some((s) => s === kw || s.includes(kw))
    );
  };

  // 1. React + Tailwind -> Frontend
  if (hasSkill('react', 'tailwind', 'vue', 'angular', 'html', 'css', 'next.js', 'nextjs')) {
    return 'Frontend';
  }

  // 2. Node.js + Express -> Backend
  if (hasSkill('node.js', 'nodejs', 'express', 'fastapi', 'django', 'flask', 'spring', 'nest.js', 'nestjs', 'python')) {
    return 'Backend';
  }

  // 3. MongoDB + Mongoose -> Database
  if (hasSkill('mongodb', 'mongoose', 'sql', 'postgresql', 'mysql', 'prisma', 'redis')) {
    return 'Database';
  }

  // 4. Figma / UIUX -> Designer
  if (hasSkill('figma', 'uiux', 'ui/ux', 'adobe xd', 'sketch', 'design')) {
    return 'Designer';
  }

  // 5. Testing / Postman -> QA
  if (hasSkill('testing', 'postman', 'jest', 'cypress', 'selenium', 'qa', 'unit testing')) {
    return 'QA';
  }

  // 6. Git / GitHub + Documentation -> Deployment Lead
  if (hasSkill('git', 'github', 'documentation', 'docker', 'kubernetes', 'devops', 'ci/cd', 'aws', 'gcp', 'cloud')) {
    return 'Deployment Lead';
  }

  return 'General Contributor';
};

/**
 * Calculate transparent skill match between a student's profile and a project's required skills.
 *
 * @param {string[]} studentSkills - Array of skills from student profile
 * @param {string[]} requiredSkills - Array of required skills for the project
 * @returns {Object} { score: number, matchedSkills: string[], missingSkills: string[], suggestedRole: string }
 */
export const calculateSkillMatch = (studentSkills = [], requiredSkills = []) => {
  // 1. Normalize student skills into a Set of lowercase trimmed strings
  const studentSkillSet = new Set(
    (Array.isArray(studentSkills) ? studentSkills : [])
      .filter((s) => typeof s === 'string' && s.trim())
      .map((s) => s.trim().toLowerCase())
  );

  // 2. Normalize and deduplicate project required skills (case-insensitive, preserving original display string)
  const uniqueRequiredSkills = [];
  const seenLowerRequired = new Set();

  for (const skill of Array.isArray(requiredSkills) ? requiredSkills : []) {
    if (typeof skill === 'string' && skill.trim()) {
      const trimmed = skill.trim();
      const lower = trimmed.toLowerCase();
      if (!seenLowerRequired.has(lower)) {
        seenLowerRequired.add(lower);
        uniqueRequiredSkills.push(trimmed);
      }
    }
  }

  // Handle edge case: project has no required skills (prevent divide-by-zero)
  if (uniqueRequiredSkills.length === 0) {
    return {
      score: 0,
      matchedSkills: [],
      missingSkills: [],
      suggestedRole: 'General Contributor',
    };
  }

  // 3. Separate into matchedSkills and missingSkills
  const matchedSkills = [];
  const missingSkills = [];

  for (const requiredSkill of uniqueRequiredSkills) {
    const lower = requiredSkill.toLowerCase();
    if (studentSkillSet.has(lower)) {
      matchedSkills.push(requiredSkill);
    } else {
      missingSkills.push(requiredSkill);
    }
  }

  // 4. Calculate deterministic match score percentage
  const totalRequired = uniqueRequiredSkills.length;
  const matchPercentage = Math.round((matchedSkills.length / totalRequired) * 100);

  // 5. Determine explainable suggested role
  const suggestedRole = determineSuggestedRole(
    matchedSkills,
    Array.isArray(studentSkills) ? studentSkills : []
  );

  return {
    score: matchPercentage,
    matchedSkills,
    missingSkills,
    suggestedRole,
  };
};

export default calculateSkillMatch;
