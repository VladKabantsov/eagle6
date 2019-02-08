import {Component} from '@angular/core';
import {Entities} from '../../services/entities-data-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showEntity = true;
  public entities: Entities[] = [];

  connectValues(arr: Entities[]): void {
    this.entities = arr;
  }
}
