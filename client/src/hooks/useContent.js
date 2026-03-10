import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useContent(key, endpoint, fallbackData, options = {}) {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: () => api.get(endpoint),
    ...(fallbackData !== undefined && { placeholderData: fallbackData }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    ...options,
  });
}
