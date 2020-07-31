import { Component, OnInit, Input } from '@angular/core';
import { Installment } from '../shared/installment.model';

@Component({
  selector: 'app-installments',
  templateUrl: './installments.component.html',
  styleUrls: ['./installments.component.css']
})
export class InstallmentsComponent implements OnInit {

  @Input() getInstallments: Array<Installment>;

  constructor() { }

  ngOnInit(): void {
  }

}
