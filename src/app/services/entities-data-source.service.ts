import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

export interface Entities {
  id: number;
  name: string;
  type: string;
}
interface DataSource {
  fetch(): Observable<Entities[]>;
}
@Injectable({
  providedIn: 'root'
})
export class EntitiesDataSourceService implements DataSource {

  fetch(): Observable<Entities[]> {
    return of([
      {
        id: 1,
        name: 'Arrivals',
        type: 'BPM',
      },
      {
        id: 2,
        name: 'Car Wash',
        type: 'BPM',
      },
      {
        id: 3,
        name: 'Maintenance',
        type: 'Project',
      },
      {
        id: 4,
        name: 'Customer payment',
        type: 'BPM',
      },
      {
        id: 5,
        name: 'Technical issues',
        type: 'Project',
      },
    ]);
  }
}
