import {Component, OnInit} from '@angular/core';
import { Course, CourseCategory, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from "../services/courses.service";
import { catchError, finalize, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /********************************/
  /********************************/
  /* OLD IMPERATIVE STYLE - START */
  /********************************/
  /********************************/

  /*
  beginnerCourses: Course[];

  advancedCourses: Course[];

  constructor(private http: HttpClient, private dialog: MatDialog) {

  }
  */

  /*ngOnInit() {

    this.http.get('/api/courses')
      .subscribe(
        res => {

          const courses: Course[] = res["payload"].sort(sortCoursesBySeqNo);

          this.beginnerCourses = courses.filter(course => course.category == "BEGINNER");

          this.advancedCourses = courses.filter(course => course.category == "ADVANCED");

        });

  }*/

  /*editCourse(course: Course) {

    const dialogConfig: MatDialogConfig<any> = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

  }*/

  /******************************/
  /******************************/
  /* OLD IMPERATIVE STYLE - END */
  /******************************/
  /******************************/






  /**************************/
  /**************************/
  /* REACTIVE STYLE - START */
  /**************************/
  /**************************/

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {

    const courses$ = this.coursesService.loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo)),
        catchError( err => {
          const message: string = "Could not load resource";
          this.messagesService.showErrors(message);
          console.log('error: ', message, err);
          return throwError(err);
        })
      )

    const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

    this.beginnerCourses$ = loadCourses$.pipe(
      map(courses => courses.filter( course => course.category === CourseCategory.BEGINNER))
    )

    this.advancedCourses$ = loadCourses$.pipe(
      map(courses => courses.filter( course => course.category === CourseCategory.ADVANCED))
    )
  }

  /************************/
  /************************/
  /* REACTIVE STYLE - END */
  /************************/
  /************************/


}




