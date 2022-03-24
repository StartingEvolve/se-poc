const fs = require('fs');
const { faker } = require('@faker-js/faker');
const latinize = require('latinize');

const randomArrayValue = (array) => {
  return array[randomNumber(0, array.length - 1)];
};

const randomNumber = (from = 0, upto) => {
  return Math.floor(Math.random() * (upto + 1 - from) + from);
};

const _status = ['draft', 'accepted'];

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

const generateReferences = (categories, scraped_courses, number) => {
  let providers = [];
  let courses = [];
  let coursePreviews = [];

  while (number >= 0) {
    let address = scraped_courses[number]['overview']['location']['address']
      .filter((e) => !e.includes('\n'))
      .map((e) =>
        latinize(e).toUpperCase().replace(/-/gi, ' ').replace(/'/gi, ' ')
      );
    let courseId = faker.datatype.uuid();
    let course = {
      id: courseId,
      title: scraped_courses[number]['title'],
      image: categories[scraped_courses[number]['category']][0],
      goals: scraped_courses[number]['goals'],
      prerequisites: scraped_courses[number]['prerequisites'],
      program: scraped_courses[number]['program'],
      category: scraped_courses[number]['category'],
      status: randomArrayValue(_status),
      certifications: scraped_courses[number]['certifications'].map(
        (e, index) => {
          return {
            id: faker.datatype.uuid(),
            image: scraped_courses[number]['certifications'][index]['image']
          };
        }
      ),
      overview: {
        public_admitted: scraped_courses[number]['overview']['public_admitted'],
        price: {
          value: scraped_courses[number]['overview']['price']['value'],
          new_value: null
        },
        eligibility: scraped_courses[number]['overview']['eligibility'],
        start_date:
          randomNumber(1, 30) +
          ' ' +
          faker.date.month() +
          ' ' +
          randomArrayValue(['2022', '2023']),
        location: {
          address
        },
        duration: scraped_courses[number]['overview']['duration'],
        learning_mode: scraped_courses[number]['overview']['learning_mode'],
        success_rate: scraped_courses[number]['overview']['success_rate']
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
    let coursePreview = {
      id: course.id,
      title: course.title,
      description: faker.lorem.paragraph(5),
      category: course.category,
      image: course.image,
      public_admitted: course.overview.public_admitted,
      price: course.overview.price,
      location: course.overview.location.address,
      learning_mode: course.overview.learning_mode,
      eligibility: course.overview.eligibility,
      duration: course.overview.duration
    };
    let provider = providers.find(
      (p) => p.name === scraped_courses[number]['organisation']['name']
    );
    if (!provider) {
      let providerId = faker.datatype.uuid();
      course.providerId = providerId;
      coursePreview.providerId = providerId;
      provider = {
        id: providerId,
        name: scraped_courses[number]['organisation']['name'],
        image: scraped_courses[number]['organisation']['image'],
        email:
          'formation@' +
          scraped_courses[number]['organisation']['name']
            .replace(' ', '')
            .toLowerCase() +
          '.fr',
        phone: faker.phone.phoneNumber('+33 (0)# ## ## ## ##'),
        courseId: [courseId],
        description: scraped_courses[number]['organisation']['description'],
        accountType: 'organisation'
      };
    } else {
      course.providerId = provider.id;
      coursePreview.providerId = provider.id;
      provider.courseId.push(courseId);
    }
    providers.push(provider);
    courses.push(course);
    coursePreviews.push(coursePreview);
    number--;
  }

  fs.writeFile('data/seed-courses.json', JSON.stringify(courses), (e) => {
    if (e) {
      throw e;
    }
    console.log("Courses' info data is saved");
  });

  fs.writeFile('data/seed-providers.json', JSON.stringify(providers), (e) => {
    if (e) {
      throw e;
    }
    console.log("Providers' info data is saved");
  });

  fs.writeFile(
    'data/seed-courses-preview.json',
    JSON.stringify(coursePreviews),
    (e) => {
      if (e) {
        throw e;
      }
      console.log('Courses preview data is saved');
    }
  );
};

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

const generateArticleContent = () => {
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

fs.readFile('data/banner_links.json', 'utf-8', (err, _categories) => {
  if (err) {
    throw err;
  }
  // parse JSON object
  let categories = JSON.parse(_categories.toString());
  fs.readFile('data/scraped_courses.json', 'utf-8', (err, _courses) => {
    if (err) {
      throw err;
    }

    let scraped_courses = JSON.parse(_courses.toString());
    // print JSON object
    // console.log(cities);

    generateReferences(categories, scraped_courses, 100);
  });
});
