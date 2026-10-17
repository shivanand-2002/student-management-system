
import { Injectable } from '@angular/core';

export type StudentStatus = 'Active' | 'Inactive';

export interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  status: StudentStatus;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly storageKey = 'student-management-students';

  private readonly initialStudents: Student[] = [
    {
      id: 1,
      name: 'Aarav Sharma',
      email: 'aarav@example.com',
      course: 'Computer Science',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya@example.com',
      course: 'Electronics',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Rahul Verma',
      email: 'rahul@example.com',
      course: 'Information Technology',
      status: 'Inactive'
    },
    {
      id: 4,
      name: 'Sneha Kulkarni',
      email: 'sneha@example.com',
      course: 'Computer Science',
      status: 'Active'
    }
  ];

  getStudents(): Student[] {
    try {
      const saved = localStorage.getItem(this.storageKey);

      if (saved === null) {
        this.saveStudents(this.initialStudents);
        return this.initialStudents.map(student => ({ ...student }));
      }

      const parsed: unknown = JSON.parse(saved);

      if (
        !Array.isArray(parsed) ||
        !parsed.every(item => this.isValidStudent(item))
      ) {
        console.error('Saved student data has an invalid format.');
        return [];
      }

      const students: Student[] = parsed.map(item => ({
        ...item,
        status: item.status ?? 'Active'
      }));

      this.saveStudents(students);
      return students;
    } catch {
      console.error('Could not load student data.');
      return [];
    }
  }

  saveStudents(students: Student[]): void {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(students)
      );
    } catch {
      console.error('Could not save student data.');
    }
  }

  private isValidStudent(value: unknown): value is Student {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const student = value as Record<string, unknown>;

    return (
      typeof student['id'] === 'number' &&
      Number.isSafeInteger(student['id']) &&
      student['id'] > 0 &&
      typeof student['name'] === 'string' &&
      typeof student['email'] === 'string' &&
      typeof student['course'] === 'string' &&
      (
        student['status'] === undefined ||
        student['status'] === 'Active' ||
        student['status'] === 'Inactive'
      )
    );
  }
}
