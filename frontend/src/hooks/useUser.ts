import { useEffect, useState } from 'react';

function generateUUID() {
  return crypto.randomUUID();
}

export function useUser(key = 'app_uuid') {
  const [uuid, setUUID] = useState('');

  useEffect(() => {
    let stored = localStorage.getItem(key);

    if (!stored) {
      stored = generateUUID();
      localStorage.setItem(key, stored);
    }

    setUUID(stored);
  }, [key]);

  return uuid;
}
