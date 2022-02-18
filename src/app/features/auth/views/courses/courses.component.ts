import { Component } from '@angular/core';
import { CourseData } from '@core/store/course/search-courses.store';
import { CourseStore } from '@core/store/course/course.store';

@Component({
  selector: 'se-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses: CourseData[];
  routeId: number = 2;
  courseInfo: any;

  constructor(private courseStore: CourseStore) {
    this.courses = [
      {
        title: 'Les bases indispensables de la programmation : Algorithmique',
        image: 'https://img-c.udemycdn.com/course/240x135/2552909_84f6_8.jpg',
        description:
          "Maîtriser l'algorithmique en pseudo-code dans ce cours axé sur la pratique et contenant des dizaines d'algorithmes",
        public: 'Salarié en poste',
        price: '19,99 $',
        location: 'à distance',
        isEligible: true,
        duration: '3 mois',
        deadline: '19 Janvier 2022'
      },
      {
        image: '	https://img-c.udemycdn.com/course/480x270/1571092_5937.jpg',
        title: "Ce que vous devez savoir AVANT d'apprendre la PROGRAMMATION",
        description:
          'Apprendre les notions de base nécessaires à tout programmeur. Bien commencer en réseau, web, système, algorithmique',
        public: 'Salarié en poste',
        price: 'Gratuit',
        location: 'à distance',
        isEligible: true,
        duration: '1 mois',
        deadline: '19 Fevrier 2022'
      },
      {
        image: 'https://img-c.udemycdn.com/course/480x270/2923266_4297_3.jpg',
        title: 'Développeur Python | Formation Complète 2022',
        description:
          'Apprenez Python en partant de 0, et créez tous types de projets : Sites Web, Apps mobile, Jeux, Scripts, Hacking éthique',
        public: 'Salarié en poste',
        price: '199,99 $',
        location: 'Présentiel',
        isEligible: true,
        duration: '7 jours',
        deadline: '20 Octobre 2022'
      },
      {
        title: 'Les bases indispensables de la programmation : Algorithmique',
        image: 'https://img-c.udemycdn.com/course/240x135/2552909_84f6_8.jpg',
        description:
          "Maîtriser l'algorithmique en pseudo-code dans ce cours axé sur la pratique et contenant des dizaines d'algorithmes",
        public: 'Salarié en poste',
        price: '19,99 $',
        location: 'à distance',
        isEligible: true,
        duration: '3 mois',
        deadline: '19 Janvier 2022'
      },
      {
        image: '	https://img-c.udemycdn.com/course/480x270/1571092_5937.jpg',
        title: "Ce que vous devez savoir AVANT d'apprendre la PROGRAMMATION",
        description:
          'Apprendre les notions de base nécessaires à tout programmeur. Bien commencer en réseau, web, système, algorithmique',
        public: 'Salarié en poste',
        price: 'Gratuit',
        location: 'à distance',
        isEligible: true,
        duration: '1 mois',
        deadline: '19 Fevrier 2022'
      },
      {
        image: 'https://img-c.udemycdn.com/course/480x270/2923266_4297_3.jpg',
        title: 'Développeur Python | Formation Complète 2022',
        description:
          'Apprenez Python en partant de 0, et créez tous types de projets : Sites Web, Apps mobile, Jeux, Scripts, Hacking éthique',
        public: 'Salarié en poste',
        price: '199,99 $',
        location: 'Présentiel',
        isEligible: true,
        duration: '7 jours',
        deadline: '20 Octobre 2022'
      }
    ];
  }
}
