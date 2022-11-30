import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import Quill from 'quill';
import { v4 as uuidv4 } from 'uuid';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { FormElements } from '../../dashboard/dashboard.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ArticleInfo {
  category: string;
  createdAt: {};
  description: string;
  editorId: string;
  image: string;
  title: string;
}

export interface Article {
  category: string;
  'createdAt.formatted': string;
  'createdAt.value': string;
  description: string;
  editorId: string;
  image: string;
  title: string;
}

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
  newArticle: Article;
  newArticleInfo: ArticleInfo;
  file: File;
  url: string | ArrayBuffer = '';
  fb;
  imagePath: any;
  downloadURL: Observable<string>;
  message: string = '';
  @Input() data: FormElements;
  @Input() editorId: string;
  @Output() articleUploaded: EventEmitter<any> = new EventEmitter<any>();
  private articleInfoCollection: AngularFirestoreCollection<ArticleInfo>;
  private articleCollection: AngularFirestoreCollection<Article>;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private _snackBar: MatSnackBar
  ) {
    this.articleInfoCollection = db.collection<ArticleInfo>('articles_info');
    this.articleCollection = db.collection<Article>('articles');
    this.showErrors = false;
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

  changedEditor(event: any) {
    this.articleContent = event?.html;
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
    this.file = event.target.files[0];
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
    for (const [key, value] of Object.entries(this.articleForm.value)) {
      if (value == '') {
        this.showErrors = true;
        return;
      }
    }
    this.upload();
  }

  upload() {
    // file = this.articleForm.value.image
    const filePath = `ArticleImages/${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              let currentTime = new Date();
              const monthNames = [
                'Janvier',
                'Février',
                'Mars',
                'Avril',
                'Mai',
                'Juin',
                'Juillet',
                'Aout',
                'Septembre',
                'Octobre',
                'Novembre',
                'Décembre'
              ];
              this.articleForm.value.image = url;
              this.newArticleInfo = {
                ...this.articleForm.value,
                content: this.articleContent,
                editorId: this.editorId,
                createdAt: {
                  formatted: `Publié le ${currentTime.getDate()} ${
                    monthNames[currentTime.getMonth()]
                  } ${currentTime.getFullYear()} à ${
                    currentTime.getHours() < 10
                      ? '0' + currentTime.getHours()
                      : currentTime.getHours()
                  }:${
                    currentTime.getMinutes() < 10
                      ? '0' + currentTime.getMinutes()
                      : currentTime.getMinutes()
                  }`,
                  value: String(Date.now())
                }
              };
              this.newArticle = {
                ...this.articleForm.value,
                content: this.articleContent,
                editorId: this.editorId,
                'createdAt.formatted': `Publié le ${currentTime.getDate()} ${
                  monthNames[currentTime.getMonth()]
                } ${currentTime.getFullYear()} à ${
                  currentTime.getHours() < 10
                    ? '0' + currentTime.getHours()
                    : currentTime.getHours()
                }:${
                  currentTime.getMinutes() < 10
                    ? '0' + currentTime.getMinutes()
                    : currentTime.getMinutes()
                }`,
                'createdAt.value': String(Date.now())
              };
              const id = uuidv4();
              this.articleInfoCollection.doc(id).set(this.newArticleInfo);
              this.articleCollection.doc(id).set(this.newArticle);
              this.articleUploaded.emit();
            }
          });
        })
      )
      .subscribe();
  }
}