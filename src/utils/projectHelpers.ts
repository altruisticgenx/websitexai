/**
 * Project data mapping utilities
 * Helpers to convert project data into PilotCard props
 */

export const getSectorAudience = (sector: string): string => {
  const audienceMap: Record<string, string> = {
    "Education Nonprofit": "Schools",
    "Founder-Backed Startup": "Startups",
    "Solo Founder": "Founders",
    "Climate & Energy": "Energy Orgs",
  };
  return audienceMap[sector] || "Teams";
};

export const getProjectProblem = (id: string): string => {
  const problemMap: Record<string, string> = {
    "sales-copilot": "Manual follow-ups drowning the team, missing high-intent leads",
    "founder-os": "5 tools, constant context-switching, scattered client data",
    "energy-analytics": "200+ buildings, data chaos, no visibility into savings",
    "edtech-portal": "15+ pilots tracked in spreadsheets, funding reports take weeks",
  };
  return problemMap[id] || "Complex operational challenges requiring AI solutions";
};

export const getProjectOutcome = (id: string): string => {
  const outcomeMap: Record<string, string> = {
    "sales-copilot": "65% less manual work, 2.3x conversion rate",
    "founder-os": "Saved 4+ hours/week, 5 tools → 1 interface",
    "energy-analytics": "$180k+ savings identified in first month",
    "edtech-portal": "Secured $500k funding with data-backed reports",
  };
  return outcomeMap[id] || "Measurable operational improvements";
};

export const getTimeToDemo = (id: string): string => {
  const timeMap: Record<string, string> = {
    "sales-copilot": "Week 1 demo",
    "founder-os": "Week 1 demo",
    "energy-analytics": "Week 1 dashboard",
    "edtech-portal": "Week 1 portal",
  };
  return timeMap[id] || "Week 1";
};

/**
 * Array shallow comparison helper for React.memo
 */
export const shallowArrayEqual = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};
