import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { CoursesService } from "../services/courses.service";



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

  /******************************/
  /******************************/
  /* OLD IMPERATIVE STYLE - END */
  /******************************/
  /******************************/

  ngOnInit() {

    /*this.http.get('/api/courses')
      .subscribe(
        res => {

          const courses: Course[] = res["payload"].sort(sortCoursesBySeqNo);

          this.beginnerCourses = courses.filter(course => course.category == "BEGINNER");

          this.advancedCourses = courses.filter(course => course.category == "ADVANCED");

        });*/

  }

  editCourse(course: Course) {

    const dialogConfig: MatDialogConfig<any> = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

  }


  /**************************/
  /**************************/
  /* REACTIVE STYLE - START */
  /**************************/
  /**************************/
  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog
  ) {}

}




