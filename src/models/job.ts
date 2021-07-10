import { JobStatus } from "./job-status";

export interface Job {
  id: string;
  status?: JobStatus;
}