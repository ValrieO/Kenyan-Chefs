// Utility to create page URLs for routing
// Usage: createPageUrl("Landing") => "/landing"

export function createPageUrl(pageName) {
  if (!pageName || typeof pageName !== "string") return "/";
  // Convert PascalCase or camelCase to kebab-case
  const kebab = pageName
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
  return `/${kebab}`;
}
