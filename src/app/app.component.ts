import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'financiamento';
  @ViewChild('amountInput',{static: false}) amountInputRef: ElementRef;
  @ViewChild('plotsInput',{static: false}) plotsInputRef: ElementRef;
  @ViewChild('rateInput',{static: false}) rateInputRef: ElementRef;
  
  plots: Array<any> = [];

  calcular(){
    this.plots = [];
    let finAmountInput = this.amountInputRef.nativeElement.value;
    let finPlotsInput = this.plotsInputRef.nativeElement.value;
    let finRateInput = this.rateInputRef.nativeElement.value;
    const forRateMonthInput = (Math.pow((1+(finRateInput/100)),(1/12))-1)
    
    let forRate = 0;
    let forAmortization = finAmountInput/finPlotsInput;
    let forFlow = 0;
    let forEndBalance = finAmountInput;

    for (let i = 1; i <= finPlotsInput; i++){
      forRate = (forEndBalance*forRateMonthInput);
      forFlow = forRate+forAmortization;
      this.plots.push({plot: i,
                      balance: this.precisionRound(forEndBalance),
                      rate: this.precisionRound(forRate),
                      amortization: this.precisionRound(forAmortization),
                      flow: this.precisionRound(forFlow),
                      endBalance: this.precisionRound((forEndBalance-forAmortization))});

      forEndBalance = forEndBalance-forAmortization;
    }
    // this.plotAdded.emit(this.plotEmit);
  }

  precisionRound(number){
    var number = number.toString(), 
    reais = number.split('.')[0], 
    cents = (number.split('.')[1] || '') +'00';
    reais = reais.split('').reverse().join('').replace(/(\d{3}(?!$))/g, '$1.').split('').reverse().join('');
    return 'R$ ' + reais + ',' + cents.slice(0, 2);
  }
  

}
