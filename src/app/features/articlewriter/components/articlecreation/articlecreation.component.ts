import { Component, Input, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import Quill from 'quill';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'se-articlecreation',
  templateUrl: './articlecreation.component.html',
  styleUrls: ['./articlecreation.component.scss']
})
export class ArticlecreationComponent {
  articleContent: string;
  showErrors: boolean;
  categoryOptions: string[];
  blurred = false;
  focused = false;

  constructor(private db: AngularFirestore) {
    this.articleContent = '';
    this.showErrors = false;
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
  created(event: Quill) {
    console.log('editor-created', event);
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.articleContent = event['html'];
  }

  focus($event) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event);
    this.focused = true;
    this.blurred = false;
  }

  blur($event) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event);
    this.focused = false;
    this.blurred = true;
  }

  logIt() {
    console.log(this.articleContent);
  }
}
