import { Status } from '../enums/status';
import { Priority } from '../enums/priority';

export interface Task {
  header: string;
  title: string;
  worker: string;
  deadline: Date;
  status: Status;
  priority: Priority;
  id: number;
}
