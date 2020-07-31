export class Installment {
  constructor(public installment: string,
              public balanceDue: string,
              public rate: string,
              public amortization: string,
              public quota: string,
              public balanceAfterPay: string) {}
}
