import {Component, OnInit} from '@angular/core';
import { Course, CourseCategory, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from "../services/courses.service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";



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
    private coursesService: CoursesService
  ) {}

  ngOnInit() {

    const courses$ = this.coursesService.loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo))
      )

    this.beginnerCourses$ = courses$.pipe(
      map(courses => courses.filter( course => course.category === CourseCategory.BEGINNER))
    )

    this.advancedCourses$ = courses$.pipe(
      map(courses => courses.filter( course => course.category === CourseCategory.ADVANCED))
    )


  }
  /******************************/
  /******************************/
  /* OLD IMPERATIVE STYLE - END */
  /******************************/
  /******************************/

}




