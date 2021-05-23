import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Provider } from '../provider-interface/provider';

@Injectable()
export class ProviderService {
  
  private production = true;
  private urlApiWeb = (this.production)?'http://provider-web-api.gear.host':'https://localhost:44301';
  private urlFrontEnd = (this.production)? 'http://localhost:4200':'http://localhost:4200';

  constructor(private http: HttpClient) { }

  getAllProviders() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': this.urlFrontEnd,  
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get<any[]>(this.urlApiWeb + '/api/provider/', requestOptions);
  }
  
  saveProvider(providerInfo: any) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': this.urlFrontEnd,  
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.post<any[]>(this.urlApiWeb + '/api/provider/',providerInfo, requestOptions);
  }

  updateProvider(providerInfo: any) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': this.urlFrontEnd,  
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.put<any[]>(this.urlApiWeb + '/api/provider/',providerInfo, requestOptions);
  }

  deleteProvider(id: any) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': this.urlFrontEnd,  
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.delete<any[]>(this.urlApiWeb + '/api/provider/' + id, requestOptions);
  }
}