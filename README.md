# common-formatters

[![buildStatus](https://img.shields.io/travis/qiwi/common-formatters.svg?maxAge=3600&branch=master)](https://travis-ci.org/qiwi/common-formatters)
[![dependencyStatus](https://img.shields.io/david/qiwi/common-formatters.svg?maxAge=3600)](https://david-dm.org/qiwi/common-formatters)
[![Maintainability](https://api.codeclimate.com/v1/badges/aa149c9058728b89a577/maintainability)](https://codeclimate.com/github/qiwi/common-formatters/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/aa149c9058728b89a577/test_coverage)](https://codeclimate.com/github/qiwi/common-formatters/test_coverage)
[![npm (scoped)](https://img.shields.io/npm/v/@qiwi/common-formatters)](https://www.npmjs.com/package/@qiwi/common-formatters)

Common string formatters.

#### Motivation
There's no such thing as universal formatters collection, but ... Ha, and this one library is just a set of several controversial workarounds. 
What can be said in defense? Smaller is better.

##### Usage examples
```javascript
    import {formatMoney, formatNumber, formatCardPan, formatPhone, formatPercent} from '@qiwi/common-formatters'
```

##### Money
```javascript
    formatMoney(12345.6789)   // '12 345,68'
    formatMoney(12300.45, {currencyCode: 'RUB', fractionDelimiter: '.'}) // '12 300.45 ₽'
    formatMoney(123.45, {currencySymbol: 'Foo'}) // '123,45 Foo'
    
    // Available opts
    {
      strict?: boolean
      digitDelimiter?: string
      fractionDelimiter?: string
      fractionLength?: number
      currencyCode?: string
      currencySymbol?: string
      currencyPosition?: 'left' | 'right'
      currencySpacer?: string
      sign?: boolean
      fractionRemoveZeros?: boolean
    }
```

##### Numbers
```javascript
        
    formatNumber(12345.6789)  //  '12 345,6789'
    formatNumber(12345.6789, {digitDelimiter: ',', fractionDelimiter: '.'}) // '12,345.6789'
    
    // Opts
    {
      digitDelimiter: string;
      fractionDelimiter: string;
      fractionLength?: number;
      strict: boolean;
      sign: boolean;
    }
```

##### Percents
```javascript
        
    formatPercent(0.123)  //  '12,30%'
    formatPercent(567, {sign: true, fractionLength: 0}) // '56 700%'
    
    // Opts
    {
      strict: boolean;
      digitDelimiter: string;
      fractionDelimiter: string;
      fractionLength: number;
      multiplier: number;
      sign: boolean;
    }
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

    // Opts
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
        mask: string;
    }
```

##### Card PAN
```javascript
    formatCardPan('1234567812345678', {digitDelimiter: '-'}) // '1234-5678-1234-5678'
```
