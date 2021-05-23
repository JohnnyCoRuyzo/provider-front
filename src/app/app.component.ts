import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  orderByCategories = this.initializeCategories();
  providerInfoList = this.initializeProviderList();
  ratedProviders = this.providerInfoList.sort((a,b) => (a.providerRatingNumber > b.providerRatingNumber ? -1 : 1)).slice(0, 5);
  lastSearchText = "";
  
  ngOnInit(): void{
    this.searchTextClicked("");
  }

  searchTextClicked(searchText: string){ 
    this.lastSearchText = searchText;
    this.providerInfoList = this.initializeProviderList();
    this.providerInfoList = this.orderProviderList();
    searchText = searchText.toUpperCase();
    this.providerInfoList = this.providerInfoList.filter(provider => 
      provider.providerName.toUpperCase().includes(searchText) ||
      provider.providerBusinessName.toUpperCase().includes(searchText) ||
      provider.providerAddress.toUpperCase().includes(searchText) ||
      provider.providerNit.toUpperCase().includes(searchText) ||
      provider.providerPhoneNumber.toUpperCase().includes(searchText));
  } 

  initializeProviderList(){
    return [
      {
        providerOrder: 1,
        providerName: "Name 1",
        providerBusinessName: "Business Name 6",
        providerNit: "N.I.T. 1",
        providerRatingNumber: "5.0",
        providerAddress: "Cra. 49 #104A - 14",
        providerPhoneNumber: "573112849616",
        providerCreationDate: "2021-05-22",
        providerLastModificationDate: "2021-05-22"
      },
      {
        providerOrder: 2,
        providerName: "Name 2",
        providerBusinessName: "Business Name 1",
        providerNit: "N.I.T. 2",
        providerRatingNumber: "4.5",
        providerAddress: "Cra. 49B #104A - 12",
        providerPhoneNumber: "573112849616",
        providerCreationDate: "2021-04-22",
        providerLastModificationDate: "2021-05-21"
      },
      {
        providerOrder: 3,
        providerName: "Name 3",
        providerBusinessName: "Business Name 5",
        providerNit: "N.I.T. 3",
        providerRatingNumber: "4.0",
        providerAddress: "Cra. 49B #104A - 12",
        providerPhoneNumber: "573112849610",
        providerCreationDate: "2021-05-01",
        providerLastModificationDate: "2021-05-20"
      },
      {
        providerOrder: 4,
        providerName: "Name 4",
        providerBusinessName: "Business Name 4",
        providerNit: "N.I.T. 4",
        providerRatingNumber: "3.9",
        providerAddress: "Cra. 49 #104A - 14",
        providerPhoneNumber: "573112849614",
        providerCreationDate: "2021-05-17",
        providerLastModificationDate: "2021-05-19"
      },
      {
        providerOrder: 5,
        providerName: "Name 5",
        providerBusinessName: "Business Name 3",
        providerNit: "N.I.T. 5",
        providerRatingNumber: "3.8",
        providerAddress: "Cra. 49B #104A - 12",
        providerPhoneNumber: "573112849616",
        providerCreationDate: "2021-05-19",
        providerLastModificationDate: "2021-05-18"
      },
      {
        providerOrder: 6,
        providerName: "Name 6",
        providerBusinessName: "Business Name 2",
        providerNit: "N.I.T. 6",
        providerRatingNumber: "3.7",
        providerAddress: "Cra. 49B #104A - 12",
        providerPhoneNumber: "573112849610",
        providerCreationDate: "2021-05-09",
        providerLastModificationDate: "2021-05-17"
      }
    ];
  }

  orderProviderList(){
    var categorySelected = this.orderByCategories.filter(category => category.categoryChecked == true).splice(0,1)[0].categoryProviderProperty;
    this.providerInfoList = this.providerInfoList.sort(this.dynamicSort(categorySelected));
    var orderCount = 0;
    this.providerInfoList.forEach(provider => provider.providerOrder = orderCount++);
    return this.providerInfoList.sort(this.dynamicSort("providerOrder"));
  }

  initializeCategories(){
    return [
      {
        categoryName: "Creation Date",
        categoryProviderProperty: "providerCreationDate",
        categoryChecked: false
      },
      {
        categoryName: "Name",
        categoryProviderProperty: "providerName",
        categoryChecked: false
      },
      {
        categoryName: "Business Name",
        categoryProviderProperty: "providerBusinessName",
        categoryChecked: true
      },
      {
        categoryName: "Phone Number",
        categoryProviderProperty: "providerPhoneNumber",
        categoryChecked: false
      },
      {
        categoryName: "Address",
        categoryProviderProperty: "providerAddress",
        categoryChecked: false
      },
      {
        categoryName: "N.I.T.",
        categoryProviderProperty: "providerNit",
        categoryChecked: false
      },
      {
        categoryName: "Rating",
        categoryProviderProperty: "providerRatingNumber",
        categoryChecked: false
      }
    ];
  }

  trackByProvider(i:any, item:any) {
    return item.providerOrder + " " + item.providerName;
  }

  categoryChanged(event:any){
    this.orderByCategories.forEach(category => category.categoryChecked = false);
    this.orderByCategories.filter(category => category.categoryName == event).splice(0,1).forEach(category => category.categoryChecked = true);
    this.providerInfoList = this.orderProviderList();
  }

  trackByCategory(i:any, item:any) {
    return item.categoryChecked + " " + item.categoryName;
}

  dynamicSort(property: any) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a:any, b:any) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
}
