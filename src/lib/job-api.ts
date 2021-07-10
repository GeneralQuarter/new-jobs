import axios from 'axios';
import { Job } from '../models/job';
import { TokenResponse } from '../models/token-reponse';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030'
});

export function getToken(): Promise<TokenResponse> {
  return axiosInstance.post<TokenResponse>('/auth').then(res => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;

    return res.data;
  });
}

export function getJobs(): Promise<Job[]> {
  return axiosInstance.get<Job[]>('/jobs').then(res => res.data);
}

export function startJob(id: string): Promise<Job> {
  return axiosInstance.post<Job>(`/jobs/${encodeURIComponent(id)}/executions`, undefined).then(res => res.data);
}

export function getJob(id: string): Promise<Job> {
  return axiosInstance.get<Job>(`/jobs/${encodeURIComponent(id)}`).then(res => res.data);
}