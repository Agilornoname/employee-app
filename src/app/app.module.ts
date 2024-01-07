import { NgModule } from '@angular/core';
import { CurrencyFormatPipe } from './pipes/currency.pipe';

@NgModule({
  declarations: [
    CurrencyFormatPipe,
  ],
  exports: [
    CurrencyFormatPipe
  ]
})
export class AppModule {}
