import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { of } from 'rxjs';

interface DropdownOption {
  value: string;
  label: string;
  isChecked: boolean;
}

export interface Filter {
  id: number;
  name: string;
  label: string;
  isOpen: boolean;
  options: DropdownOption[];
}

export interface FilterState {
  courseFilters: Filter[];
  articleFilters: Filter[];
}

@Injectable({
  providedIn: 'root'
})
export class FilterStore extends ObservableStore<FilterState> {
  currentRoute: string;
  courseFilters: any;
  articleFilters: any;

  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });
    let category_options = [];
    for (const [key, value] of Object.entries(this.categories)) {
      category_options.push(key);
    }

    this.courseFilters = [
      {
        id: 1,
        name: 'public_admitted',
        label: 'Publique Admis',
        isOpen: false,
        options: [
          {
            value: 'Étudiant',
            label: 'Étudiant',
            isChecked: false
          },
          {
            value: 'Salarié en poste',
            label: 'Salarié en poste',
            isChecked: false
          },
          {
            value: 'Entreprise',
            label: 'Entreprise',
            isChecked: false
          },
          {
            value: "Demandeur d'emploi",
            label: "Demandeur d'emploi",
            isChecked: false
          }
        ]
      },
      {
        id: 2,
        name: 'learning_mode',
        isOpen: false,
        label: "Mode d'apprentissage",
        options: [
          {
            value: 'En centre',
            label: 'En centre',
            isChecked: false
          },
          {
            value: 'En entreprise',
            label: 'En entreprise',
            isChecked: false
          },
          {
            value: 'À distance',
            label: 'À distance',
            isChecked: false
          },
          {
            value: 'En alternance',
            label: 'En alternance',
            isChecked: false
          }
        ]
      },
      {
        id: 3,
        name: 'eligibility',
        label: 'Spécifités',
        isOpen: false,
        options: [
          {
            value: 'Éligible CPF',
            label: 'Éligible CPF',
            isChecked: false
          },
          {
            value: 'Éligible VAE',
            label: 'Éligible VAE',
            isChecked: false
          }
        ]
      },
      {
        id: 4,
        name: 'category',
        label: 'Catégorie',
        isOpen: false,
        options: category_options.map((category) => {
          return {
            value: category,
            label: category,
            isChecked: false
          };
        })
      }
    ];
    this.articleFilters = [
      {
        id: 1,
        name: 'category',
        label: 'Catégorie',
        isOpen: false,
        options: category_options.map((category) => {
          return {
            value: category,
            label: category,
            isChecked: false
          };
        })
      }
    ];
    this.setState(
      {
        courseFilters: this.courseFilters,
        articleFilters: this.articleFilters
      },
      FilterStoreActions.InitializeFilters
    );
  }

  getFiltersObservable() {
    return of(this.getState());
  }

  getFilters() {
    return this.getState();
  }

  addFilter(filter: Filter) {
    this.setState({}, FilterStoreActions.AddFilter);
  }

  updateFiltersByUrl(url: string) {
    if (url === '') {
      this.setState({
        courseFilters: [],
        articleFilters: []
      });
    } else {
      this.setState(
        {
          courseFilters: this.courseFilters.map((f) => {
            return {
              ...f,
              options: f.options.map((option) => {
                return {
                  ...option,
                  isChecked: url.includes(option.value)
                };
              })
            };
          }),
          articleFilters: this.articleFilters.map((f) => {
            return {
              ...f,
              options: f.options.map((option) => {
                return {
                  ...option,
                  isChecked: url.includes(option.value)
                };
              })
            };
          })
        },
        FilterStoreActions.UpdateFilter
      );
    }
  }

  private categories: any = {
    'Achat, Logistique': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/achat_logistique.jpg'
    ],
    'Animaux, Nature': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/animaux_nature.jpg'
    ],
    'Art, Design, Décoration': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/art_design_decoration.jpg'
    ],
    'Artisanat, Petit Commerce': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/artisanat_petit_commerce.jpg'
    ],
    'Banque, Finance, Assurance': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/banque_finance_assurance.jpg'
    ],
    'Bien-Être, Relaxation': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/bien-etre_relaxation.jpg'
    ],
    'Bilan De Compétences, VAE': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/bilan_de_competences_vae.jpg'
    ],
    'BTP, Travaux, Architecture': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/btp_travaux_architecture.jpg'
    ],
    'Bureautique, Office': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/bureautique_office.jpg'
    ],
    'Commerce, Marketing': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/commerce_marketing.jpg'
    ],
    'Communication, Événementiel': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/communication_evenementiel.jpg'
    ],
    'Comptabilité, Gestion': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/comptabilite_gestion.jpg'
    ],
    'Défense, Sécurité, Secourisme': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/defense_securite_secourisme.jpg'
    ],
    'Développement Personnel, Épanouissement': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/developpement_personnel_epanouissement.jpg'
    ],
    'Digital, Internet': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/digital_internet.jpg'
    ],
    'Enseignement, Coaching': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/enseignement_coaching.jpg'
    ],
    'Esthétique, Coiffure': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/esthetique_coiffure.jpg'
    ],
    'Fonction Publique, Citoyenneté, Droit': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/fonction_publique_citoyennete_droit.jpg'
    ],
    'Hôtellerie, Restauration, Cuisine': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/hotellerie_restauration_cuisine.jpg'
    ],
    'Immobilier, Urbanisme': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/immobilier_urbanisme.jpg'
    ],
    'Industrie, Matériaux, Énergie': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/industrie_materiaux_energie.jpg'
    ],
    'Informatique, DATA, SIG': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/informatique_data_sig.jpg'
    ],
    Langues: [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/langues.jpg'
    ],
    'Management, Direction': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/management_direction.jpg'
    ],
    'Petite Enfance, Puériculture': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/petite_enfance_puericulture.jpg'
    ],
    'Qualité Hygiène Sécurité Environnement': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/qualite_hygiene_securite_environnement.jpg'
    ],
    'Réseaux, Telecom': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/reseaux_telecom.jpg'
    ],
    'Ressources Humaines, Paie': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/ressources_humaines_paie.jpg'
    ],
    'Santé, Médecine': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/sante_medecine.jpg'
    ],
    Sciences: [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/sciences.jpg'
    ],
    'Secrétariat, Accueil': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/secretariat_accueil.jpg'
    ],
    'Social, Services à la Personne': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/social_services_a_la_personne.jpg'
    ],
    'Tourisme, Loisirs': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/tourisme_loisirs.jpg'
    ],
    'Transport, Permis': [
      'https://f.hellowork.com/mf-static-images/domains/lg-square/transport_permis.jpg'
    ]
  };
}

export enum FilterStoreActions {
  InitializeFilters = 'INITIALIZE_FILTER_STORE',
  AddFilter = 'ADD_FILTER',
  UpdateFilter = 'UPDATE_FILTER'
}
