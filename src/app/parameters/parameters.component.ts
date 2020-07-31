import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { InstallmentsComponent } from '../installments/installments.component';
import { Installment } from '../shared/installment.model';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {
  @ViewChild('amountInput',{static: false}) amountInputRef: ElementRef;
  @ViewChild('installmentsInput',{static: false}) installmentsInputRef: ElementRef;
  @ViewChild('rateInput',{static: false}) rateInputRef: ElementRef;

  installments: Array<Installment>;
  add: number = 0;
  total: string = "0";

  constructor() { }

  ngOnInit(): void {
  }

  installmentPrecisionRound(number){
    var number = number.toString(),
    reais = number.split('.')[0],
    cents = (number.split('.')[1] || '') +'00';
    reais = reais.split('').reverse().join('').replace(/(\d{3}(?!$))/g, '$1.').split('').reverse().join('');
    return 'R$ ' + reais + ',' + cents.slice(0, 2);
  }

  callCalc() {
    let amountConvetedFloat = parseFloat(this.amountInputRef.nativeElement.value);
    let installmentConvertedInt = parseInt(this.installmentsInputRef.nativeElement.value);
    let rateConvertedFloat = parseFloat(this.rateInputRef.nativeElement.value);
    this.add = 0;
    this.installments = [];
    const rateConvertedMonthFloat = (Math.pow((1+(rateConvertedFloat/100)),(1/12))-1)

    let monthAmortization = amountConvetedFloat/installmentConvertedInt;
    let balanceAfterAmort = amountConvetedFloat;

    for (let i = 1; i <= installmentConvertedInt; i++){
      this.installments.push({installment: String(i),
                              balanceDue: String(this.installmentPrecisionRound(balanceAfterAmort)),
                              rate: String(this.installmentPrecisionRound((balanceAfterAmort*rateConvertedMonthFloat))),
                              amortization: String(this.installmentPrecisionRound(monthAmortization)),
                              quota: String(this.installmentPrecisionRound((balanceAfterAmort*rateConvertedMonthFloat)+monthAmortization)),
                              balanceAfterPay: String(this.installmentPrecisionRound((balanceAfterAmort-monthAmortization)))});

      balanceAfterAmort = balanceAfterAmort-monthAmortization;
      this.add = this.add + (balanceAfterAmort*rateConvertedMonthFloat)+monthAmortization;
    }
    this.total = String(this.installmentPrecisionRound(this.add));
  }
}
