import { Component } from '@angular/core';
import { ProviderService } from './provider-services/provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  orderByCategories:any = [];
  providerInfoList:any = [];
  fields:any = [];
  ratedProviders = [];
  creatingProvider: boolean = false;
  editingProvider: boolean = false;
  lastSearchText:string = "";
  
  constructor(private providerService: ProviderService){

  }

  ngOnInit(): void{
    this.initializeCategories();
    this.initializeProviderList();
    this.initializeFields(); 
    this.searchTextClicked("");
  }


  initializeCategories(){
    this.orderByCategories = [
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

  initializeProviderList(){
    return this.providerService.getAllProviders()
    .subscribe((data: any) =>{
          this.providerInfoList = data;
          this.ratedProviders = this.providerInfoList.sort((a:any,b:any) => (a.providerRatingNumber > b.providerRatingNumber ? -1 : 1)).slice(0, 5);
        });
  }
  
  initializeFields(){
    this.fields = [
      {
        fieldOrder: 1,
        fieldLabel: "Provider Name",
        fieldValue: ""
      },
      {
        fieldOrder: 2,
        fieldLabel: "Provider Business Name",
        fieldValue: ""
      },
      {
        fieldOrder: 3,
        fieldLabel: "Provider N.I.T.",
        fieldValue: ""
      },
      {
        fieldOrder: 4,
        fieldLabel: "Provider Address",
        fieldValue: ""
      },
      {
        fieldOrder: 5,
        fieldLabel: "Provider Phone Number",
        fieldValue: ""
      },
      {
        fieldOrder: 6,
        fieldLabel: "Provider Rating Number",
        fieldValue: ""
      }
    ];
  }

  searchTextClicked(searchText: string){ 
    this.lastSearchText = searchText;
    this.providerService.getAllProviders()
    .subscribe((data: any) =>{
          this.providerInfoList = data;
          this.providerInfoList = this.orderProviderList();
          searchText = searchText.toUpperCase();
          this.providerInfoList = this.providerInfoList.filter((provider:any) => 
            provider.providerName.toUpperCase().includes(searchText) ||
            provider.providerBusinessName.toUpperCase().includes(searchText) ||
            provider.providerAddress.toUpperCase().includes(searchText) ||
            provider.providerNIT.toUpperCase().includes(searchText) ||
            provider.providerPhoneNumber.toUpperCase().includes(searchText));
        });
  } 

  orderProviderList(){
    var categorySelected = this.orderByCategories.filter((category:any) => category.categoryChecked == true).splice(0,1)[0].categoryProviderProperty;
    this.providerInfoList = this.providerInfoList.sort(this.dynamicSort(categorySelected));
    var orderCount = 0;
    this.providerInfoList.forEach((provider:any) => provider.providerOrder = orderCount++);
    return this.providerInfoList.sort(this.dynamicSort("providerOrder"));
  }

  trackByProvider(i:any, item:any) {
    return item.providerOrder + " " + item.providerName;
  }

  trackByRating(i:any, item:any) {
    return item.providerRatingNumber + " " + item.providerName;
  }

  trackByCategory(i:any, item:any) {
    return item.categoryChecked + " " + item.categoryName;
  }

  categoryChanged(event:any){
    this.orderByCategories.forEach((category:any) => category.categoryChecked = false);
    this.orderByCategories.filter((category:any) => category.categoryName == event).splice(0,1).forEach((category:any) => category.categoryChecked = true);
    this.providerInfoList = this.orderProviderList();
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

  saveProvider(nameInput:any,businessNameInput:any,nitInput:any,addressInput:any,phoneNumberInput:any,ratingNumberInput:any){

    var nextOrder =  this.providerInfoList.sort(this.dynamicSort("-providerOrder"))[0].providerOrder + 1;
    var newProvider = {
      providerOrder: nextOrder,
      providerName: nameInput,
      providerBusinessName: businessNameInput,
      providerNIT: nitInput,
      providerRatingNumber: ratingNumberInput,
      providerAddress: addressInput,
      providerPhoneNumber: phoneNumberInput,
      providerCreationDate: (new Date()).toISOString().split('T')[0],
      providerLastModificationDate: ""
    };
    if(this.validateInformation(newProvider)){
      this.providerService.saveProvider(newProvider)
      .subscribe((data: any) =>{
            console.log(data);
            newProvider.providerRatingNumber = (+newProvider.providerRatingNumber).toFixed(1).toString();
            this.providerInfoList = this.providerInfoList.concat(newProvider);
            this.creatingProvider = false;
          },
          (error:any) => alert("Ocurrio un error insertando en el servidor."));
    }
    else{
      alert('Validate the information you provided and try again.')
    }

    nameInput = "";
    businessNameInput = "";
    nitInput = "";
    addressInput = "";
    phoneNumberInput = "";
    ratingNumberInput = "";

  }

  updateProvider(idInputEdit:any,orderInputEdit:any,creationDateInputEdit:any,nameInputEdit:any,businessNameInputEdit:any,nitInputEdit:any,addressInputEdit:any,phoneNumberInputEdit:any,ratingNumberInputEdit:any){

    var orderToEdit =  parseInt(orderInputEdit);
    this.providerInfoList = this.providerInfoList.filter((provider:any) => provider.providerOrder != orderToEdit)
    var updateProvider = {
        providerId: idInputEdit,
        providerOrder: orderToEdit,
        providerName: nameInputEdit,
        providerBusinessName: businessNameInputEdit,
        providerNIT: nitInputEdit,
        providerRatingNumber: ratingNumberInputEdit,
        providerAddress: addressInputEdit,
        providerPhoneNumber: phoneNumberInputEdit,
        providerCreationDate: creationDateInputEdit,
        providerLastModificationDate: (new Date()).toISOString().split('T')[0]
    };
    if(this.validateInformation(updateProvider)){
      this.providerService.updateProvider(updateProvider)
      .subscribe((data: any) =>{
            console.log(data);
            updateProvider.providerRatingNumber = (+updateProvider.providerRatingNumber).toFixed(1).toString();
            this.providerInfoList = this.providerInfoList.concat(updateProvider);
            this.editingProvider = false;
          },
          (error:any) => alert("Ocurrio un error actualizando en el servidor."));
    }
    else{
      alert('Validate the information you provided and try again.')
    }

    orderInputEdit = "";
    creationDateInputEdit = "";
    nameInputEdit = "";
    businessNameInputEdit = "";
    nitInputEdit = "";
    addressInputEdit = "";
    phoneNumberInputEdit = "";
    ratingNumberInputEdit = "";

  }

  editProvider(event:any){
    this.editingProvider = true;
    console.log(this.providerInfoList);
    var providerToEdit = this.providerInfoList.filter((provider:any) => provider.providerName == event).splice(0,1)[0];
    this.fields = this.getFieldsValues(providerToEdit);
  }

  getFieldsValues(providerToEdit: any){
    return [
      {
        fieldOrder: 0,
        fieldLabel: "Provider Name",
        fieldValue: providerToEdit.providerName
      },
      {
        fieldOrder: 1,
        fieldLabel: "Provider Business Name",
        fieldValue: providerToEdit.providerBusinessName
      },
      {
        fieldOrder: 2,
        fieldLabel: "Provider N.I.T.",
        fieldValue: providerToEdit.providerNIT
      },
      {
        fieldOrder: 3,
        fieldLabel: "Provider Address",
        fieldValue: providerToEdit.providerAddress
      },
      {
        fieldOrder: 4,
        fieldLabel: "Provider Phone Number",
        fieldValue: providerToEdit.providerPhoneNumber
      },
      {
        fieldOrder: 5,
        fieldLabel: "Provider Rating Number",
        fieldValue: providerToEdit.providerRatingNumber
      },
      {
        fieldOrder: 6,
        fieldLabel: "Provider Order",
        fieldValue: providerToEdit.providerOrder.toString()
      },
      {
        fieldOrder: 7,
        fieldLabel: "Provider Creation Date",
        fieldValue: providerToEdit.providerCreationDate
      },
      {
        fieldOrder: 8,
        fieldLabel: "Provider ID",
        fieldValue: providerToEdit.providerID
      }
    ];
  }

  deleteProvider(event:any){
    var id = this.providerInfoList.filter((provider:any) => provider.providerName == event).splice(0,1)[0].providerID;
    this.providerService.deleteProvider(id)
    .subscribe((data: any) =>
          console.log(data)
        );
    this.providerInfoList = this.providerInfoList.filter((provider:any) => provider.providerName != event);
  }

  validateInformation(providerInfo:any){
    console.log(providerInfo.providerName);
    console.log(providerInfo.providerName.length);
    if(providerInfo.providerName.length == 0){
      alert("The name must not be empty.");
      return false;
    }
    if(providerInfo.providerName.length > 100){
      alert("The name must not have more than 100 caracters.");
      return false;
    }
    if(this.providerInfoList.filter((provider:any) => provider.providerName == providerInfo.providerName).length > 0){
      alert("The name can not be repeated.");
      return false;
    }
    if(providerInfo.providerBusinessName.length == 0){
      alert("The business name must not be empty.");
      return false;
    }
    if(providerInfo.providerBusinessName.length > 100){
      alert("The business name must not have more than 100 caracters.");
      return false;
    }
    if(providerInfo.providerNIT.length == 0){
      alert("The NIT must not be empty.");
      return false;
    }
    if(providerInfo.providerNIT.length > 11){
      alert("The NIT must not have more than 11 caracters.");
      return false;
    }
    if(providerInfo.providerAddress.length == 0){
      alert("The business name must not be empty.");
      return false;
    }
    if(providerInfo.providerAddress.length > 200){
      alert("The business name must not have more than 200 caracters.");
      return false;
    }
    if(providerInfo.providerPhoneNumber.length == 0){
      alert("The phone number must not be empty.");
      return false;
    }
    if(providerInfo.providerPhoneNumber.length > 15){
      alert("The phone number must not have more than 15 caracters.");
      return false;
    }
    if(providerInfo.providerRatingNumber.length == 0){
      alert("The rating number must not be empty.");
      return false;
    }
    if(this.validateRatingNumber(providerInfo.providerRatingNumber)){
      alert("The rating number must a value between 0 and 5.");
      return false;
    }
    console.log(+providerInfo.providerRatingNumber);
    if(!((+providerInfo.providerRatingNumber) >= 0 && (+providerInfo.providerRatingNumber) <= 5 )) {
      alert("The rating number must a value between 0 and 5.");
      return false;
    }
    return true;
  }

  validateRatingNumber(s: any) {
    var rgx = /^[0-9]*\.\,?[0-9]*$/;
    return s.match(rgx) == null;
  }
}
