import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'se-category-component',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Output() goNextEvent = new EventEmitter<string>();
  @Output() goBackEvent = new EventEmitter<null>();
  @Input() data: string;
  categoryForm: FormGroup;
  categoryOptions: string[];

  constructor() {
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
  }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      category: new FormControl(this.data ? this.data : this.categoryOptions[0])
    });
  }
  goNext(): void {
    this.goNextEvent.emit(this.categoryForm.value.category);
  }
  goBack(): void {
    this.goBackEvent.emit(null);
  }
}
