import { Component, OnInit } from '@angular/core';
import { DropdownElement } from 'src/models/classes';
import { TemporarelyLines } from 'src/app/shared/constants';
import { LinesService } from 'src/app/services/lines.service';

declare var L:any;

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.css']
})
export class CurrentLocationComponent implements OnInit {
  
  dropdownToPass: DropdownElement;
  selectedLine: string;
  map;
  myIcon;
  ioConnection: any;
  hubProxy = window['hubProxy'];
  hubConnection = window['hubConnection'];
  busMarker;

  constructor(private _linesService: LinesService) { }

  ngOnInit() {
    this.dropdownToPass = {
      label: "Lines",
      value: []
    }

    this.showLineNames();

    this.loadMap();

    this.myIcon = L.icon({
      iconUrl: '../../../../assets/my-icon.png',
      iconSize: [50, 50]
    });
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
    // SOCKETS
    this.hubConnection.hub.stop();
    console.log('Disconnected');

    // maps
    document.styleSheets[document.styleSheets.length-1].disabled = true;
  }

  loadMap() {
    L.mapquest.key = 'Y56ixhSiTYiBo9SMGsPnTh6bKuRl4W75';

    this.map = L.mapquest.map('map', {
      center: [45.267551, 19.833300],
      layers: L.mapquest.tileLayer('map'),
      zoom: 13
    });
  }

  showLineNames(){
    this._linesService.getLineNames().subscribe((res: any) =>
    {
      this.dropdownToPass = {
        label: "Lines",
        value: res
      }

      this.selectedLine = null;
    })
  }

  displayLineStations(){
    this._linesService.getLineStations(this.selectedLine).subscribe((res: any) => {
      if(res.length < 2){
        alert("Line must have at least 2 stations");
        return;
      }
      
      let stations = [];
      let temp = [];
      res.forEach(loc => {
        stations.push({
          lat: loc.Coordinate.y,
          lng: loc.Coordinate.x
        });
        temp.push({
          y: loc.Coordinate.y,
          x: loc.Coordinate.x
        })
      })

      L.mapquest.directions().route({
        locations: stations,
        options: {
          maxRoutes: 1
        }
      });

      this.busMarker = this.busMarker || 
        L.marker([
          stations[0].lat,
          stations[0].lng
        ], {icon: this.myIcon}).addTo(this.map);

      let cnt = 0;
      
      // SOCKETS
      this.hubProxy.client.printInBrowserConsole = (y, x) => {
        cnt++;
        const newLatLng = new L.LatLng(this.replaceComma(x), this.replaceComma(y));
        this.busMarker.setLatLng(newLatLng);

        if (cnt === temp.length) {
          cnt = 0;
          setTimeout(() => {
            this.initSocket(temp);
          }, 6000);
        }
      };

      this.initSocket(temp);

    })
  }

  private initSocket(temp) {
    this.hubConnection.hub.start()
      .done(() => {
        console.log('Connected');
        this.hubProxy.server.socketStart(temp);
      })
      .fail(() => {
        console.log('Fail')
      })
  }

  private replaceComma(num): number {
    return Number(num.replace(',', '.'))
  }
}
