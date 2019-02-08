import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, map, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {Entities, EntitiesDataSourceService} from '../../services/entities-data-source.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-entities',
  templateUrl: './add-entities.component.html',
  styleUrls: ['./add-entities.component.css']
})
export class AddEntitiesComponent implements OnInit, OnDestroy {
  @Output() closeAdding = new EventEmitter();
  @Output() addEntities = new EventEmitter<Entities[]>();
  @Input() selectedElements: Entities[] = [];
  public entitiesList$: Observable<Entities[]>;
  public search: FormControl = new FormControl();
  private ngOnDestroy$: Subject<void> = new Subject();
  constructor(
    private dataSource: EntitiesDataSourceService,
  ) { }

  ngOnInit() {
    this.selectedElements = [...this.selectedElements];
    this.entitiesList$ = this.dataSource.fetch().pipe(
      map((elements: Entities[]) => {
        return elements.map((el: Entities) => ({
          ...el,
          checked: !!this.selectedElements.find((entity: Entities) => entity.id === el.id)
        }));
      }),
      takeUntil(this.ngOnDestroy$)
    );
    this.search.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((val: string) => {
        return this.dataSource.fetch().pipe(
          map((elements: Entities[]) => {
            return elements
              .filter((el: Entities) => el.name.includes(val) || el.type.includes(val))
              .map((el: Entities) => {
                let checked = false;
                if (!!this.selectedElements.find((value: Entities) => value.id === el.id)) {
                  checked = true;
                }
                return {...el, checked: checked};
              });
          })
        );
      }),
      tap((val: Entities[]) => {
        this.entitiesList$ = of(val);
      }),
      takeUntil(this.ngOnDestroy$),
    ).subscribe();
  }
  ngOnDestroy() {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
  selectValue(val: Entities): void {
    if (!this.selectedElements.find((el: Entities) => el.id === val.id)) {
      this.selectedElements.push(val);
    } else {
      this.selectedElements.splice(this.selectedElements.indexOf(val), 1);
    }
  }
}
