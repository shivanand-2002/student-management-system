# 🎓 Student Management System

A responsive **Student Management System** built with **Angular** that helps users manage student records through a clean dashboard. The application supports CRUD operations, search, filtering, sorting, status tracking, form validation, and browser-based data persistence.

## 🚀 Project Overview

The Student Management System provides a centralized interface for adding, viewing, updating, searching, and deleting student records. It also displays dashboard statistics to make student information easier to manage.

## ✨ Features

- **Dashboard:** View total students, active students, and course statistics.
- **Student Management (CRUD):** Add, view, edit, and delete student records.
- **Search:** Find students by name, email, course, or status.
- **Course Filtering:** Filter records by course.
- **Sorting:** Sort students by name, course, or newest record.
- **Status Tracking:** Mark students as Active or Inactive.
- **Form Validation:** Validate names and email addresses and prevent duplicate email entries.
- **Data Persistence:** Store student records in browser `localStorage`.
- **Course Distribution:** View student counts and percentages for each course.
- **User Feedback:** Display success and error notifications.
- **Responsive UI:** A styled dashboard designed for a clear user experience.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Angular | Frontend framework |
| TypeScript | Application logic and type safety |
| HTML5 | Application structure |
| CSS3 | Styling and responsive layout |
| Browser localStorage | Client-side data persistence |
| Git & GitHub | Version control and source code hosting |

## 📸 Application Preview

Clone the repository and run the application locally to explore the dashboard and its features.

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Angular CLI](https://angular.dev/tools/cli)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/shivanand-2002/student-management-system.git
```

**2. Navigate to the project directory**

```bash
cd student-management-system
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
ng serve --open
```

Open `http://localhost:4200/` if the browser does not open automatically.

The application will reload when you make changes to the source files.

## 📁 Project Structure

```text
student-management-system/
├── public/
├── src/
│   ├── app/
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.css
│   │   ├── student.service.ts
│   │   ├── student.ts
│   │   └── app.config.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── package-lock.json
└── README.md
```

## 💡 Technical Highlights

- Used an Angular standalone component to build the dashboard interface.
- Created a dedicated `StudentService` to handle student data loading and saving.
- Used TypeScript interfaces to define the structure of student records.
- Implemented filtering, searching, and sorting to display relevant records.
- Added validation to reduce invalid and duplicate student entries.
- Used `localStorage` to retain student records across browser refreshes.
- Used Angular template bindings and event handling to keep the UI interactive.

## 🔮 Future Improvements

- Integrate a backend API and database for persistent, multi-user storage.
- Add authentication and role-based access control.
- Implement pagination for large student datasets.
- Add automated unit and integration tests.
- Deploy the application and include a live demo link.

## 👨‍💻 Author

**Shivanand Gourkar**

- GitHub: [@shivanand-2002](https://github.com/shivanand-2002)
- Project Repository: [Student Management System](https://github.com/shivanand-2002/student-management-system)

---

*Built as a frontend development project to practise Angular, TypeScript, component-based architecture, form validation, and data management.*
