import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomDateValidator } from '@se/shared/helpers/CustomDateValidor';
import { sideBarItem } from '../../views/course/course.component';

@Component({
  selector: 'se-general-informations',
  templateUrl: './general-informations.component.html',
  styleUrls: ['./general-informations.component.scss']
})
export class GeneralInformationsComponent implements OnInit {
  isOpen: boolean;
  showErrors: boolean;
  aundienceItems: string[];
  audienceActiveItems: string[];
  categoryOptions: string[];
  learningModeOptions: string[];
  @Input() data: sideBarItem;
  generalInformationsForm: FormGroup;
  constructor() {
    this.showErrors = false;
    this.isOpen = false;
    this.aundienceItems = [
      'Entreprise',
      'Etudiant',
      'Salarié en poste',
      "Demandeur d'emploi"
    ];
    this.categoryOptions = [
      'Management, Direction',
      'Petite Enfance, Puériculture',
      'Qualité Hygiène Sécurité Environnement',
      'Réseaux, Telecom',
      'Art, Design, Décoration',
      'Fonction publique, Citoyenneté ,Droit',
      'Hôtellerie, Restauration, Cuisine',
      'Immobilier, Urbanisme',
      'Ressources Humaines, Paie',
      'Santé, Médecine',
      'Sciences',
      'BTP, Travaux, Architecture',
      'Achat, Logistique',
      'Animeaux, Nature',
      'Secrétariat, Accueil',
      'Social, Services à la Personne',
      'Tourisme, Loisirs',
      'Industrie, Matériaux, Énergie',
      'Informatique, DATA, SIG',
      'Bureautique, Office',
      'Bilan De Compétences, VAE',
      'Commerce, Marketing',
      'Communication, Événementiel',
      'Développement personnel, Épanouissement',
      'Digital, Internet',
      'Enseignement, Coaching',
      'Esthétique, Coiffure',
      'Autre'
    ];
    this.learningModeOptions = [
      'En entreprise',
      'En alternance',
      'A distance',
      'En centre'
    ];
    this.audienceActiveItems = [];
  }
  ngOnInit(): void {
    this.generalInformationsForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        category: new FormControl(this.categoryOptions[0], [
          Validators.required
        ]),
        currency: new FormControl('€', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        date_start: new FormControl('', []),
        date_end: new FormControl('', []),
        learning_mode: new FormControl(this.learningModeOptions[0], [
          Validators.required
        ])
      },
      CustomDateValidator.fromToDate('date_start', 'date_end')
    );
  }
  submitForm() {
    if (
      this.generalInformationsForm.invalid ||
      this.audienceActiveItems === []
    ) {
      this.showErrors = true;
      return;
    }
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  addOrRemove(item: string) {
    if (this.audienceActiveItems.includes(item)) {
      this.audienceActiveItems = this.audienceActiveItems.filter(
        (itemx) => itemx != item
      );
    } else {
      this.audienceActiveItems.push(item);
    }
  }
}
export function remove(...forDeletion) {
  return this.filter((item) => !forDeletion.includes(item));
}
