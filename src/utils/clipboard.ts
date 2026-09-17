/**
 * Safe clipboard copy utility with legacy execCommand fallback
 * Handles sandboxed iframe restrictions, focus issues, and permission errors gracefully.
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // 1. Try modern navigator.clipboard API if available in secure context
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // If clipboard write failed (e.g. document not focused or iframe permission blocked), fall through to execCommand
    }
  }

  // 2. Fallback to hidden textarea with execCommand
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (e) {
    console.warn('Fallback clipboard copy notice:', e);
    return false;
  }
}
