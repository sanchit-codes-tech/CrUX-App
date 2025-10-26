export const validateUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
};

export const validateUrls = (
  urls: string[]
): { valid: string[]; invalid: string[] } => {
  const valid: string[] = [];
  const invalid: string[] = [];

  urls.forEach((url) => {
    if (url.trim()) {
      if (validateUrl(url)) {
        valid.push(url);
      } else {
        invalid.push(url);
      }
    }
  });

  return { valid, invalid };
};
