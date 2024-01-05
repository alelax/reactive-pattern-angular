import { AfterViewInit, Component, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef  } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoadingService } from "../loading/loading.service";
import { Course } from "../model/course";
import * as moment from 'moment';
import { MessagesService } from "../messages/messages.service";
import { CoursesStore } from "../services/courses.store";

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  providers: [
    LoadingService,
    MessagesService
  ]
})
export class CourseDialogComponent implements AfterViewInit {

  form: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private coursesStore: CoursesStore,
    @Inject(MAT_DIALOG_DATA) course:Course
  ) {

    this.course = course;

    this.form = this.fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription,Validators.required]
    });

  }

  ngAfterViewInit() {}

  save() {
    const changes = this.form.value;

    /************************************/
    /* REACTIVE STYLE STATELESS - START */
    /************************************/
    /*const saveCourse$ = this.coursesService.saveCourse(this.course.id, changes).pipe(
      catchError( err => {
        const message = "could not save resource"
        this.messagesService.showErrors(message);
        console.log('errors: ', message, err);
        return throwError(err);
      })
    )

    this.loadingService.showLoaderUntilCompleted(saveCourse$)
      .subscribe( value => this.dialogRef.close(value))*/
    /**********************************/
    /* REACTIVE STYLE STATELESS - END */
    /**********************************/

    this.coursesStore.saveCourse(this.course.id, changes).subscribe()

    this.dialogRef.close(changes);
  }

  close() {
    this.dialogRef.close();
  }

}
