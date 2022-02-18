import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '@se/shared/types/user-data';
export interface Tab {
  id: number;
  title: string;
  image: string;
}
export interface CourseInfo {
  uuid: string; // course uuid
  title: string; // course title
  image: string; // course image
  description: string; // course description
  category: string; // course Category
  goals?: string[]; //course goals arrays
  prerequisites?: string[]; //course prerequisite array
  program?: string[]; // course program array
  certifications?: {
    uuid_ceritificate: string; // Certification uuid
    image: string; // Certification image
    name: string; // Certification name
    description: string; // Certification description
  }[];
  overview?: {
    article?: any; // course article to implement
    public_admitted?: string[]; // public admitted by the course
    price?: {
      value: number; //price value
      new_value?: number; //new value if there is a discount
      currency: string; // Price currency
    };
    eligibility?: string; // eligibility to a foundation
    start_date?: string; // Start date of course
    location?: {
      address?: string; // location exact address
      region: string; // location region name
      zip_code: string; // Location zip code
    };
    duration?: string; // course estimated duration
    learning_mode?: string; //course leraning mode
    success_rate?: string; //course success rate
  };
  organisation?: {
    uuid_organisation: string; //organisation uuid
    name?: string; //organisation name
    image?: string; //organisation image
  };
  // Cloud function to do this and add some statistics (e.g: for each star number calculate the percentage of pepole )
  reviews?: {
    global_score: number; // reviews global score
    total: number; // total reviews
    per_page?: number; // number of reviews per page
    current_page?: number; // current reviews page
    last_page?: number; // reviews last page
    next_page?: string; // reviews next page
    prev_page?: string; // reviews previews page
    from?: number; // from number
    to?: number; // to number
    data: {
      uuid_user: string; //uuid user
      full_name: string; // full name reviewer
      score: number; // review score
      review?: string;
      date?: string; //review message optional
    }[];
  };
  instructors?: {
    uuid_instructor: string; //uuid instructor
    full_name: string; // full name instructor
    role_description: string; //role description
    image?: string; //image description
    top_instructor: boolean; //is top instructor
  }[];
  views?: { count: number; users?: any }; // Incremented once per each user (Queue)
}
@Component({
  selector: 'se-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  uuid: string;
  activeTabId: number = 1;
  tabs: Tab[];
  courseInfo: CourseInfo;
  constructor(private route: ActivatedRoute) {
    // 'bank' is the name of the route parameter
    this.uuid = this.route.snapshot.params['uuid'];
    this.tabs = [
      {
        id: 1,
        title: 'Aperçu',
        image: 'overview.svg'
      },
      {
        id: 2,
        title: 'Objectifs',
        image: 'goals.svg'
      },
      {
        id: 3,
        title: 'Prérequis',
        image: 'prerequisites.svg'
      },
      {
        id: 4,
        title: 'Programme',
        image: 'program.svg'
      },
      {
        id: 5,
        title: 'Instructeurs',
        image: 'instructors.svg'
      },
      {
        id: 6,
        title: 'Certifications',
        image: 'certifications.svg'
      },
      {
        id: 7,
        title: 'Avis',
        image: 'reviews.svg'
      }
    ];
    this.courseInfo = {
      uuid: 'adbbf6bd-1746-4545-a3ce-8b153a7a31b2',
      title:
        'Apprendre comment apprendre (ACA) : Des outils mentaux puissants qui vous aideront à maîtriser des sujets difficiles',
      image:
        '	https://images.unsplash.com/photo-1549057446-9f5c6…fHx8fGVufDB8fHx8&auto=format&fit=crop&w=1034&q=80',
      description:
        "Ce cours vous offre un accès facile aux méthodes d’apprentissage appréciées et utilisées par des experts de différentes disciplines dont les arts, la littérature, les mathématiques, les sciences et les sports.  Vous y apprendrez comment le cerveau apprend en utilisant deux modes de pensée très différents et comment il encode l’information, une étape essentielle à la maîtrise de tout sujet. Vous en apprendrez davantage sur plusieurs défis importants qui concernent l’apprentissage dont l'Einstellung, l’illusion d’apprendre, le surapprentissage, le syndrome de l'imposteur et la procrastination et comment leur faire face. Vous y découvrirez également les meilleures pratiques pour maîtriser des sujets difficiles et dont l'efficacité a été démontrée en recherche, notamment l'espacement, l'entrelacement, la pratique délibérée, le rappel et des techniques de mémorisation.",
      category: 'Développement personnel',
      goals: [
        'Vous pouvez changer votre façon de penser et changer votre vie en appliquant ces approches et ce, peu importe votre niveau d’expertise dans les sujets que vous voulez maîtriser.',
        ' Si vous êtes déjà un expert, un regard sous le capot mental vous permettra de mieux comprendre le fonctionnement du cerveau et certaines approches qui peuvent vous aider à faire le plein d’apprentissages réussis, dont des conseils contre-intuitifs sur la manière d’aborder les tests et des renseignements pour faire un meilleur usage du temps que vous consacrez à vos devoirs et à la résolution de problèmes.'
      ],
      prerequisites: [
        ' Si vous êtes débutant ou qu’il vous est difficile d’apprendre, vous découvrirez un trésor bien structuré de techniques pratiques qui vous aideront à trouver ce dont vous avez besoin pour vous remettre sur les rails. Si vous avez toujours voulu devenir meilleur à quoi que ce soit, ce cours pourra vous servir de guide.'
      ],
      program: [
        "Ce cours peut être suivi indépendamment de, en concomitance avec, ou avant, son cours compagnon, Mindshift. (Apprendre comment apprendre est plus axé sur l'apprentissage, tandis que Mindshift est axé davantage sur le cheminement de carrière.)"
      ],
      certifications: [
        {
          uuid_ceritificate: 'adbbf6bd-1746-4545-a3ce-8b153a7a31b2', // Certification uuid
          image:
            'https://www.devensys.com/assets/img/certifications/certification-ceh-devensys.png',
          name: 'Certified Ethical Hacker',
          description:
            'Un Hacker Ethique Certifié est un professionnel qualifié qui comprend et sait comment rechercher les faiblesses et les vulnérabilités des systèmes cibles et utilise les mêmes connaissances et outils qu’un hacker malveillant, mais d’une manière légale et légitime pour évaluer la sécurité d’un système cible (s). L’accréditation HEC certifie les individus dans la discipline spécifique de la sécurité des réseaux du piratage éthique d’un point de vue neutre vis-à-vis des fournisseurs.'
        },
        {
          uuid_ceritificate: 'adbbf6bd-1746-4545-a3ce-8b153a7a31b2', // Certification uuid
          image:
            'https://www.devensys.com/assets/img/certifications/certification-ceh-devensys.png',
          name: 'Certified Ethical Hacker',
          description:
            'Un Hacker Ethique Certifié est un professionnel qualifié qui comprend et sait comment rechercher les faiblesses et les vulnérabilités des systèmes cibles et utilise les mêmes connaissances et outils qu’un hacker malveillant, mais d’une manière légale et légitime pour évaluer la sécurité d’un système cible (s). L’accréditation HEC certifie les individus dans la discipline spécifique de la sécurité des réseaux du piratage éthique d’un point de vue neutre vis-à-vis des fournisseurs.'
        }
      ],
      overview: {
        public_admitted: [
          'Salarié en poste',
          'Demandeur d’emploi',
          'Entreprise',
          'Étudiant'
        ],
        price: {
          value: 12300,
          new_value: 9999,
          currency: '€'
        },
        eligibility: '',
        start_date: '13 Février 2022',
        duration: '13 mois',
        learning_mode: 'À distance',
        location: {
          region: 'Paris',
          zip_code: '72100',
          address: '87 rue des 4 coins'
        },
        success_rate: '89%'
      },
      organisation: {
        uuid_organisation: 'adbbf6bd-1746-4545-a3ce-8b153a7a31b2',
        name: 'Deep teaching solutions',
        image:
          'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/6b/08744f01a949ef9b87266b1fc57c00/white--04.png?auto=format%2Ccompress&dpr=1&h=70'
      },
      reviews: {
        global_score: 4.7,
        total: 123555,
        data: [
          {
            uuid_user: 'adbbf6bd-1746-4545-a3ce-8b153a7a31b2',
            full_name: 'Christophe Louane',
            review:
              'le cours " apprendre comment apprendre" a été génial . j\'ai beaucoup appris , le staff été doué , les interviews étaient tés intéressants.\n\nmerci à vous ainsi qu\'aux efforts fournis par coursera',
            score: 4,
            date: '17 février 2021'
          },
          {
            uuid_user: 'adbbf6bd-1746-4545-a3ce-8b153a7a31b2',
            full_name: 'Emilie Jolie',
            review:
              "Excellente formation, j'y ai énormément appris et la recommande vivement. A mettre entre toutes les mains. Peut être utile à n'importe qui.",
            score: 5,
            date: '20 février 2021'
          },
          {
            uuid_user: 'adbbf6bd-1746-4545-a3ce-8b153a7a31b2',
            full_name: 'Astrid Poupart',
            review:
              "Très bon cours. Beaucoup d'outils nous sont donnés afin de bien apprendre, retenir à long terme... Je recommande ce cours Apprendre comment apprendre. Merci au Dr Oakley",
            score: 3,
            date: '20 Mars 2021'
          },
          {
            uuid_user: 'adbbf6bd-1746-4545-a3ce-8b153a7a31b2',
            full_name: 'Zack Nathan',
            review:
              'Top...très stimulant et enrichissant...un gros merci à tous les intervenants.',
            score: 5,
            date: '20 Janvier 2021'
          }
        ]
      },
      instructors: [
        {
          uuid_instructor: 'adbbf6bd-1746-4545-a3ce-8b153a7a31b2',
          full_name: 'Barbara Oakley',
          image:
            'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-instructor-photos.s3.amazonaws.com/d4/7a6a20f1f611e68b4583f69f63ce84/Oakley_reduced.jpg?auto=format%2Ccompress&dpr=1&w=200&h=200',
          role_description: 'Professeur en ingénierie',
          top_instructor: true
        },
        {
          uuid_instructor: 'adbbf6bd-1746-4545-a3ce-8b153a7a31b2',
          full_name: 'Dr. Terrence Sejnowski',
          image:
            'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-instructor-photos.s3.amazonaws.com/b6/075a309e3411e39977e16acffacc70/Sejnowski-head-HHMI.jpg?auto=format%2Ccompress&dpr=1&w=200&h=200',
          role_description: 'Professeur en Marketing',
          top_instructor: false
        }
      ]
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.uuid = paramMap.get('uuid');
    });
  }
  getTabId(id: number) {
    this.activeTabId = id;
  }
}
