import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { useToast } from '../context/ToastContext';

export function useAdminList(key, endpoint) {
  return useQuery({
    queryKey: ['admin', key],
    queryFn: () => api.get(endpoint),
  });
}

export function useAdminItem(key, endpoint, enabled = true) {
  return useQuery({
    queryKey: ['admin', key],
    queryFn: () => api.get(endpoint),
    enabled,
  });
}

export function useAdminCreate(key, endpoint, options = {}) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: (data) => api.post(endpoint, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', key] });
      queryClient.invalidateQueries({ queryKey: [key] });
      addToast(options.successMessage || 'Created successfully');
      options.onSuccess?.();
    },
    onError: (err) => {
      addToast(err.message, 'error');
    },
  });
}

export function useAdminUpdate(key, endpoint, options = {}) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }) => api.put(`${endpoint}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', key] });
      queryClient.invalidateQueries({ queryKey: [key] });
      addToast(options.successMessage || 'Updated successfully');
      options.onSuccess?.();
    },
    onError: (err) => {
      addToast(err.message, 'error');
    },
  });
}

export function useAdminDelete(key, endpoint, options = {}) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: (id) => api.delete(`${endpoint}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', key] });
      queryClient.invalidateQueries({ queryKey: [key] });
      addToast(options.successMessage || 'Deleted successfully');
      options.onSuccess?.();
    },
    onError: (err) => {
      addToast(err.message, 'error');
    },
  });
}
