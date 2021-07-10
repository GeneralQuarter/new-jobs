import { useQuery } from 'react-query';
import { getToken } from '../lib/job-api';

export function useTokenQuery() {
  return useQuery('token', getToken, {refetchInterval: 899 * 1000});
}