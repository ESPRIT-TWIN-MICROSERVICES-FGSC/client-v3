import {FormioForm} from '@formio/angular';
import {InviteUrl} from '@satisfaction/shared/_models/InviteUrl';
export class Campaign{
    id: number;
    nom: string;
    description: string;
    creationDateTime: Date;
    endDateTime: Date;
    startDateTime?: Date;
    inviteUrls: Map<string, InviteUrl>;
    creatorId: string;
    form: FormioForm = { components: [] };
}
