import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseStore } from '@core/store/course/course.store';
import { CourseInfo } from '@core/services/course.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthStore } from '@se/core/store/auth/auth.store';
import { UserDocument } from '@se/shared/types/user-document';

export interface Tab {
  id: number;
  title: string;
  image: string;
}

@Component({
  selector: 'se-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {
  uuid: string;
  activeTabId: number = 1;
  tabs: Tab[];
  isOpen: boolean;
  courseInfo: CourseInfo;
  dummyCourse: CourseInfo;
  subs: Subscription[] = []; // You must initiate array in order to push
  leadingForm: FormGroup;
  situationItems: string[];
  levelItems: string[];
  userState: UserDocument;
  isLoading: boolean;
  showErrors: boolean;

  constructor(
    private route: ActivatedRoute,
    private courseStore: CourseStore,
    private aStore: AuthStore
  ) {
    this.showErrors = false;
    this.isLoading = false;
    this.situationItems = [
      'Étudiant',
      'Salarié en poste',
      "Demandeur d'emploi"
    ];
    this.levelItems = [
      'BEP CAP',
      'BAC',
      'BAC +2',
      'BAC +3',
      'BAC +4',
      'BAC +5',
      '> BAC +5'
    ];
    this.isOpen = false;
    this.uuid = this.route.snapshot.params['uuid'];
    this.tabs = [
      {
        id: 1,
        title: 'Aperçu',
        image: 'overview.svg'
      },
      {
        id: 2,
        title: 'Objectifs',
        image: 'goals.svg'
      },
      {
        id: 3,
        title: 'Prérequis',
        image: 'prerequisites.svg'
      },
      {
        id: 4,
        title: 'Programme',
        image: 'program.svg'
      },
      {
        id: 5,
        title: 'Instructeurs',
        image: 'instructors.svg'
      },
      {
        id: 6,
        title: 'Certifications',
        image: 'certifications.svg'
      },
      {
        id: 7,
        title: 'Avis',
        image: 'reviews.svg'
      }
    ];
    this.aStore.stateChanged.subscribe((state) => {
      if (state) {
        this.userState = state?.user;
        this.leadingForm.controls['email'].setValue(this.userState.email);
        this.leadingForm.controls['email'].disable();
        this.leadingForm.controls['first_name'].setValue(
          state.user.displayName.split(' ')[0]
        );
        this.leadingForm.controls['last_name'].setValue(
          state.user.displayName.split(' ')[1]
        );
      }
    });
  }
  checkError(name: string): boolean {
    return this.showErrors && this.leadingForm.get(name).invalid;
  }

  getTabId(id: number) {
    this.activeTabId = id;
  }

  ngOnInit(): void {
    this.subs.push(
      this.route.paramMap.subscribe((paramMap) => {
        this.uuid = paramMap.get('uuid');
        this.courseStore.getCourseById(this.uuid);
        this.subs.push(
          this.courseStore.stateChanged.subscribe((value) => {
            console.log(value);
            this.courseInfo = value.course;
          })
        );
      })
    );
    this.leadingForm = new FormGroup({
      situation: new FormControl(this.situationItems[0], [Validators.required]),
      level: new FormControl(this.levelItems[0], [Validators.required]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
      phone_prefix: new FormControl('+33', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  toggleModal() {
    this.isOpen = !this.isOpen;
  }
  submitForm() {
    if (this.leadingForm.invalid) {
      this.showErrors = true;
      return;
    }
    this.isLoading = true;
    console.log(this.leadingForm.value);
    this.toggleModal();
    this.isLoading = false;
  }
}
