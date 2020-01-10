import { Component, OnInit } from '@angular/core';
import { DropdownElement } from 'src/models/classes';
import { StationsService } from 'src/app/services/stations.service';

@Component({
  selector: 'app-edit-stations',
  templateUrl: './edit-stations.component.html',
  styleUrls: ['./edit-stations.component.css']
})
export class EditStationsComponent implements OnInit {

  tableHeader: string[];
  tableBody;
  newStationName: string = null;
  newStationAddress: string = null;
  newChosenCoordinateId: string = null;
  showForm = false;
  showCoordForm = false;
  chosenStationName: string;
  chosenCoordAddToStation: string;
  newXcoord: string = null;
  newYcoord: string = null;
  dropdownToPassStation: DropdownElement;
  coordinatesDropdown: DropdownElement;
  selectedAddress: string;
  selectedName: string;
  selectedXCoord: string;
  selectedYCoord: string;
  selectedId: number;
  allCoord: any;
  stationDetails = false;

  constructor(private _stationService: StationsService) { }

  ngOnInit() {
    this.dropdownToPassStation = 
    {
      label: "",
      value: []
    };

    this.coordinatesDropdown = 
    {
      label: "",
      value: []
    };

    this.showAllStations();
    this.showAllCoordinates(); // TODO nakon add new coordinate pozvati ovo
  }

  showAllStations() { 
    this._stationService.getStationNames().subscribe((res: any) =>
    {
      this.dropdownToPassStation = {
        label: "Stations",
        value: res
      }
      this.chosenStationName = null;
    })
  }

  showAllCoordinates() { 
    this._stationService.getAllCoordinates().subscribe((res: any) =>
    {
      this.allCoord = res;

      var coordToPrint = res.map(r => {
        return r.x.toString() + " - " + r.y.toString();
      })
      
      this.coordinatesDropdown = {
        label: "Coordinates",
        value: coordToPrint
      }
      this.chosenCoordAddToStation = null;
    })
  }

  getCoordinateId(){
    // get chosen coordinate
    for(var i = 0; i < this.coordinatesDropdown.value.length; i++){
      if(this.coordinatesDropdown.value[i] == this.chosenCoordAddToStation){
        this.newChosenCoordinateId = this.allCoord[i].Id.toString();
        return;
      }
    }
  }

  refreshPage(){
    window.location.reload();
  }
  
  addNewCoord(){
    if(this.newXcoord == null || this.newYcoord == null){
      return;
    }

    this._stationService.addNewCoordinate(this.newXcoord, this.newYcoord).subscribe((res: any) => {
      alert("Coordinate is succcessfully added");
      this.toggleCoordForm();
      this.showAllCoordinates();
    })
  }

  addNewStation(){
    this.getCoordinateId();
    this._stationService.addStation(this.newStationName, this.newStationAddress, this.newChosenCoordinateId ).subscribe((res) =>
    {
      alert((res as any).Name + " station is successfully added");
      this.toggleForm();
      this.showAllStations();
    });
  }

  toggleForm(){
    this.showForm = !this.showForm;
    
    this.newStationName = null;
    this.newStationAddress = null;
    this.newChosenCoordinateId = null;
    this.chosenCoordAddToStation = null;
  }

  toggleCoordForm(){
    this.showCoordForm = !this.showCoordForm;
    this.newXcoord = null;
    this.newYcoord = null;
  }


  showStationDetails(){
    
    if(this.chosenStationName == null){
      return;
    }

    this._stationService.getStationByName(this.chosenStationName).subscribe((res: any) =>
    {
      this.selectedId = res.Id;
      this.selectedName = res.Name;
      this.selectedAddress = res.Address;
      this.selectedXCoord = res.Coordinate.x;
      this.selectedYCoord = res.Coordinate.y;

      this.stationDetails = true;
    })
  }

  deleteStation(){
    this._stationService.deleteStation(this.selectedName).subscribe(res =>
      {
        alert("Station is deleted");
        this.refreshPage();
      })
  }

  changeStation(){
    this._stationService.editStation(this.selectedName, this.selectedId.toString(), this.selectedAddress, this.selectedXCoord, this.selectedYCoord).subscribe(res =>
      {
        alert("Station is successfully changed")
        this.selectedAddress = null;
        this.selectedName = null;
        this.selectedId = null;
        this.selectedXCoord = null;
        this.selectedYCoord = null;
        this.showAllStations();
      })
  }
}
