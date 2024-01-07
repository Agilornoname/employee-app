// currency.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    // Format the value as IDR
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  }
}
