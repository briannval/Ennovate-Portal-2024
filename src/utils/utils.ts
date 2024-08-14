export const urlizeString = (str: string) => {
  return str.replace(/\s+/g, "-").toLowerCase();
};

export const getImageExtensionFromBase64 = (base64Str: string) => {
  const match = base64Str.match(/^data:image\/([a-zA-Z0-9]+);base64,/);
  return match ? match[1] : "";
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
