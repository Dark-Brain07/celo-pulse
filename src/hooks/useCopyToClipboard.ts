"use client";

import { useState, useCallback } from 'react';

export function useCopyToClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = useCallback(async (text: string) => {
    if (typeof window === 'undefined' || !navigator.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setIsCopied(false);
      return false;
    }
  }, [timeout]);

  return { isCopied, copyToClipboard };
}
