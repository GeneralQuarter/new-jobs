import { useMutation, useQueryClient } from 'react-query';
import { startJob } from '../lib/job-api';
import { updateJobInJobs } from '../lib/update-job-in-jobs';
import { Job } from '../models/job';

export function useJobStartMutation(jobId: string) {
  const queryClient = useQueryClient();

  return useMutation(() => startJob(jobId), {
    onSuccess: job => {
      queryClient.setQueryData<Job[] | undefined>('jobs', updateJobInJobs(job));
    }
  })
}