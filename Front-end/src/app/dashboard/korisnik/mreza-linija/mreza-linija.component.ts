import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DropdownElement } from 'src/models/classes';
import { LinijePrivremeno } from 'src/app/shared/constants';
import { LinijeService } from 'src/app/services/linije.service';

declare var L:any;

@Component({
  selector: 'app-mreza-linija',
  templateUrl: './mreza-linija.component.html',
  styleUrls: ['./mreza-linija.component.css']
})

export class MrezaLinijaComponent implements OnInit, AfterViewInit, OnDestroy {
  
  dropdownToPass: DropdownElement;
  selectedLine: string;
  
  constructor(private _http: LinijeService) { }

  ngOnInit() {
    this.dropdownToPass = {
      label: "Linije",
      value: []
    }

    this.showLineNames();
      
    this.loadMap();
  }

  ngAfterViewInit(){
    var link2 = document.getElementById('id22')
    if(link2){
      return;
    }
    var link = document.createElement('link');
    link.id = 'id2';
    link.rel = 'stylesheet';
    link.href = 'https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css';
    document.head.appendChild(link);
  }

  ngOnDestroy(){
    document.styleSheets[document.styleSheets.length-1].disabled = true;
  }

  showLineNames(){
    this._http.getLineNames().subscribe((res: any) =>
    {
      this.dropdownToPass = {
        label: "Linije",
        value: res
      }

      this.selectedLine = null;
    })
  }
  
  displayLineStations(){
    this._http.getLineStations(this.selectedLine).subscribe((res: any) => {
      if(res.length < 2){
        alert("Line must have at least 2 stations");
        return;
      }
      
      let stations = [];
      res.forEach(loc => {
        stations.push({
          lat: loc.Coordinate.y,
          lng: loc.Coordinate.x
        })
      })

      L.mapquest.directions().route({
        locations: stations,
        options: {
          maxRoutes: 1
        }
      });
    })
    
  }

  loadMap() {
    L.mapquest.key = 'Y56ixhSiTYiBo9SMGsPnTh6bKuRl4W75';

    var map = L.mapquest.map('map', {
      center: [45.267551, 19.833300],
      layers: L.mapquest.tileLayer('map'),
      zoom: 13
    });

  }

}
