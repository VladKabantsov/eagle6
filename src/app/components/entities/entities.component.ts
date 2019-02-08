import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Entities} from '../../services/entities-data-source.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {
  @Output() addEntity = new EventEmitter();
  @Input() entities: Entities[];
  public show = false;
  constructor() {
  }

  ngOnInit() {

  }


}
