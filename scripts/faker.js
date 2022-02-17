const fs = require('fs');
const { faker } = require('@faker-js/faker');

let cities = {};

let _public = [
  'Salarie en poste',
  "Demandeur d'emploi",
  'Entreprise',
  'Etudiant'
];

let _learningMode = [
  'En centre',
  'En entreprise',
  'A distance',
  'En alternance'
];

let _eligibility = ['Eligible CPF', 'Eligible VAE', ''];

let _duration = ['jour', 'semaine', 'mois'];

const randomArrayValue = (array) => {
  return array[randomNumber(array.length - 1)];
};

const randomNumber = (upto) => {
  return Math.floor(Math.random() * (upto + 1));
};

const formatDuration = (maxDuration) => {
  let duration = randomNumber(maxDuration);
  const durationText = randomArrayValue(_duration);

  duration = duration === 0 ? duration + 1 : duration;
  if (durationText !== 'mois') {
    return duration > 1
      ? duration + ' ' + durationText + 's'
      : duration + ' ' + durationText;
  } else {
    return duration + ' ' + durationText;
  }
};

function flattenObject(ob) {
  let toReturn = {};

  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == 'object' && ob[i] !== null) {
      let flatObject = flattenObject(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

//We are generating a flat object since Typesense doesn't seem to support nested objects yet
const generateCourseData = (number) => {
  let courses = [];
  let city = undefined;
  while (number >= 0) {
    city = randomArrayValue(cities);
    const course = {
      id: faker.datatype.uuid(),
      title: faker.lorem.sentence(6),
      description: faker.commerce.productDescription(),
      image: faker.image.business(640, 480, true),
      public: randomArrayValue(_public),
      price: faker.commerce.price(50, 200),
      location: {
        address: faker.address.streetAddress(),
        region: city['Nom_commune'],
        zipCode: city['Code_postal'].toString()
      },
      learningMode: randomArrayValue(_learningMode),
      eligibility: randomArrayValue(_eligibility),
      duration: formatDuration(6)
    };
    courses.push(flattenObject(course));
    number--;
  }
  return courses;
};

fs.readFile('data/france.json', 'utf-8', (err, _cities) => {
  if (err) {
    throw err;
  }
  // parse JSON object
  cities = JSON.parse(_cities.toString());

  // print JSON object
  // console.log(cities);

  const data = JSON.stringify(generateCourseData(100));

  fs.writeFile('data/courses.json', data, (err) => {
    if (err) {
      throw err;
    }
    console.log('JSON data is saved');
  });
});
