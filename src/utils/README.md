
# RegExp File

This file defines regular expressions for validating specific data formats related to photo names, city names, and dates. They are designed to ensure that photo-related data follows specific formats and constraints, helping to maintain data integrity in the application.

## Regular Expressions

### `photoNameRegExp`

- Description: Validates photo names.
- Pattern: /^[a-zA-Z]{0,20}\.(jpg|png|jpeg)/
- Explanation:
  - Photo names should consist only of letters of the English alphabet.
  - They should be at most 20 characters long.
  - They should have one of the following extensions: "jpg", "png", or "jpeg".

### `cityNameRegExp`

- Description: Validates city names.
- Pattern: /[A-Z]{1}[a-z]{0,19}/
- Explanation:
  - City names should consist only of letters of the English alphabet.
  - They should begin with a capital letter.
  - They should be followed by lowercase letters.
  - They should be at most 20 characters long.

### `dateRegExp`

- Description: Validates dates.
- Pattern: /20(0[0-9]|1[0-9]|20)-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/
- Explanation:
  - Dates should be in the format "yyyy-mm-dd hh:mm:ss".
  - Years should range from 2000 to 2020.

### `photoDataRegExp`

- Description: Validates photo data.
- Pattern: Constructed using `photoNameRegExp`, `cityNameRegExp`, and `dateRegExp`.
- Explanation:
  - Photo data should be in the format "<\<photoname>>.<\<extension>>, <<city_name>>, yyyy-mm-dd, hh:mm:ss".

## Exported Regular Expression

- `photoDataRegExp`: Exports the regular expression for validating photo data.
