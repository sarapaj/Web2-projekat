import { Component, OnInit } from '@angular/core';
import { DropdownElement } from 'src/models/classes';
import { LinesService } from 'src/app/services/lines.service';
import { Linija } from 'src/models/linija';
import { StationsService } from 'src/app/services/stations.service';
import { TimetableType } from 'src/app/shared/constants';

@Component({
  selector: 'app-edit-lines',
  templateUrl: './edit-lines.component.html',
  styleUrls: ['./edit-lines.component.css']
})
export class EditLinesComponent implements OnInit {
  
  dropdownToPassLine: DropdownElement;
  regionsDropdown: DropdownElement;
  chosenLineName: string;
  showForm = false;
  newLineRegion = null;
  newLineName = null;
  selectedId: number;
  selectedName: string;
  selectedRegion: number;
  updatedLine: Linija;
  lineDetails = false;
  belongingStationsNames: any;
  stationToAdd: string;
  // allStations: any;
  notBelongingStations: any;

  constructor(private _linesService: LinesService, private _stationService: StationsService) { }

  ngOnInit() {
    this.dropdownToPassLine = 
      {
        label: "",
        value: []
      };
      
      this.regionsDropdown = 
      {
        label: "",
        value: [
          {
            name: TimetableType[0],
            value: 0        
          },
          {
            name: TimetableType[1],
            value: 1
          }
        ]
      };

      this.updatedLine = {
        id: null,
        nazivLinije: null,
        region: null
      }

      this.selectedId = null;
      this.selectedName = null;
      this.selectedRegion = null;

      this.showLineNames();
  }

  showLineDetails() {
    if(this.chosenLineName == null){
      return;
    }
    
    this._linesService.getLineByName(this.chosenLineName).subscribe((res: any) =>
    {
      this.selectedName = res.Name;
      this.selectedRegion = res.Region;
      this.selectedId = res.Id;

      this.lineDetails = true;

      this.getBelongingStations(this.selectedId);
      this.getNotBelongingStations(this.selectedId);
    })
  }

  getBelongingStations(lineId: number){
    this._linesService.getBelongingStations(lineId).subscribe((res: any) => {
      this.belongingStationsNames = res;
    })
  }

  getNotBelongingStations(lineId: number){
    this._linesService.getNotBelongingStations(lineId).subscribe((res: any) => {
      console.log(res)
      this.notBelongingStations = res;
    })
  }

  showLineNames(){
    this._linesService.getLineNames().subscribe((res: any) =>
    {
      this.dropdownToPassLine = {
        label: "Linije",
        value: res
      }

      this.chosenLineName = null;
    })
  }

  deleteLine() {
    if(this.selectedName == null){
      return;
    }

    this._linesService.deleteLine(this.selectedName).subscribe(res =>
    {
      this.selectedId = null;
      this.selectedName = null;
      this.selectedRegion = null;
      this.chosenLineName = null;
      this.lineDetails = false;


      alert("Line is successfully deleted");
      this.showLineNames();
  })}

  changeLine(){
    if(this.selectedId == null || this.selectedName == null || this.selectedRegion == null){
      return;
    }

    this.updatedLine.id = this.selectedId;
    this.updatedLine.nazivLinije = this.selectedName;
    this.updatedLine.region = this.selectedRegion;

    this._linesService.editLine(this.updatedLine).subscribe((res: any) =>
    {
      this.chosenLineName = null;
      alert("Line is successfully edited");
      
      this.selectedId = null;
      this.selectedName = null;
      this.selectedRegion = null;
      this.chosenLineName = null;
      this.lineDetails = false;
      this.showLineNames();
    })
  }

  toggleForm() {
    this.showForm = !this.showForm;

    this.newLineName = null;
    this.newLineRegion = null;
  }

  addNewLine(){
    this._linesService.addNewLine(this.newLineName, this.newLineRegion).subscribe((res) =>
    {
      alert((res as any).Name + " line is successfully added");
      this.newLineName = null;
      this.newLineRegion = null;
      this.showForm = !this.showForm;
      this.showLineNames();
    });
  }
  
  removeStationFromLine(station: string){
    this._linesService.removeStationFromLine(station, this.selectedId).subscribe((res: any) => {
      alert("Station is removed successfully");
      this.getBelongingStations(this.selectedId);
      this.getNotBelongingStations(this.selectedId);
    })
  }

  addStationToLine(){
    if(this.belongingStationsNames.includes(this.stationToAdd)){
      alert("Line already contains this station");
      return;
    }

    this._linesService.addStationToLine(this.selectedId, this.stationToAdd).subscribe((res: any) => {
      alert("Station is successfully added to line");
      this.getBelongingStations(this.selectedId);
      this.getNotBelongingStations(this.selectedId);
    })

  }
}
