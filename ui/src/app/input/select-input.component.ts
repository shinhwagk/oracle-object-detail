import { Component, OnInit, Input } from '@angular/core';

import { InputInterface } from './input.itf';
import { QueryService } from '../query.service';

@Component({
  selector: 'input-select',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
  providers: [QueryService]
})
export class SelectInputComponent implements OnInit, InputInterface {

  inputs = [{name:"owner",sql:"xxx"}]

  params: string[] = [];



  names: string[] = []
  options: string[][] = []
  selectLength: number;

  ready = false

  constructor(private qs: QueryService) { }

  setParams(idx: number, arg: string) {
    this.params[idx] = arg
  }

  formatValue(values: Array<string[]>) {
    this.names = values[0]
    this.selectLength = this.names.length
    values.shift();
    this.options = Array.from({ length: this.selectLength }, () => [])

    values.forEach(vals => {
      for (let i = 0; i <= this.selectLength - 1; i++) {
        const v: string = vals[i]
        this.options[i].push(v)
        console.info(`option: ${i}`, this.options[0])
      }
    })
    this.ready = true
    return;
  }

  ngOnInit() {
    this.qs.rdbmsQuery('select owner,table_name from dba_tables where rownum <10', []).then(p => this.formatValue(p));
  }
}
