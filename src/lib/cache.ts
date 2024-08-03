import { LRUCache } from 'lru-cache';

const options = {
  max: 500, // Maximum number of items in cache
  ttl: 5 * 60 * 1000, // 5 minute in milliseconds
};

const cache = new LRUCache<string, any>(options);

export function setCache(key: string, value: any): void {
  cache.set(key, value);
}

export function getCache(key: string): any | null {
  return cache.get(key) || null;
}
