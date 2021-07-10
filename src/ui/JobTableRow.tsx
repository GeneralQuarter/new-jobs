import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Job } from '../models/job';
import { PromiseButton } from './PromiseButton';

interface JobTableRowProps {
  job: Job;
  onRunClick?: () => Promise<any>;
  onRefreshClick?: () => Promise<any>;
  onViewLogsClick?: () => void;
  onEditClick?: () => void;
}

export function JobTableRow({ job, onEditClick, onRefreshClick, onRunClick, onViewLogsClick }: JobTableRowProps) {
  const variantForStatus = () => {
    switch (job.status) {
      case 'OK':
        return 'success';
      case 'ERROR':
        return 'danger';
      case 'PENDING':
        return 'primary';
      default:
        return 'light';
    }
  }
  
  return (
    <tr>
      <td>{job.id}</td>
      <td>
        <Badge variant={variantForStatus()}>{job.status ?? '-'}</Badge>
        {job.status === 'PENDING' && 
          <PromiseButton size="sm" promiseFnc={async () => onRefreshClick?.()} className="ml-2">
            Refresh
          </PromiseButton>
        }
      </td>
      <td className="text-right">
        <Button size="sm" className="mr-2" variant="outline-secondary" onClick={() => onEditClick?.()}>
          Edit
        </Button>
        <Button size="sm" className="mr-2" variant="outline-secondary" onClick={() => onViewLogsClick?.()}>
          View Logs
        </Button>
        <PromiseButton size="sm" disabled={job.status === 'PENDING'} promiseFnc={async () => onRunClick?.()}>
          Run
        </PromiseButton>
      </td>
    </tr>
  );
}