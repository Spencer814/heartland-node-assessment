import type {
  PhotoExt,
  NameAndCity,
  PhotoName,
  City,
  PhotoDate,
  InputString,
  GroupedPhoto,
  GroupedByCity,
  OutputString
} from './typings/types';
import { photoDataRegExp } from './utils/regex';

/**
 * @function sortByTimeTaken
 * @description Sort grouped photos by time taken
 * @param {GroupedPhoto[]} input - Array containing strings of the photos with associated input indexes.
 * @returns {GroupedPhoto[]} - Array containing strings of the photos with associated input indexes, sorted by time taken.
 */
const sortByTimeTaken = (input: GroupedPhoto[]): GroupedPhoto[] => input.sort((a, b) => {
  // Split each photo into an array of strings.
  const [, dateA] = a.split(', ') as [PhotoExt, PhotoDate];
  const [, dateB] = b.split(', ') as [PhotoExt, PhotoDate];

  // Compare the dates.
  return new Date(dateA).getTime() - new Date(dateB).getTime();
});

/**
 * @function groupByCity
 * @description Group photos by city
 * @param {string} input - String containing the list of photos.
 * @returns {GroupedByCity} - Object containing the list of photos grouped by city and sorted by time taken.
 */
const groupByCity = (input: string): GroupedByCity => {
  // Split input string by newline characters to create array of photos
  const photos = input.split('\n') as InputString[];

  // Validate photos before processing to avoid errors and ensure data integrity.
  const validPhotos = photos.filter(photo => photo.match(photoDataRegExp));

  return validPhotos.reduce((groups: GroupedByCity, photoData, index) => {
    // Only process the photo if it matches the expected format.
    if (photoData.match(photoDataRegExp)) {
      // Split each photo into an array of strings.
      const [name, city, date] = photoData.split(', ') as [PhotoName, City, PhotoDate];

      // Split the photo name to return only the extension.
      const [, extension] = name.split('.') as [NameAndCity, PhotoExt];

      // If the city name is not a key in the object, add it.
      if (!groups[city]) {
        groups[city] = [];
      }

      // Push the photo to the array of photos for the city, sorted by time taken.
      groups[city] = sortByTimeTaken([...groups[city], `${extension}, ${date}, ${index}`]);
    }

    return groups;
  }, {});
};

/**
 * @function renamePhotos
 * @description Rename all the photos
 * @param {string} input - String containing the list of photos.
 * @returns {string} - String containing renamed photos.
 */
const renamePhotos = (input: string): OutputString => {
  // Group photos by city
  const groupedByCity = groupByCity(input);

  const formatAndRenamePhotos = Object.entries(groupedByCity).reduce((acc: OutputString[], [city, photos]) => {
    const cityName = city as City;

    // Get length of digits for the stringified length of the photos array.
    const lengthOfCityPhotos = `${photos.length}`.length;

    // For each photo rename it and add it to the array in its original order.
    photos.forEach((photo, index) => {
      const [extension, , position] = photo.split(', ') as [PhotoExt, PhotoDate, `${number}`];

      // Assign consecutive natural numbers to photos, starting from 1.
      const photoNumber = index + 1;

      // Add leading zero to the number if necessary.
      const cityPhotoNumber = `${photoNumber}`.padStart(lengthOfCityPhotos, '0');

      // Return the new name of the photo at the original index.
      acc[parseInt(position)] = `${cityName}${cityPhotoNumber}.${extension}` as OutputString;
    });

    return acc;
  }, []);

  // Return output by joining the array of renamed photos with newline characters
  return formatAndRenamePhotos.join('\n') as OutputString;
}

export { groupByCity, renamePhotos };

/*
// Example usage:
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

console.log(renamePhotos(input));
*/