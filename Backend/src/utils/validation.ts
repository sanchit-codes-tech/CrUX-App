export function validateURL(url: string): boolean {
  if (!url) throw new Error("URL is required");

  // Remove extra quotes if present
  const cleanedUrl = url.replace(/^"(.*)"$/, "$1");

  try {
    new URL(cleanedUrl);
    return true;
  } catch (err) {
    throw new Error("Invalid URL format");
  }
}
