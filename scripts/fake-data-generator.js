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

const generateCourseProviderReferences = (
  categories,
  scraped_courses,
  number
) => {
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
      price: course.overview.price.value,
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
      providers.push(provider);
    } else {
      course.providerId = provider.id;
      coursePreview.providerId = provider.id;
      provider.courseId.push(courseId);
      for (let i = 0; i < providers.length; i++) {
        if (providers[i].id === provider.id) {
          providers[i] = provider;
        }
      }
    }
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

const generateEditorArticleReferences = (
  categories,
  scraped_articles,
  number
) => {
  let editors = [];
  let articles = [];
  let articlePreviews = [];

  while (number >= 0) {
    let articleId = faker.datatype.uuid();
    let article = {
      id: articleId,
      title: scraped_articles[number]['title'],
      image: categories[randomArrayValue(cat)][0],
      description: scraped_articles[number]['description'],
      content: scraped_articles[number]['content'],
      category: randomArrayValue(cat),
      createdAt: {
        value: null,
        formatted: scraped_articles[number]['createdAt']
      }
    };
    let articlePreview = {
      id: articleId,
      title: article.title,
      image: article.image,
      description: article.description,
      category: article.category,
      createdAt: article.createdAt
    };

    let editor = editors.find(
      (e) => e.nickname === scraped_articles[number]['editor']
    );
    if (!editor) {
      let editorId = faker.datatype.uuid();
      article.editorId = editorId;
      articlePreview.editorId = editorId;
      editor = {
        id: editorId,
        firtName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        nickname: scraped_articles[number]['editor'],
        image: faker.image.avatar(),
        email:
          scraped_articles[number]['editor'].replace(' ', '').toLowerCase() +
          '@gmail.com',
        articleId: [articleId],
        accountType: 'editor'
      };
      editors.push(editor);
    } else {
      article.editorId = editor.id;
      articlePreview.editorId = editor.id;
      editor.articleId.push(articleId);
      for (let i = 0; i < editors.length; i++) {
        if (editors[i].id === editor.id) {
          editors[i] = editor;
        }
      }
    }
    articles.push(article);
    articlePreviews.push(flattenObject(articlePreview));
    number--;
  }

  fs.writeFile('data/seed-articles.json', JSON.stringify(articles), (e) => {
    if (e) {
      throw e;
    }
    console.log("Articles' info data is saved");
  });

  fs.writeFile(
    'data/seed-articles-preview.json',
    JSON.stringify(articlePreviews),
    (e) => {
      if (e) {
        throw e;
      }
      console.log("Article Preview' info data is saved");
    }
  );

  fs.writeFile('data/seed-editors.json', JSON.stringify(editors), (e) => {
    if (e) {
      throw e;
    }
    console.log('Editor  data is saved');
  });
};

fs.readFile('data/banner_links.json', 'utf-8', (err, _categories) => {
  if (err) {
    throw err;
  }
  // Course generator
  let categories = JSON.parse(_categories.toString());
  fs.readFile('data/scraped_courses.json', 'utf-8', (err, _courses) => {
    if (err) {
      throw err;
    }

    let scraped_courses = JSON.parse(_courses.toString());

    generateCourseProviderReferences(categories, scraped_courses, 100);
  });

  //Article generator
  fs.readFile('data/scraped_articles.json', 'utf-8', (err, _articles) => {
    if (err) {
      throw err;
    }

    let scraped_articles = JSON.parse(_articles.toString());

    generateEditorArticleReferences(categories, scraped_articles, 30);
  });
});

let cat = [
  'Achat, Logistique',
  'Animaux, Nature',
  'Art, Design, Décoration',
  'Artisanat, Petit Commerce',
  'Banque, Finance, Assurance',
  'Bien-Être, Relaxation',
  'Bilan De Compétences, VAE',
  'BTP, Travaux, Architecture',
  'Bureautique, Office',
  'Commerce, Marketing',
  'Communication, Événementiel',
  'Comptabilité, Gestion',
  'Défense, Sécurité, Secourisme',
  'Développement Personnel, Épanouissement',
  'Digital, Internet',
  'Enseignement, Coaching',
  'Esthétique, Coiffure',
  'Fonction Publique, Citoyenneté, Droit',
  'Hôtellerie, Restauration, Cuisine',
  'Immobilier, Urbanisme',
  'Industrie, Matériaux, Énergie',
  'Informatique, DATA, SIG',
  'Langues',
  'Management, Direction',
  'Petite Enfance, Puériculture',
  'Qualité Hygiène Sécurité Environnement',
  'Réseaux, Telecom',
  'Ressources Humaines, Paie',
  'Santé, Médecine',
  'Sciences',
  'Secrétariat, Accueil',
  'Social, Services à la Personne',
  'Tourisme, Loisirs',
  'Transport, Permis'
];

//Todo (zack): Information request dummy data

