import { Component, OnInit } from '@angular/core';
import { DropdownElement } from 'src/models/classes';
import { LinijePrivremeno, TipRedaVoznje } from 'src/app/shared/constants';
import { LinijeService } from 'src/app/services/linije.service';
import { Linija } from 'src/models/linija';

@Component({
  selector: 'app-uredi-linije',
  templateUrl: './uredi-linije.component.html',
  styleUrls: ['./uredi-linije.component.css']
})
export class UrediLinijeComponent implements OnInit {
  
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

  constructor(private _http: LinijeService) { }

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
            name: TipRedaVoznje[0],
            value: 0        
          },
          {
            name: TipRedaVoznje[1],
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
    
    this._http.getLineByName(this.chosenLineName).subscribe((res: any) =>
    {
      this.selectedName = res.Name;
      this.selectedRegion = res.Region;
      this.selectedId = res.Id;

      this.lineDetails = true;
    })
  }

  showLineNames(){
    this._http.getLineNames().subscribe((res: any) =>
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

    this._http.deleteLine(this.selectedName).subscribe(res =>
    {
        this.selectedId = null;
        this.selectedName = null;
        this.selectedRegion = null;
        this.chosenLineName = null;

        alert("Line is successfully deleted");
        this.showLineNames();
    })
  }

  changeLine(){
    if(this.selectedId == null || this.selectedName == null || this.selectedRegion == null){
      return;
    }

    this.updatedLine.id = this.selectedId;
    this.updatedLine.nazivLinije = this.selectedName;
    this.updatedLine.region = this.selectedRegion;

    this._http.editLine(this.updatedLine).subscribe((res: any) =>
    {
      this.chosenLineName = null;
      alert("Line is successfully edited");
      this.showLineNames();
    })
  }

  refreshPage(){
    window.location.reload();
  }

  toggleForm() {
    this.showForm = !this.showForm;

    this.newLineName = null;
    this.newLineRegion = null;
  }

  addNewLine(){
    this._http.addNewLine(this.newLineName, this.newLineRegion).subscribe((res) =>
    {
      alert((res as any).Name + " line is successfully added");
      this.newLineName = null;
      this.newLineRegion = null;
      this.showForm = !this.showForm;
      this.showLineNames();
    });
  }
  
}
