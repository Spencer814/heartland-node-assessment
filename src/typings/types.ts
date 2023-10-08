/** Each photo has a name with an extension ("jpg", "png' or "jpeg"), a city and a date. */
type PhotoExt = 'jpg' | 'png' | 'jpeg';

/** Each photo name and city is a string of letters of the English alphabet. */
type NameAndCity = string;

/** Filename of the photo with extension */
type PhotoName = `${NameAndCity}.${PhotoExt}`;

/** Capitalized city */
type City = Capitalize<NameAndCity>;

/** Year is an integer within the range (2000..2020) */
type Year = `20${`0${number}` | `1${number}` | `20`}`;
/** Date with the valid year range */
type PhotoDate = `${Year}-${number}-${number} ${number}:${number}:${number}`

/** String containing the list of photos. */
type InputString = `${PhotoName}, ${City}, ${PhotoDate}`;

/** String of the photo with associated input index */
type GroupedPhoto = `${PhotoExt}, ${PhotoDate}, ${number}`;

/** Object containing the list of photos grouped by city and sorted by time taken. */
type GroupedByCity = {
  [key: string]: GroupedPhoto[];
};

/** String containing renamed photos. */
type OutputString = `${City}${number}.${PhotoExt}`;

export type {
  PhotoExt,
  NameAndCity,
  PhotoName,
  City,
  PhotoDate,
  InputString,
  GroupedPhoto,
  GroupedByCity,
  OutputString
};