import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DocumentContents } from '../../documents/document.service';

@Component({
  selector: 'aio-dt',
  template: `
    <div>
      <hr>
      <textarea #dt [value]="text" rows="10" cols="80"></textarea>
      <br/>
      <button (click)="dtextSet()">Show change</button>
    </div>
  `
})
export class DtComponent {

  @Input() doc: DocumentContents = {id: '1', contents: this.text};
  @Output() docChange = new EventEmitter<DocumentContents>();

  @ViewChild('dt', { read: ElementRef, static: true })
  dt: ElementRef | undefined;

  get text() { return this.doc && this.doc.contents; }

  dtextSet() {
    if (!this.dt) return;
    this.doc.contents = this.dt.nativeElement.value;
    this.docChange.emit({ ...this.doc });
  }
}
