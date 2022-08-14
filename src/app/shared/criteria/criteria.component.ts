import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,
        Input,
        OnChanges,
        SimpleChanges} from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {

  listFilter: string = 'cart';
  hitMessage: string;

  @ViewChild('filterElement') filterElementRef: ElementRef;

  @Input() displayDetail:boolean
  @Input() hitCount: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["hitCount"]&& !changes["hitCount"].currentValue){
      this.hitMessage = "No matches founnd";
    }
    else{
      this.hitMessage = "Hist " + this.hitCount;
    }
  }

  ngAfterViewInit(): void {
    if(this.filterElementRef){
      this.filterElementRef.nativeElement.focus();
    }
  }


  ngOnInit(): void {

  }
}
