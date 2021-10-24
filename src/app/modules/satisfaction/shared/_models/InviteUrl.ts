
import {Client} from '@models/Client';
import { Campaign } from './Campaign';

export class InviteUrl {
    Id: string;
    SeenDateTime?: Date;
    ResponseDateTime?: Date;
    ClientEmail: string;
    CampaignId: number;
    Client: Client;
    Campaign: Campaign;
    Response?: any;
}
