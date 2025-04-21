import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { NgClass, NgIf } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject, take } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [Button, InputText, FormsModule, TooltipModule, NgClass, NgIf],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  @Input() public placeholder: string = '';
  @Input() public tooltipBtn: string = 'Start search';
  @Input() public loading: boolean = false;

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

  public searchInput: string = '';
  public validError: boolean = false;

  private searchSubject$: Subject<string> = new Subject<string>();

  public ngOnInit() {
    this.searchSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((value) => {
      this.searchEvent.emit(value);
    });
  }

  public search() {
    if (this.searchInput) {
      this.searchSubject$.next(this.searchInput);
    } else {
      this.validError = true;
    }
  }
}
