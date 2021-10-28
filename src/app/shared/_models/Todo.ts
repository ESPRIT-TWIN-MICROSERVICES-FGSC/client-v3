export interface Todo {
  _id: string;
  connectedUserId: string;
  fullName: string;
  lastName: string;
  name: string;
  priority: number;
  due: Date;
  done: boolean;
  date: Date;
}
