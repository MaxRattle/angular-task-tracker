import { Status } from '../enums/status';

export interface Task {
  title: string;
  worker: string;
  deadline: Date;
  status: Status;
  id?: string;
}
