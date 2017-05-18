# US Street Abbreviations
## Returns an array of strings with various standard US postal street keywords abbreviated.

Installation:

```bash
npm install --save us-street-abbrevations
```

Usage:

```javascript
const X = import * from 'us-street-abbreviations';
X.getVariants('123 North Northeast Street');
```

Expected result:

```javascript
[
  '123 north northeast street',
  '123 n northeast street',
  '123 n ne street',
  '123 n ne st',
  '123 north ne street',
  '123 north ne st',
  '123 north northeast st',
]
```

TODO:

  * Test more
