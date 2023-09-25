const db = require("./database/db.js");

const select_cohorts_in_finsbo = db.prepare(/*sql*/ `
  SELECT name FROM cohorts WHERE location = 'Finsbury Park' 
`);

function listCohortsInFinsbo() {
  return select_cohorts_in_finsbo.all();
}


const select_students_in_finsbo = db.prepare(/*sql*/ `
  SELECT username 
  FROM students
  JOIN cohorts ON students.cohort_name = cohorts.name
  WHERE location = 'Finsbury Park'

`);

function listStudentsInFinsbo() {
  return select_students_in_finsbo.all();
}

const select_students_with_location = db.prepare(/*sql*/ `
  SELECT username, location FROM students
  JOIN cohorts ON students.cohort_name = cohorts.name
`);

function listStudentsWithLocation() {
  return select_students_with_location.all();
}


const select_students_with_projects = db.prepare(/*sql*/ `
  SELECT projects.name, students_projects.student_username AS username FROM projects
  JOIN students_projects ON students_projects.project_id = projects.id
`);

function listStudentsWithProjects() {
  return select_students_with_projects.all();
}

const select_students_with_projects_in_finsbo = db.prepare(/*sql*/ `
  SELECT projects.name, students_projects.student_username AS username FROM projects
  JOIN students_projects ON students_projects.project_id = projects.id
  JOIN students ON students.username = students_projects.student_username
  JOIN cohorts ON cohorts.name = students.cohort_name
  WHERE location = 'Finsbury Park'
  ORDER BY username
`);

function listStudentsWithProjectsInFinsbo() {
  return select_students_with_projects_in_finsbo.all();
}

console.log(listStudentsWithProjectsInFinsbo())

module.exports = {
  listCohortsInFinsbo,
  listStudentsInFinsbo,
  listStudentsWithLocation,
  listStudentsWithProjects,
  listStudentsWithProjectsInFinsbo,
};
