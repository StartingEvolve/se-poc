const fs = require('fs');
const { faker } = require('@faker-js/faker');
const latinize = require('latinize');

let cities = {};
let scraped_courses = {};

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
      if (Array.isArray(ob[i])) {
        toReturn[i] = ob[i];
      } else {
        let flatObject = flattenObject(ob[i]);
        for (let x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;

          toReturn[i + '.' + x] = flatObject[x];
        }
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

const generateCourseInfoData = (cities, scraped_courses, number) => {
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
  let address = [];
  let france = [];
  while (number >= 0) {
    //Generating up to 100 since our city's db is incomplete in Firebase
    // city = cities[randomNumber(0, 100)];
    id = faker.datatype.uuid();
    address = scraped_courses[number]['overview']['location']['address']
      .filter((e) => !e.includes('\n'))
      .map((e) =>
        latinize(e).toUpperCase().replace(/-/gi, ' ').replace(/'/gi, ' ')
      );

    address.forEach((e) => {
      if (!france.find((el) => e === el)) {
        france.push(e);
      }
    });

    // const course = {
    //   id: id,
    //   title: scraped_courses[number]['title'],
    //   description: faker.lorem.paragraph(5),
    //   image: faker.image.business(640, 480, true),
    //   public_admitted: scraped_courses[number]['overview']['public_admitted'],
    //   price: scraped_courses[number]['overview']['price']['value'],
    //   location: address,
    //   learning_mode: scraped_courses[number]['overview']['learning_mode'],
    //   eligibility: scraped_courses[number]['overview']['eligibility'],
    //   duration: scraped_courses[number]['overview']['duration']
    // };
    // const courseInfo = {
    //   id: id,
    //   title: scraped_courses[number]['title'],
    //   image: course.image,
    //   description: course.description,
    //   goals: scraped_courses[number]['goals'],
    //   prerequisites: scraped_courses[number]['prerequisites'],
    //   program: scraped_courses[number]['program'],
    //   category: scraped_courses[number]['category'],
    //   certifications: scraped_courses[number]['certifications'].map(
    //     (e, index) => {
    //       return {
    //         id: faker.datatype.uuid(),
    //         image: scraped_courses[number]['certifications'][index]['image']
    //       };
    //     }
    //   ),
    //   overview: {
    //     article: generateArticle(),
    //     public_admitted: scraped_courses[number]['overview']['public_admitted'],
    //     price: {
    //       value: scraped_courses[number]['overview']['price']['value'],
    //       new_value: null
    //       // currency: randomArray["value"]([''])
    //     },
    //     eligibility: scraped_courses[number]['overview']['eligibility'],
    //     start_date:
    //       randomNumber(1, 30) +
    //       ' ' +
    //       faker.date.month() +
    //       ' ' +
    //       randomArrayValue(['2022', '2023']),
    //     location: {
    //       address: address
    //       // region: city['Nom_commune'],
    //       // zip_code: city['Code_postal'].toString()
    //     },
    //     duration: scraped_courses[number]['overview']['duration'],
    //     learning_mode: scraped_courses[number]['overview']['learning_mode'],
    //     success_rate: scraped_courses[number]['overview']['success_rate']
    //   },
    //   organisation: {
    //     id: faker.datatype.uuid(),
    //     name: scraped_courses[number]['organisation']['name'],
    //     image: scraped_courses[number]['organisation']['image'],
    //     description: scraped_courses[number]['organisation']['description']
    //   },
    //   reviews: {
    //     global_score: randomNumber(2, 5),
    //     total: randomNumber(5000, 200000),
    //     date:
    //       randomNumber(1, 30) +
    //       ' ' +
    //       faker.date.month() +
    //       ' ' +
    //       randomArrayValue(['2022', '2021', '2020', '2019']),
    //     data: generateReviews(randomNumber(1, 5))
    //   },
    //   instructors: generateInstructors(randomNumber(1, 3)),
    //   views: {
    //     count: randomNumber(5, 100)
    //   }
    // };
    // cours_details.courseInfo.push(courseInfo);
    // cours_details.course.push(flattenObject(course));
    number--;
  }

  // return cours_details;
  return france;
};
fs.readFile('data/france.json', 'utf-8', (err, _cities) => {
  if (err) {
    throw err;
  }
  // parse JSON object
  // cities = JSON.parse(_cities.toString());
  fs.readFile('data/scraped_courses.json', 'utf-8', (err, _courses) => {
    if (err) {
      throw err;
    }

    scraped_courses = JSON.parse(_courses.toString());
    // print JSON object
    // console.log(cities);

    let courses = generateCourseInfoData('', scraped_courses, 100);

    fs.writeFile(
      'data/france_data.json',
      JSON.stringify(
        courses.map((e) => {
          return {
            Nom_commune: e,
            Code_postal: '99999'
          };
        })
      ),
      (e) => {
        if (e) {
          throw e;
        }
        console.log('France data is saved');
      }
    );

    // fs.writeFile('data/courses.json', JSON.stringify(courses.course), (e) => {
    //   if (e) {
    //     throw e;
    //   }
    //   console.log('Courses data is saved');
    // });
    //
    // fs.writeFile(
    //   'data/courses_info.json',
    //   JSON.stringify(courses.courseInfo),
    //   (e) => {
    //     if (e) {
    //       throw e;
    //     }
    //     console.log("Courses' info data is saved");
    //   }
    // );
  });
});
