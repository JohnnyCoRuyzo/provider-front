import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  @Input() providerInfo!: any;
  @Output() editProvider = new EventEmitter<string>();
  @Output() deleteProvider = new EventEmitter<string>();
  name: string = "";
  businessName: string = "";
  nit: string = "";
  ratingNumber: string = "";
  address: string = "";
  phoneNumber: string = "";
  
  constructor() { }

  ngOnInit(): void {
    this.initializeProvider(this.providerInfo);
  }

  initializeProvider(providerInfo: any){
    this.name = providerInfo.providerName;
    this.businessName = providerInfo.providerBusinessName;
    this.nit = "N.I.T.: " + providerInfo.providerNIT;
    this.ratingNumber = providerInfo.providerRatingNumber;
    this.address = "https://www.google.com/maps/place/" + providerInfo.providerAddress.replace(" ","+").replace("#","").replace("-","");
    this.phoneNumber = "https://wa.me/" + providerInfo.providerPhoneNumber.replace(" ","").replace("+","");
  }

  editThisProvider(){
    this.editProvider.emit(this.name);
  }

  deleteThisProvider(){
    this.deleteProvider.emit(this.name);
  }
}
