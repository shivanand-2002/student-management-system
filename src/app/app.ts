
import { Component } from '@angular/core';
import { StudentService, type Student } from './student.service';

interface CourseDistribution {
  name: string;
  count: number;
  percent: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  students: Student[] = [];

  courses = [
    'Computer Science',
    'Electronics',
    'Information Technology'
  ];

  statuses: ('Active' | 'Inactive')[] = ['Active', 'Inactive'];

  showAddForm = false;
  searchTerm = '';
  selectedCourse = 'All Courses';
  sortBy = 'name';

  newName = '';
  newEmail = '';
  newCourse = this.courses[0];
  newStatus: 'Active' | 'Inactive' = 'Active';
  nextId = 1;

  editingStudentId: number | null = null;
  editName = '';
  editEmail = '';
  editCourse = '';
  editStatus: 'Active' | 'Inactive' = 'Active';

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private studentService: StudentService) {
    this.students = this.studentService.getStudents();
    this.nextId = Math.max(0, ...this.students.map(s => s.id)) + 1;
  }

  private saveStudents(): void {
    this.studentService.saveStudents(this.students);
  }

  private notify(
    message: string,
    type: 'success' | 'error' = 'success'
  ): void {
    this.toastMessage = message;
    this.toastType = type;
  }

  get courseCount(): number {
    return new Set(this.students.map(s => s.course)).size;
  }

  get activeStudentCount(): number {
    return this.students.filter(s => s.status === 'Active').length;
  }

  get courseDistribution(): CourseDistribution[] {
    return this.courses.map(course => {
      const count = this.students.filter(
        student => student.course === course
      ).length;

      const percent = this.students.length
        ? Math.round((count / this.students.length) * 100)
        : 0;

      return { name: course, count, percent };
    });
  }

  get filteredStudents(): Student[] {
    const query = this.searchTerm.toLowerCase().trim();

    const result = this.students.filter(student => {
      const matchesSearch =
        `${student.name} ${student.email} ${student.course} ${student.status}`
          .toLowerCase()
          .includes(query);

      const matchesCourse =
        this.selectedCourse === 'All Courses' ||
        student.course === this.selectedCourse;

      return matchesSearch && matchesCourse;
    });

    return [...result].sort((a, b) => {
      if (this.sortBy === 'course') {
        return a.course.localeCompare(b.course) ||
          a.name.localeCompare(b.name);
      }

      if (this.sortBy === 'newest') {
        return b.id - a.id;
      }

      return a.name.localeCompare(b.name);
    });
  }

  addStudent(event: Event): void {
    event.preventDefault();

    const name = this.newName.trim();
    const email = this.newEmail.trim().toLowerCase();

    if (name.length < 2) {
      this.notify('Name must contain at least 2 characters.', 'error');
      return;
    }

    if (name.length > 80 || email.length > 254) {
      this.notify('Name or email exceeds the allowed length.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.notify('Please enter a valid email address.', 'error');
      return;
    }

    const emailExists = this.students.some(
      student => student.email.toLowerCase() === email
    );

    if (emailExists) {
      this.notify('A student with this email already exists.', 'error');
      return;
    }

    this.students = [
      ...this.students,
      {
        id: this.nextId++,
        name,
        email,
        course: this.newCourse,
        status: this.newStatus
      }
    ];

    this.saveStudents();

    this.newName = '';
    this.newEmail = '';
    this.newCourse = this.courses[0];
    this.newStatus = 'Active';
    this.showAddForm = false;

    this.notify('Student added successfully.');
  }

  startEdit(student: Student): void {
    this.editingStudentId = student.id;
    this.editName = student.name;
    this.editEmail = student.email;
    this.editCourse = student.course;
    this.editStatus = student.status;
    this.showAddForm = false;
  }

  saveEdit(event: Event): void {
    event.preventDefault();

    const name = this.editName.trim();
    const email = this.editEmail.trim().toLowerCase();

    if (name.length < 2) {
      this.notify('Name must contain at least 2 characters.', 'error');
      return;
    }

    if (name.length > 80 || email.length > 254) {
      this.notify('Name or email exceeds the allowed length.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.notify('Please enter a valid email address.', 'error');
      return;
    }

    if (this.editingStudentId === null) {
      return;
    }

    const emailExists = this.students.some(
      student =>
        student.id !== this.editingStudentId &&
        student.email.toLowerCase() === email
    );

    if (emailExists) {
      this.notify('Another student already uses this email.', 'error');
      return;
    }

    this.students = this.students.map(student =>
      student.id === this.editingStudentId
        ? {
            ...student,
            name,
            email,
            course: this.editCourse,
            status: this.editStatus
          }
        : student
    );

    this.saveStudents();
    this.cancelEdit();
    this.notify('Student details updated.');
  }

  cancelEdit(): void {
    this.editingStudentId = null;
    this.editName = '';
    this.editEmail = '';
    this.editCourse = '';
    this.editStatus = 'Active';
  }

  deleteStudent(id: number): void {
    const student = this.students.find(item => item.id === id);

    if (!student) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!confirmed) {
      return;
    }

    this.students = this.students.filter(item => item.id !== id);

    this.saveStudents();
    this.notify('Student deleted successfully.');
  }
}
