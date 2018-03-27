# common-formatters
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![buildStatus](https://img.shields.io/travis/qiwi/common-formatters.svg?maxAge=3600&branch=master)](https://travis-ci.org/qiwi/common-formatters)
[![coverage](https://img.shields.io/coveralls/qiwi/common-formatters.svg?maxAge=3600)](https://coveralls.io/github/qiwi/common-formatters)
[![dependencyStatus](https://img.shields.io/david/qiwi/common-formatters.svg?maxAge=3600)](https://david-dm.org/qiwi/common-formatters)
[![devDependencyStatus](https://img.shields.io/david/dev/qiwi/common-formatters.svg?maxAge=3600)](https://david-dm.org/qiwi/common-formatters)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/qiwi/common-formatters)

Common string formatters

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
