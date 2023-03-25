import { useRef, useEffect, useCallback, useState } from 'react';
import _ from 'lodash-es';

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
}
