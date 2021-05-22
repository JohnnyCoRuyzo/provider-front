import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  providerInfoList = [
    {
      providerName: "Name",
      providerBusinessName: "Business Name",
      providerNit: "N.I.T.",
      providerRatingNumber: "5.0",
      providerAddress: "Cra. 49 #104A - 14",
      providerPhoneNumber: "573112849616"
    },
    {
      providerName: "Name 2",
      providerBusinessName: "Business Name 2",
      providerNit: "N.I.T. 2",
      providerRatingNumber: "4.5",
      providerAddress: "Cra. 49B #104A - 12",
      providerPhoneNumber: "573112849616"
    },
    {
      providerName: "Name 3",
      providerBusinessName: "Business Name 3",
      providerNit: "N.I.T. 3",
      providerRatingNumber: "4.0",
      providerAddress: "Cra. 49B #104A - 12",
      providerPhoneNumber: "573112849610"
    },
    {
      providerName: "Name 4",
      providerBusinessName: "Business Name 4",
      providerNit: "N.I.T. 4",
      providerRatingNumber: "3.9",
      providerAddress: "Cra. 49 #104A - 14",
      providerPhoneNumber: "573112849614"
    },
    {
      providerName: "Name 5",
      providerBusinessName: "Business Name 5",
      providerNit: "N.I.T. 5",
      providerRatingNumber: "3.8",
      providerAddress: "Cra. 49B #104A - 12",
      providerPhoneNumber: "573112849616"
    },
    {
      providerName: "Name 6",
      providerBusinessName: "Business Name 6",
      providerNit: "N.I.T. 6",
      providerRatingNumber: "3.7",
      providerAddress: "Cra. 49B #104A - 12",
      providerPhoneNumber: "573112849610"
    }
  ];
  orderByCategories = [
    {
      categoryName: "Creation Date",
      categoryChecked: false
    },
    {
      categoryName: "Name",
      categoryChecked: true
    },
    {
      categoryName: "Business Name",
      categoryChecked: false
    },
    {
      categoryName: "Phone Number",
      categoryChecked: false
    },
    {
      categoryName: "Address",
      categoryChecked: false
    },
    {
      categoryName: "N.I.T.",
      categoryChecked: false
    },
    {
      categoryName: "Rating",
      categoryChecked: true
    }
  ];
  title = 'provider-front';
}
