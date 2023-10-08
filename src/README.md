# Rename Photos

This file contains functions related to organizing and renaming photos based on their city and timestamp. The code helps in organizing and renaming photos as per the specified requirements. It's designed to ensure data integrity and provide clear and sorted results.

## Imports

### Types

- `PhotoExt`: Represents the file extension of a photo.
- `NameAndCity`: Represents a combination of a name and city.
- `PhotoName`: Represents the name of a photo.
- `City`: Represents the name of a city.
- `PhotoDate`: Represents the date and time when a photo was taken.
- `InputString`: Represents an array of input strings.
- `GroupedPhoto`: Represents an array of grouped photos.
- `GroupedByCity`: Represents an object containing grouped photos by city.
- `OutputString`: Represents an array of output strings.

### Regular Expression

- `photoDataRegExp`: Represents a regular expression used for validating photo data.

## Functions

### `sortByTimeTaken`

- Description: Sorts grouped photos by the time they were taken.
- Parameters:
  - `input`: An array containing stringsddf photos with associated input indexes.
- Returns: An array containing strings of photos with associated input indexes, sorted by time taken.

### `groupByCity`

- Description: Groups photos by city and sorts them by time taken.
- Parameters:
  - `input`: A string containing the list of photos.
- Returns: An object containing the list of photos grouped by city and sorted by time taken.

### `renamePhotos`

- Description: Renames all the photos based on the city and assigned numbers.
- Parameters:
  - `input`: A string containing the list of photos.
- Returns: A string containing renamed photos.

## Exported Functions

- Exported functions include `groupByCity` and `renamePhotos`.

## Example

Here's an example of how to use the project:

```typescript
// This can be replaced in rename_photos.rb any string of photos with the same structure.
const input = `photo.jpg, Krakow, 2013-09-05 14:08:15
Mike.png, London, 2015-06-20 15:13:22
myFriends.png, Krakow, 2013-09-05 14:07:13
Eiffel.jpg, Florianopolis, 2015-07-23 08:03:02
pisatower.jpg, Florianopolis, 2015-07-22 23:59:59
BOB.jpg, London, 2015-08-05 00:02:03
notredame.png, Florianopolis, 2015-09-01 12:00:00
me.jpg, Krakow, 2013-09-06 15:40:22
a.png, Krakow, 2016-02-13 13:33:50
b.jpg, Krakow, 2016-01-02 15:12:22
c.jpg, Krakow, 2016-01-02 14:34:30
d.jpg, Krakow, 2016-01-02 15:15:01
e.png, Krakow, 2016-01-02 09:49:09
f.png, Krakow, 2016-01-02 10:55:32
g.jpg, Krakow, 2016-02-29 22:13:11`;

renamePhotos(input);
// should return:
`Krakow02.jpg
London1.png
Krakow01.png
Florianopolis2.jpg
Florianopolis1.jpg
London2.jpg
Florianopolis3.png
Krakow03.jpg
Krakow09.png
Krakow07.jpg
Krakow06.jpg
Krakow08.jpg
Krakow04.png
Krakow05.png
Krakow10.jpg`
```
