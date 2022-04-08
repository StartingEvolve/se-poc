import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '@se/core/services/vendor.service';
import {
  Config,
  OnVendorChangeConfig
} from '@se/core/store/vendor/vendor.store';
import { fromEvent, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap
} from 'rxjs/operators';
import { CustomDateValidator } from '@shared/helpers/CustomDateValidor';
import { sideBarItem } from '../../views/course/course.component';
import TypesenseConfig from '@vendors/typesense/typesense.config';
import { CourseStore } from '@core/store/provider/course.store';

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
  address?: string[];
  eligibility?: string[];
}

@Component({
  selector: 'se-general-informations',
  templateUrl: './general-informations.component.html',
  styleUrls: ['./general-informations.component.scss']
})
export class GeneralInformationsComponent
  implements OnInit, AfterViewInit, OnVendorChangeConfig, OnDestroy
{
  isOpen: boolean;
  showErrors: boolean;
  aundienceItems: string[];
  audienceActiveItems: string[];
  categoryOptions: string[];
  learningModeOptions: string[];
  isLoading: boolean;
  specialError: boolean;
  initialValues: any;
  searchLoaded: boolean;
  franceItems: string[];
  @Output() generalInfosEvent = new EventEmitter<generalInformationsObject>();
  @Input() generalInfosData: generalInformationsObject;
  @Input() data: sideBarItem;
  generalInformationsForm: FormGroup;
  EventSubscription: Subscription;
  configurations: Config;
  private storeSub: Subscription;
  @ViewChild('locationInput', { read: ElementRef }) locationInput: ElementRef;
  isSelected: boolean = false;
  private readonly libraries: string[];

  constructor(
    private venService: VendorService,
    private courseStore: CourseStore
  ) {
    this.libraries = ['typesense'];
    this.venService.getConfigObjects(this.libraries).then((config) => {
      this.configurations = config;
    });
    this.isSelected = false;
    this.searchLoaded = false;
    this.showErrors = false;
    this.specialError = false;
    this.isOpen = false;
    this.searchLoaded = false;
    this.franceItems = [];
    this.aundienceItems = [
      'Entreprise',
      'Étudiant',
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
      'À distance',
      'En centre'
    ];
  }

  seOnVendorChangeConfig() {
    const configMap = new Map();
    configMap.set('typesense', [new TypesenseConfig()]);
    return configMap;
  }

  ngOnInit(): void {
    this.venService.use(this.libraries);
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
        ),
        address: new FormControl(
          this.generalInfosData?.address
            ? this.generalInfosData.address[0]
            : '',
          []
        ),
        cpf: new FormControl(
          this.generalInfosData?.eligibility &&
            this.generalInfosData.eligibility.includes('Éligible CPF'),
          []
        ),
        vae: new FormControl(
          this.generalInfosData?.eligibility &&
            this.generalInfosData.eligibility.includes('Éligible VAE'),
          []
        )
      },
      {
        validators: CustomDateValidator.fromToDate('date_start', 'date_end')
      }
    );
    this.audienceActiveItems = this.generalInfosData.audience;
    this.initialValues = this.generalInformationsForm.value;
  }

  ngAfterViewInit(): void {
    this.storeSub = this.venService.watchVendorChanges(
      this,
      this.libraries,
      this.seOnVendorChangeConfig
    );

    //Todo (zack) ngIf controls component rendering
    this.subscribeToLocationInput();
  }

  setSearchValue(value: string) {
    console.log(value);
    this.generalInformationsForm.patchValue({ address: value });
    this.locationInput.nativeElement.blur();
    this.searchLoaded = false;
    this.isSelected = true;
  }

  subscribeToLocationInput() {
    //Bug (zack) : selecting different options in the location dropdown makes the search stale (value frozen)
    if (this.generalInformationsForm.value.learning_mode === 'En centre') {
      this.EventSubscription = fromEvent(
        this.locationInput.nativeElement,
        'keyup'
      )
        .pipe(
          filter(Boolean),
          debounceTime(200),
          distinctUntilChanged(),
          tap((text) => {
            if (this.locationInput.nativeElement.value === '') {
              this.franceItems = [];
              this.searchLoaded = false;
              this.isSelected = false;
            } else {
              let search = {
                q: this.locationInput.nativeElement.value,
                query_by: 'Nom_commune,Code_postal',
                per_page: 5
              };
              this.configurations
                .get('typesense')[0]
                .getClient()
                .collections('france')
                .documents()
                .search(search)
                .then((searchResults) => {
                  console.log(searchResults.hits);
                  if (searchResults.hits.length === 0) {
                    this.franceItems = [];
                    this.searchLoaded = false;
                    this.isSelected = false;
                  } else {
                    this.franceItems = [];
                    searchResults?.hits.forEach((hit) => {
                      this.franceItems.push(hit.document.Nom_commune);
                    });
                    this.searchLoaded = true;
                    this.isSelected = false;
                  }
                  console.log(this.franceItems);
                });
            }
            this.EventSubscription.unsubscribe();
          })
        )
        .subscribe();
    }
  }

  submitForm() {
    if (
      this.generalInformationsForm.invalid ||
      this.audienceActiveItems === []
    ) {
      this.showErrors = true;
      return;
    }
    if (
      this.generalInformationsForm.value.learning_mode === 'En centre' &&
      this.generalInformationsForm.value.address === ''
    ) {
      console.log('ok');
      this.specialError = true;
      return;
    }
    this.isLoading = true;
    this.initialValues = this.generalInformationsForm.value;
    const object = {
      title: this.trimAndCapitalize(this.generalInformationsForm.value.title),
      description: this.trim(this.generalInformationsForm.value.description),
      category: this.generalInformationsForm.value.category,
      audience: this.audienceActiveItems,
      ...(this.generalInformationsForm.value.learning_mode === 'En centre' &&
        this.generalInformationsForm.value.address !== '' && {
          address: [this.generalInformationsForm.value.address]
        }),
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
        date_end: this.generalInformationsForm.value.date_end
      }),
      learning_mode: this.generalInformationsForm.value.learning_mode,
      ...(this.generalInformationsForm.value.cpf != false &&
        this.generalInformationsForm.value.vae != false && {
          eligibility: [...['Éligible CPF', 'Éligible VAE']]
        }),
      ...(this.generalInformationsForm.value.vae != false &&
        this.generalInformationsForm.value.cpf == false && {
          eligibility: [...['Éligible VAE']]
        }),
      ...(this.generalInformationsForm.value.vae == false &&
        this.generalInformationsForm.value.cpf != false && {
          eligibility: [...['Éligible CPF']]
        })
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

  backup() {
    this.courseStore.backup(this.generalInfosData);
  }

  ngOnDestroy(): void {
    this.EventSubscription.unsubscribe();
  }
}

export function remove(...forDeletion) {
  return this.filter((item) => !forDeletion.includes(item));
}
