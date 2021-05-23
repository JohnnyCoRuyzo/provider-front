import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-highest-rated-provider',
  templateUrl: './highest-rated-provider.component.html',
  styleUrls: ['./highest-rated-provider.component.css']
})
export class HighestRatedProviderComponent implements OnInit {
  @Input() ratedProvider!: any;
  name: string = "";
  ratingNumber: string = "";

  constructor() { }

  ngOnInit(): void {
    this.initializeRatedProvider(this.ratedProvider);
  }

  initializeRatedProvider(ratedProvider: any){
    this.name = ratedProvider.providerName;
    this.ratingNumber = ratedProvider.providerRatingNumber;
  }
}
