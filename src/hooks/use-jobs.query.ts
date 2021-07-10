import { useQuery } from 'react-query';
import { getJobs } from '../lib/job-api';
import { TokenResponse } from '../models/token-reponse';

export function useJobsQuery(token?: TokenResponse) {
  return useQuery('jobs', getJobs, {enabled: !!token});
}