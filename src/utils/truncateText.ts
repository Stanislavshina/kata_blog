export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex >= 0) {
    return truncated.substring(0, lastSpaceIndex) + "...";
  } else {
    return truncated + "...";
  }
}
