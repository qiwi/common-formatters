# common-formatters
Common string formatters

##### Usage examples

```javascript
    import {formatMoney, formatNumber} from '@qiwi/common-formatters'
    
    formatMoney(12345.6789)   // '12 345,68'
    formatMoney(12300.45, {currencyCode: 'RUB', fractionDelimiter: '.'}) // '12 300.45 ₽'
    formatMoney(123.45, {currencySymbol: 'Foo'}) // '123,45 Foo'
    
    formatNumber(12345.6789)  //  '12 345,6789'
    formatNumber(12345.6789, {digitDelimiter: ',', fractionDelimiter: '.'}) // '12,345.6789'
```
