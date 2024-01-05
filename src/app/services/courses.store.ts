import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, CourseCategory, sortCoursesBySeqNo } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { MessagesService } from "../messages/messages.service";
import { LoadingService } from "../loading/loading.service";

@Injectable({
  providedIn: 'root'
})
export class CoursesStore {

  private coursesStoreSubject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  coursesStore$: Observable<Course[]> = this.coursesStoreSubject.asObservable();

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService,
    private loadingService: LoadingService
  ) {
    this.loadAllCourses();
  }

  private loadAllCourses() {
    const loadCourses$ = this.http.get<Course[]>('/api/courses')
      .pipe(
        map( res => res["payload"]),
        shareReplay(),
        catchError( err => {
          const message = 'Could not load courses';
          this.messagesService.showErrors(message);
          return throwError(err);
        }),
        tap( courses => this.coursesStoreSubject.next(courses))
      )

    this.loadingService.showLoaderUntilCompleted(loadCourses$).subscribe();
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {

    const courses = this.coursesStoreSubject.getValue();

    const index = courses.findIndex( course => course.id === courseId );

    const courseUpdating: Course = {
      ...courses[index],
      ...changes
    }

    const newCourses = courses.slice(0);

    newCourses[index] = courseUpdating;

    this.coursesStoreSubject.next(newCourses);

    return this.http.put(`/api/courses/${courseId}`, changes).pipe(
      catchError( err => {
        const message = 'Could not save course';
        this.messagesService.showErrors(message);
        return throwError(err);
      }),
      shareReplay()
    )
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.coursesStore$.pipe(
      map(courses => courses
        .filter( course => course.category === category)
        .sort(sortCoursesBySeqNo)
      )
    )
  }

}