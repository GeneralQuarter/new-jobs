import { ReactNode } from 'react';
import { useJobRefreshMutation } from '../hooks/use-job-refresh.mutation';
import { useJobStartMutation } from '../hooks/use-job-start.mutation';
import { Job } from '../models/job';
import { TokenResponse } from '../models/token-reponse';

interface JobControllerOutput {
  job: Job;
  refresh: () => Promise<any>;
  start: () => Promise<any>;
  viewLogs: () => void;
  edit: () => void;
}

interface JobControllerProps {
  job: Job,
  token?: TokenResponse;
  children: (output: JobControllerOutput) => ReactNode; 
}

export function JobController({ job, children }: JobControllerProps) {
  const {mutate: startJob} = useJobStartMutation(job.id);
  const {mutate: refreshJob} = useJobRefreshMutation(job.id);

  const refresh = async () => {
    return refreshJob();
  }

  const start = async () => {
    return startJob();
  }

  const viewLogs = () => {
    console.log(`view logs ${job.id}`);
  }

  const edit = () => {
    console.log(`edit ${job.id}`);
  }

  return (
    <>
      {children({job, refresh, start, viewLogs, edit})}
    </>
  )
}