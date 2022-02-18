const fs = require('fs');
const { faker } = require('@faker-js/faker');

let cities = {};

let categories = {};

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
  return array[randomNumber(0, array.length - 1)];
};

const randomNumber = (from = 0, upto) => {
  return Math.floor(Math.random() * (upto + 1 - from) + from);
};

const formatDuration = (maxDuration) => {
  let duration = randomNumber(1, maxDuration);
  const durationText = randomArrayValue(_duration);

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
  let id = '';
  while (number >= 0) {
    id = faker.datatype.uuid();
    //Generating up to 100 since our city's db is incomplete in Firebase
    city = cities[randomNumber(100)];
    const course = {
      id: id,
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
      learning_mode: randomArrayValue(_learningMode),
      eligibility: randomArrayValue(_eligibility),
      duration: formatDuration(6)
    };
    courses.push(flattenObject(course));
    number--;
  }
  return courses;
};

const generateCourseInfoData = (cities, number) => {
  let cours_details = { course: [], courseInfo: [] };

  const generateReviews = (times) => {
    let reviews = [];
    while (times >= 0) {
      reviews.push({
        id: faker.datatype.uuid(),
        full_name: faker.name.findName(),
        score: randomNumber(2, 5),
        review: faker.hacker.phrase()
      });
      times--;
    }
    return reviews;
  };

  const generateInstructors = (times) => {
    let instructors = [];
    while (times >= 0) {
      instructors.push({
        id: faker.datatype.uuid(),
        full_name: faker.name.findName(),
        image: faker.image.avatar(),
        top_instructor: randomArrayValue([true, false]),
        role_description: faker.company.bs()
      });
      times--;
    }
    return instructors;
  };

  const generateArticle = () => {
    return `<h2 class="text-gray-800 text-2xl lg:text-3xl font-bold sm:text-left text-center mb-4 md:mb-6">${faker.commerce.productDescription()}</h2><p>${faker.lorem.paragraphs(
      2,
      '<br/>\n'
    )}</p><br/><h2 class="text-gray-800 text-2xl lg:text-3xl font-bold sm:text-left text-center mb-4 md:mb-6">About us</h2><br/><p>${faker.lorem.paragraphs(
      2,
      '<br/>\n'
    )}</p><br/><img src="${faker.image.abstract(
      640,
      480,
      true
    )}" alt="Girl in a jacket" width="500" height="600"><br/><p>${faker.lorem.paragraphs(
      4,
      '<br/>\n'
    )}</p>`;
  };

  // let courses = [];
  let city = undefined;
  let id = '';
  while (number >= 0) {
    //Generating up to 100 since our city's db is incomplete in Firebase
    city = cities[randomNumber(0, 100)];
    id = faker.datatype.uuid();
    const course = {
      id: id,
      title: faker.lorem.sentence(6),
      description: faker.lorem.paragraph(5),
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
    const courseInfo = {
      id: id,
      title: faker.lorem.sentence(6),
      image: faker.image.business(640, 480, true),
      description: course.description,
      goals: ['Under Construction'],
      prerequisites: ['Under construction'],
      program: ['Under construction'],
      category: faker.company.bsNoun(),
      certifications: [
        {
          id: faker.datatype.uuid(),
          image: faker.image.technics(640, 480, true),
          name: faker.company.catchPhraseDescriptor(),
          description: faker.lorem.paragraph(3)
        }
      ],
      overview: {
        article: generateArticle(),
        public_admitted: [randomArrayValue(_public)],
        price: {
          value: faker.commerce.price(200, 9000, 0),
          new_value: null,
          currency: randomArrayValue(['$'])
        },
        eligibility: randomArrayValue(_eligibility),
        start_date:
          randomNumber(1, 30) +
          ' ' +
          faker.date.month() +
          ' ' +
          randomArrayValue(['2022', '2023']),
        location: {
          address: faker.address.streetAddress(),
          region: city['Nom_commune'],
          zip_code: city['Code_postal'].toString()
        },
        duration: formatDuration(6),
        learning_mode: randomArrayValue(_learningMode),
        success_rate: randomNumber(70, 95) + '%'
      },
      organisation: {
        id: faker.datatype.uuid(),
        name: faker.company.companyName(),
        image: `https://pigment.github.io/fake-logos/logos/medium/color/${randomNumber(
          1,
          11
        )}.png`
      },
      reviews: {
        global_score: randomNumber(2, 5),
        total: randomNumber(5000, 200000),
        date:
          randomNumber(1, 30) +
          ' ' +
          faker.date.month() +
          ' ' +
          randomArrayValue(['2022', '2021', '2020', '2019']),
        data: generateReviews(randomNumber(1, 5))
      },
      instructors: generateInstructors(randomNumber(1, 3)),
      views: {
        count: randomNumber(5, 100)
      }
    };
    cours_details.courseInfo.push(courseInfo);
    cours_details.course.push(flattenObject(course));
    number--;
  }
  return cours_details;
};

fs.readFile('data/france.json', 'utf-8', (err, _cities) => {
  if (err) {
    throw err;
  }
  // parse JSON object
  cities = JSON.parse(_cities.toString());

  // print JSON object
  // console.log(cities);

  const courses = generateCourseInfoData(cities, 100);
  console.log(courses);

  fs.writeFile('data/courses.json', JSON.stringify(courses.course), (e) => {
    if (e) {
      throw e;
    }
    console.log('Courses data is saved');
  });

  fs.writeFile(
    'data/courses_info.json',
    JSON.stringify(courses.courseInfo),
    (e) => {
      if (e) {
        throw e;
      }
      console.log("Courses' info data is saved");
    }
  );
});
