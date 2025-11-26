/**
 * Generates a unique meeting identifier following the pattern:
 * 
 * **MGT-XXX000**
 * - `XXX` → 3 random uppercase letters
 * - `000` → 3 random digits between 100 and 999
 *
 * Example: `"MGT-ABC482"`
 *
 * @function generateMeetingId
 * @returns {string} A newly generated meeting ID.
 */
export function generateMeetingId(): string {
  const letters = Math.random().toString(36).substring(2, 5).toUpperCase();
  const numbers = Math.floor(100 + Math.random() * 900);

  return `MGT-${letters}${numbers}`;
}
