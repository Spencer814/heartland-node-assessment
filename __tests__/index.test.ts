import type {
  PhotoExt,
  City,
  PhotoDate,
  InputString,
  GroupedByCity,
  OutputString
} from '../src/typings/types';
import { groupByCity, renamePhotos } from '../src/index';

const mockGroupByCity = jest.fn(groupByCity);
const mockRenamePhotos = jest.fn(renamePhotos);

const inputImages = [
  'photo.jpg, Krakow, 2013-09-05 14:08:15',
  'Mike.png, London, 2015-06-20 15:13:22',
  'myFriends.png, Krakow, 2013-09-05 14:07:13',
  'Eiffel.jpg, Florianopolis, 2015-07-23 08:03:02',
  'pisatower.jpg, Florianopolis, 2015-07-22 23:59:59',
  'BOB.jpg, London, 2015-08-05 00:02:03',
  'notredame.png, Florianopolis, 2015-09-01 12:00:00',
  'me.jpg, Krakow, 2013-09-06 15:40:22',
  'a.png, Krakow, 2016-02-13 13:33:50',
  'b.jpg, Krakow, 2016-01-02 15:12:22',
  'c.jpg, Krakow, 2016-01-02 14:34:30',
  'd.jpg, Krakow, 2016-01-02 15:15:01',
  'e.png, Krakow, 2016-01-02 09:49:09',
  'f.png, Krakow, 2016-01-02 10:55:32',
  'g.jpg, Krakow, 2016-02-29 22:13:11'
] as InputString[];

const images = inputImages.join('\n');

describe('Rename photos', () => {
  let groupedPhotos: GroupedByCity;
  let renamedPhotos: string;

  beforeEach(() => {
    groupedPhotos = mockGroupByCity(images);
    renamedPhotos = mockRenamePhotos(images);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should group photos by city', () => {
    expect(groupedPhotos).toHaveProperty('Florianopolis');
    expect(groupedPhotos).toHaveProperty('Krakow');
    expect(groupedPhotos).toHaveProperty('London');
  });

  test('should sort grouped photos by time taken', () => {
    expect(groupedPhotos.Florianopolis).toStrictEqual([
      'jpg, 2015-07-22 23:59:59, 4',
      'jpg, 2015-07-23 08:03:02, 3',
      'png, 2015-09-01 12:00:00, 6'
    ]);

    expect(groupedPhotos.Krakow).toStrictEqual([
      'png, 2013-09-05 14:07:13, 2',
      'jpg, 2013-09-05 14:08:15, 0',
      'jpg, 2013-09-06 15:40:22, 7',
      'png, 2016-01-02 09:49:09, 12',
      'png, 2016-01-02 10:55:32, 13',
      'jpg, 2016-01-02 14:34:30, 10',
      'jpg, 2016-01-02 15:12:22, 9',
      'jpg, 2016-01-02 15:15:01, 11',
      'png, 2016-02-13 13:33:50, 8',
      'jpg, 2016-02-29 22:13:11, 14'
    ]);

    expect(groupedPhotos.London).toStrictEqual([
      'png, 2015-06-20 15:13:22, 1',
      'jpg, 2015-08-05 00:02:03, 5'
    ]);
  });

  test('should validate photos to avoid processing invalid data', () => {
    const imagesWithBadData = images.split('\n').concat([
      'photo34.jpeg, Capetown, 2020-02-21 12:34:89', // Invalid photo name.
      'image.jpeg, Beijing, 2021-02-21 12:34:89', // Date out of range.
      'img.png, brasiliA, 2019-02-21 12:34:89', // Invalid city name.
      'IMG.gif, Chicago, 2019-02-21 12:34:89' // Invalid extension.
    ]).join('\n');

    const groupedPhotosWithBadData: GroupedByCity = mockGroupByCity(imagesWithBadData);

    expect(groupedPhotosWithBadData).not.toHaveProperty('Capetown');
    expect(groupedPhotosWithBadData).not.toHaveProperty('Beijing');
    expect(groupedPhotosWithBadData).not.toHaveProperty('brasiliA');
    expect(groupedPhotosWithBadData).not.toHaveProperty('Chicago');
  });

  test('should return the string representing the list of the new names of all photos in the correct order', () => {
    const expected = [
      'Krakow02.jpg',
      'London1.png',
      'Krakow01.png',
      'Florianopolis2.jpg',
      'Florianopolis1.jpg',
      'London2.jpg',
      'Florianopolis3.png',
      'Krakow03.jpg',
      'Krakow09.png',
      'Krakow07.jpg',
      'Krakow06.jpg',
      'Krakow08.jpg',
      'Krakow04.png',
      'Krakow05.png',
      'Krakow10.jpg'
    ].join('\n');

    expect(renamedPhotos).toBe(expected);
  });

  describe.each(Object.entries(mockGroupByCity(images)))('Renamed photos for %s', (city, data) => {
    const cityName = city as City;
    const renamedPhotosArray = mockRenamePhotos(images).split('\n') as OutputString[];

    data.map((photo, index, array) => {
      const [extension, , position] = photo.split(', ') as [PhotoExt, PhotoDate, `${number}`];
      const assignedNumber = `${array.length > 9 && index < 9 ? '0' : ''}${index + 1}`;
      const value = renamedPhotosArray[parseInt(position)];

      test(`${value} should have the assigned order number and a leading zero if necessary ("${assignedNumber}")`, () => {
        expect(value).toMatch(`${cityName}${assignedNumber}.${extension}`);
      });

      test(`${value} should end with a valid extension`, () => {
        expect(value).toMatch(/(jpg|png|jpeg)/g);
      });
    });
  });
});