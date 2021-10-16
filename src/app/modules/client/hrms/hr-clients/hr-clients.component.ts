import { Component, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { ClientService } from "src/app/core/services/client.service";
import { Client } from "src/app/shared/models/Client";

@Component({
  selector: "app-hr-clients",
  templateUrl: "./hr-clients.component.html",
  styleUrls: ["./hr-clients.component.scss"],
})
export class HrClientsComponent implements OnInit {
  clients: Client[] = [];

  customers: any[];

  representatives: any[];

  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getAllClients();
    this.customers = [
      {
        id: 1000,
        name: "James Butt",
        country: {
          name: "Algeria",
          code: "dz",
        },
        company: "Benton, John B Jr",
        date: "2015-09-13",
        status: "unqualified",
        verified: true,
        activity: 17,
        representative: {
          name: "Ioni Bowcher",
          image: "ionibowcher.png",
        },
        balance: 70663,
      },
      {
        id: 1001,
        name: "Josephine Darakjy",
        country: {
          name: "Egypt",
          code: "eg",
        },
        company: "Chanay, Jeffrey A Esq",
        date: "2019-02-09",
        status: "proposal",
        verified: true,
        activity: 0,
        representative: {
          name: "Amy Elsner",
          image: "amyelsner.png",
        },
        balance: 82429,
      },
      {
        id: 1002,
        name: "Art Venere",
        country: {
          name: "Panama",
          code: "pa",
        },
        company: "Chemel, James L Cpa",
        date: "2017-05-13",
        status: "qualified",
        verified: false,
        activity: 63,
        representative: {
          name: "Asiya Javayant",
          image: "asiyajavayant.png",
        },
        balance: 28334,
      },
      {
        id: 1003,
        name: "Lenna Paprocki",
        country: {
          name: "Slovenia",
          code: "si",
        },
        company: "Feltz Printing Service",
        date: "2020-09-15",
        status: "new",
        verified: false,
        activity: 37,
        representative: {
          name: "Xuxue Feng",
          image: "xuxuefeng.png",
        },
        balance: 88521,
      },
    ];
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe((res) => {
      this.clients = res;
      console.log(this.clients);
    });
  }

  clear(table: Table) {
    table.clear();
  }
}