import { Component, Input } from '@angular/core';
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.css'
})
export class CoursesCardListComponent {

  @Input() courses: Course[]

  constructor(
    private dialog: MatDialog
  ) {
  }

  editCourse(course: Course) {

    const dialogConfig: MatDialogConfig<any> = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

  }
}