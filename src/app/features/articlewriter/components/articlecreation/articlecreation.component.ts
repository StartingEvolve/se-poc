import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange
} from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import Quill from 'quill';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { FormElements } from '../../dashboard/dashboard.component';

@Component({
  selector: 'se-articlecreation',
  templateUrl: './articlecreation.component.html',
  styleUrls: ['./articlecreation.component.scss']
})
export class ArticlecreationComponent implements OnInit {
  articleContent: string;
  showErrors: boolean;
  categoryOptions: string[];
  articleForm: FormGroup;
  blurred = false;
  testControl: FormControl;
  focused = false;
  url: string | ArrayBuffer = '';
  imagePath: any;
  message: string = '';
  @Input() data: FormElements;
  @Input() editorId: string;

  constructor(private db: AngularFirestore) {
    this.articleContent = '';
    this.showErrors = false;
    this.categoryOptions = [
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
  }

  ngOnInit(): void {
    this.categoryOptions = [
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
    this.articleForm = new FormGroup({
      title: new FormControl(''),
      category: new FormControl('Achat, Logistique'),
      description: new FormControl(''),
      image: new FormControl('')
    });
    // this.articleForm = new FormGroup(
    //   {
    //     title: new FormControl(this.data?.title ? this.data.title : '', [Validators.required]),
    //     category: new FormControl(
    //       this.data?.category ? this.data.category : '',
    //       [Validators.required]
    //     ),
    //     description: new FormControl(this.data.description ? this.data.description : '',
    //     [Validators.required]),
    //     image: new FormControl(this.data.image ? this.data.image : '', [Validators.required]),
    //   }
    // );
  }
  created(event: Quill) {
    console.log('editor-created', event);
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.articleContent = event['html'];
  }

  focus($event) {
    this.focused = true;
    this.blurred = false;
  }

  blur($event) {
    this.focused = false;
    this.blurred = true;
  }

  onFileChanged(event) {
    const files = event.target.files;
    this.articleForm.value.image = event.target.files[0];
    console.log(files);
    if (files.length === 0) return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    };
  }

  logIt() {
    console.log({
      ...this.articleForm.value,
      content: this.articleContent,
      editorId: this.editorId
    });
  }
}
