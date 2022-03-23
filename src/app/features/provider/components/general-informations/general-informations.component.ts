import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomDateValidator } from '../../../../shared/helpers/CustomDateValidor';
import { sideBarItem } from '../../views/course/course.component';

export interface generalInformationsObject {
  title: string;
  description?: string;
  category?: string;
  audience: string[];
  price?: {
    currency: string;
    value: number;
  };
  date_start?: string;
  date_end?: string;
  learning_mode?: string;
}
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
  isLoading: boolean;
  initialValues: any;
  @Output() generalInfosEvent = new EventEmitter<generalInformationsObject>();
  @Input() generalInfosData: generalInformationsObject;
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
  }
  ngOnInit(): void {
    this.generalInformationsForm = new FormGroup(
      {
        title: new FormControl(
          this.generalInfosData ? this.generalInfosData.title : '',
          [Validators.required]
        ),
        description: new FormControl(
          this.generalInfosData?.description
            ? this.generalInfosData.description
            : '',
          [Validators.required]
        ),
        category: new FormControl(
          this.generalInfosData?.category
            ? this.generalInfosData.category
            : this.categoryOptions[0],
          [Validators.required]
        ),
        currency: new FormControl(
          this.generalInfosData?.price
            ? this.generalInfosData.price.currency
            : '€',
          [Validators.required]
        ),
        price: new FormControl(
          this.generalInfosData?.price ? this.generalInfosData.price.value : '',
          []
        ),
        date_start: new FormControl(
          this.generalInfosData?.date_start
            ? this.generalInfosData.date_start
            : '',
          []
        ),
        date_end: new FormControl(
          this.generalInfosData?.date_end ? this.generalInfosData.date_end : '',
          []
        ),
        learning_mode: new FormControl(
          this.generalInfosData?.learning_mode
            ? this.generalInfosData.learning_mode
            : this.learningModeOptions[0],
          [Validators.required]
        )
      },
      {
        validators: CustomDateValidator.fromToDate('date_start', 'date_end')
      }
    );
    this.audienceActiveItems = this.generalInfosData.audience;
    this.initialValues = this.generalInformationsForm.value;
  }
  submitForm() {
    if (
      this.generalInformationsForm.invalid ||
      this.audienceActiveItems === []
    ) {
      this.showErrors = true;
      return;
    }
    this.isLoading = true;
    this.initialValues = this.generalInformationsForm.value;
    const object = {
      title: this.trimAndCapitalize(this.generalInformationsForm.value.title),
      description: this.trim(this.generalInformationsForm.value.description),
      category: this.generalInformationsForm.value.category,
      audience: this.audienceActiveItems,
      ...(this.generalInformationsForm.value.price !== '' && {
        price: {
          currency: this.generalInformationsForm.value.currency,
          value: this.generalInformationsForm.value.price
        }
      }),
      ...(this.generalInformationsForm.value.date_start !== '' && {
        date_start: this.generalInformationsForm.value.date_start
      }),
      ...(this.generalInformationsForm.value.date_end !== '' && {
        date_start: this.generalInformationsForm.value.date_end
      }),
      learning_mode: this.generalInformationsForm.value.learning_mode
    };
    this.generalInfosEvent.emit(object);
    this.isLoading = false;
  }
  checkError(name: string): boolean {
    return this.showErrors && this.generalInformationsForm.get(name).invalid;
  }
  getTitleErrors() {
    return 'Le titre de la formation est requis';
  }
  getDescriptionErrors() {
    return 'La description de la formation est requis';
  }
  getDateEndErrors() {
    if (this.generalInformationsForm.hasError('fromToDate')) {
      return 'La date de la fin de la formation doit etre superieur à la date de début';
    }
    return '';
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
  cancelChanges() {
    this.generalInformationsForm.reset(this.initialValues);
  }
  trim(name: string): string {
    return name.trim();
  }
  trimAndCapitalize(name: string): string {
    const namex = this.trim(name);
    return namex.substring(0, 1).toUpperCase() + namex.substring(1);
  }
}
export function remove(...forDeletion) {
  return this.filter((item) => !forDeletion.includes(item));
}
