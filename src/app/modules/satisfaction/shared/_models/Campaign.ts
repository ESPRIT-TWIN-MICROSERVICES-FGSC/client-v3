import {FormioForm} from '@formio/angular';
import {InviteUrl} from '@satisfaction/shared/_models/InviteUrl';
export class Campaign{
    id: number;
    name: string;
    description: string;
    creationDateTime: Date;
    endDateTime: Date;
    startDateTime?: Date;
    inviteUrls: Map<string, InviteUrl>;
    creatorEmployeeId: string;
    form: FormioForm = { components: [] };
}
