import { useMutation, useQueryClient } from 'react-query';
import { getJob } from '../lib/job-api';
import { updateJobInJobs } from '../lib/update-job-in-jobs';
import { Job } from '../models/job';

export function useJobRefreshMutation(jobId: string) {
  const queryClient = useQueryClient();

  return useMutation(() => getJob(jobId), {
    onSuccess: job => {
      queryClient.setQueryData<Job[] | undefined>('jobs', updateJobInJobs(job));
    }
  })
}