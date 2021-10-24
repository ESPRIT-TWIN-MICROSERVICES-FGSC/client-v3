import {Client} from '@models/Client';
import {FormioForm} from '@formio/angular';
export class Campaign{
    Id: number;
    Nom: string;
    Description: string;
    CreationDateTime: Date;
    EndDateTime: Date;
    StartDateTime?: Date;
    Clients: Array<Client>;
    CreatorId: string;
    Form: FormioForm = { components: [] };
}
