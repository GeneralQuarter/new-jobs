import { Job } from '../models/job';

export function updateJobInJobs(job: Job): ((jobs: Job[] | undefined) => Job[] | undefined) {
  return jobs => {
    if (!jobs) {
      return undefined;
    }

    const jobIndex = jobs.findIndex(j => j.id === job.id);
    const newJobs = [...jobs];
    newJobs.splice(jobIndex, 1, job);
    return newJobs;
  }
}