import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  @Input() providerInfo!: any;
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
    this.nit = providerInfo.providerNit;
    this.ratingNumber = providerInfo.providerRatingNumber;
    this.address = "https://www.google.com/maps/place/" + providerInfo.providerAddress.replace(" ","+").replace("#","").replace("-","");
    this.phoneNumber = "https://wa.me/" + providerInfo.providerPhoneNumber.replace(" ","").replace("+","");
  }

}
