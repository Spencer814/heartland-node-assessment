# Types File

This file defines a set of custom types for handling and organizing photo data, including photo names, cities, dates, and more. This will help to maintain a structured and organized representation of photo data, making it faster to work with while allowing easier manipulation of the code.

## Custom Types

### `PhotoExt`

- Description: Represents the extension of a photo.
- Values: 'jpg', 'png', or 'jpeg'.
- Explanation: Each photo has an extension, which can be one of these three types.

### `NameAndCity`

- Description: Represents the combined name and city of a photo.
- Type: string
- Explanation: Both the name and city are strings of English alphabet letters.

### `PhotoName`

- Description: Represents the filename of a photo with its extension.
- Type: `${NameAndCity}.${PhotoExt}`
- Explanation: It combines the name and extension of the photo.

### `City`

- Description: Represents the city where the photo was taken.
- Type: Capitalized version of `NameAndCity`.
- Explanation: City names are capitalized.

### `Year`

- Description: Represents a year within the range (2000..2020).
- Type: `20${`0${number}` | `1${number}` | `20`}`
- Explanation: It constrains years to be within this specific range.

### `PhotoDate`

- Description: Represents a date with a valid year range.
- Type: `${Year}-${number}-${number} ${number}:${number}:${number}`
- Explanation: Dates follow the format "yyyy-mm-dd hh:mm:ss" with valid years.

### `InputString`

- Description: Represents a string containing the list of photos.
- Type: `${PhotoName}, ${City}, ${PhotoDate}`
- Explanation: It combines the photo name, city, and date.

### `GroupedPhoto`

- Description: Represents a string of the photo with an associated input index.
- Type: `${PhotoExt}, ${PhotoDate}, ${number}`
- Explanation: It includes the photo extension, date, and index.

### `GroupedByCity`

- Description: Represents an object containing the list of photos grouped by city and sorted by time taken.
- Type: `{ [key: string]: GroupedPhoto[] }`
- Explanation: Photos are organized by city with sorting by time.

### `OutputString`

- Description: Represents a string containing the renamed photo.
- Type: `${City}${number}.${PhotoExt}`
- Explanation: It combines the city, an assigned number, and the extension for the renamed photo.

## Exported Types

- This file exports all of these custom types for use in the application.
