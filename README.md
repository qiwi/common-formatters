# common-formatters
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![buildStatus](https://img.shields.io/travis/qiwi/common-formatters.svg?maxAge=3600&branch=master)](https://travis-ci.org/qiwi/common-formatters)
[![coverage](https://img.shields.io/coveralls/qiwi/common-formatters.svg?maxAge=3600)](https://coveralls.io/github/qiwi/common-formatters)
[![dependencyStatus](https://img.shields.io/david/qiwi/common-formatters.svg?maxAge=3600)](https://david-dm.org/qiwi/common-formatters)
[![devDependencyStatus](https://img.shields.io/david/dev/qiwi/common-formatters.svg?maxAge=3600)](https://david-dm.org/qiwi/common-formatters)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/qiwi/common-formatters)

Common string formatters.

##### Motivation
There's no such thing as universal formatters collection, but ... Ha, and this one library is just as set of several controversial workarounds. 
What can be said in defense? Smaller is better.

##### Usage examples

```javascript
    import {formatMoney, formatNumber, formatCardPan} from '@qiwi/common-formatters'
    
    formatMoney(12345.6789)   // '12 345,68'
    formatMoney(12300.45, {currencyCode: 'RUB', fractionDelimiter: '.'}) // '12 300.45 ₽'
    formatMoney(123.45, {currencySymbol: 'Foo'}) // '123,45 Foo'
    
    formatNumber(12345.6789)  //  '12 345,6789'
    formatNumber(12345.6789, {digitDelimiter: ',', fractionDelimiter: '.'}) // '12,345.6789'
    
    formatCardPan('1234567812345678', {digitDelimiter: '-'}) // '1234-5678-1234-5678'
```

##### Phone numbers
* [E.164](https://en.wikipedia.org/wiki/E.164)
* [Formatting International Phone Numbers](https://support.twilio.com/hc/en-us/articles/223183008-Formatting-International-Phone-Numbers)
```javascript
   // Basic cases
   formatPhone('1234567')     // 123-45-67
   formatPhone('12345678')    // 1234-5678
   formatPhone('12345')       // 1-23-45
   formatPhone('1234567890')  // 1234567890
   
   // Format by mask
   formatPhone('79876543210', {mask: '+* *** ***-**-**'}) // +7 987 654-32-10
   
   // Format by opts
   formatPhone('223344', {countryCode: '7', areaCode: '8443', areaBrackets: true, phoneNumberDelimiter: '_'}) // +7 (8443) 22_33_44
```

Supported options:
```javascript
  {
    blocksDelimiter: string;
    countryCode: string;
    areaCode: string;
    areaBrackets: boolean;
    areaCodeLength: number;
    countryCodePrefix: string;
    countryCodeLength: number;
    phoneNumberLength: number;
    phoneNumberDelimiter: string;
    mask: string
  }
```
