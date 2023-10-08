/** Photo names should consist only of letters of the English alphabet, be at most 20 characters long, and have one of the following extensions: "jpg", "png" or "jpeg". */
const photoNameRegExp = /^[a-zA-Z]{0,20}\.(jpg|png|jpeg)/;

/** City names should consist only of letters of the English alphabet, begin with a capital letter, be followed by lowercase letters, and be at most 20 characters long. */
const cityNameRegExp = /[A-Z]{1}[a-z]{0,19}/;

/** Dates should be in the format "yyyy-mm-dd hh:mm:ss" with years ranging from 2000 to 2020. */
const dateRegExp = /20(0[0-9]|1[0-9]|20)-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/;

/** Photo data should be in the format "<\<photoname>>.<\<extension>>, <<city_name>>, yyyy-mm-dd, hh:mm:ss". */
const photoDataRegExp = new RegExp(`${photoNameRegExp.source}, ${cityNameRegExp.source}, ${dateRegExp.source}`, 'g');

export { photoDataRegExp };