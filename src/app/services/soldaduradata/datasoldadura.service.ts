import { Injectable } from '@angular/core';
import { soldador_interface } from '../../data/interface/juntas/soldadores/soldadores';


@Injectable({
  providedIn: 'root'
})
export class DatasoldaduraService {
  private jsonSoldadura: soldador_interface[] = [];

  setJsonData(data: any) {
    this.jsonSoldadura= data;
  }

  getJsonData() {
    return this.jsonSoldadura;
  }
}
