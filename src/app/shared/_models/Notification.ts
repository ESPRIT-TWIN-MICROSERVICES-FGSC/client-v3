import {Source} from 'rsocket-flowable/Single';

export interface Notification extends Source<Notification>{
  id: string;
  clientId: string;
  seenAt: Date;
  sentAt: Date;
  message: string;
}

