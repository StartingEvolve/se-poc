import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'se-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  variable: string =
    'Apprenez les bases de la programmation via HTML,Apprenez les bases de la programmation via HTML,Apprenez les bases de la programmation via HTML, CSS, Python et JavaScript.Obtenez une pratique approfondie avec des exercices pratiques et des projets qui  démontrent votre compréhension des principes fondamentaux du code';

  constructor() {}
}
