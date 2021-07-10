import Table from 'react-bootstrap/Table';
import { PropsWithChildren } from 'react';

interface JobsTableProps extends PropsWithChildren<any> {}

export function JobsTable({ children }: JobsTableProps) {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>ID</th>
          <th className="w-25">Status</th>
          <th className="text-right w-25">Actions</th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </Table>
  );
}