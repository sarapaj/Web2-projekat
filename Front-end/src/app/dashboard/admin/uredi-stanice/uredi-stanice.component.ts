import { Component, OnInit } from '@angular/core';
import { DropdownElement } from 'src/app/shared/classes';
import { StaniceService } from 'src/app/services/stanice.service';

@Component({
  selector: 'app-uredi-stanice',
  templateUrl: './uredi-stanice.component.html',
  styleUrls: ['./uredi-stanice.component.css']
})
export class UrediStaniceComponent implements OnInit {

  tableHeader: string[];

  constructor(private _http: StaniceService) { }

  ngOnInit() {
    this.tableHeader = ["Naziv", "Adresa", "Koordinate", " "];
  }

  showStationDetails() {
    // this._http.getLineById(this.selectedLine).subscribe((res: any) =>
    // {
    //   this.tableBody = [[String(res.Id), res.Name, ""]];
    // })
  }
}
