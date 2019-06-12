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
  tableBody;

  constructor(private _http: StaniceService) { }

  ngOnInit() {
    this.tableHeader = ["Naziv", "Adresa", "Koordinate", " "];
    this.showAllStations();
  }

  showAllStations() { 
    this._http.getAllStations().subscribe((res: any) =>
    {
      this.tableBody = res.map((stanica) => {
        return [ stanica.Name, stanica.Address, stanica.Coordinate.x + "; " + stanica.Coordinate.y, "" ];
      })
    })
  }
}
