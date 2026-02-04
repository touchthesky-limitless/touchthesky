import { useState, useCallback } from 'react';

export const useCopy = () => {
  const [isCopied, setIsCopied] = useState(false);

  const shareResult = useCallback((data: { title: string; details: string }) => {
    // Format the text for a professional look when pasted
    const text = `--- ${data.title} ---\n${data.details}\n\nGenerated via TouchTheSky`;
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    } else {
      // Fallback for older browsers or non-https
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textArea);
    }
  }, []);

  return { isCopied, shareResult };
};