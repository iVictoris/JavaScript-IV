// CODE here for your Lambda Classes
/**
 * Person
  First we need a Person class. This will be our base-class
  Person receives name age location all as props
  Person receives speak as a method.
  This method logs out a phrase Hello my name is Fred, I am from Bedrock where name and location are the object's own props
  Instructor
  Now that we have a Person as our base class, we'll build our Instructor class.
  Instructor uses the same attributes that have been set up by Person
  Instructor has the following unique props:
  specialty what the Instructor is good at i.e. 'redux'
  favLanguage i.e. 'JavaScript, Python, Elm etc.'
  catchPhrase i.e. Don't forget the homies
  Instructor has the following methods:
  demo receives a subject string as an argument and logs out the phrase 'Today we are learning about {subject}' where subject is the param passed in.
  grade receives a student object and a subject string as arguments and logs out '{student.name} receives a perfect score on {subject}'
  Student
  Now we need some students!
  Student uses the same attributes that have been set up by Person
  Student has the following unique props:
  previousBackground i.e. what the Student used to do before Lambda School
  className i.e. CS132
  favSubjects. i.e. an array of the student's favorite subjects ['Html', 'CSS', 'JavaScript']
  Student has the following methods:
  listsSubjects a method that logs out all of the student's favoriteSubjects one by one.
  PRAssignment a method that receives a subject as an argument and logs out that the student.name has submitted a PR for {subject}
  sprintChallenge similar to PRAssignment but logs out student.name has begun sprint challenge on {subject}
  Project Manager
  Now that we have instructors and students, we'd be nowhere without our PM's
  ProjectManagers are extensions of Instructors
  ProjectManagers have the following unique props:
  gradClassName: i.e. CS1
  favInstructor: i.e. Sean
  ProjectManagers have the following Methods:
  standUp a method that takes in a slack channel and logs `{name} announces to {channel}, @channel standy times!​​​​​
  debugsCode a method that takes in a student object and a subject and logs out {name} debugs {student.name}'s code on {subject}
 */

// First we need a Person class. This will be our base-class

class Person {
  constructor({ name, age, location }) {
    this.name = name;
    this.age = age;
    this.location = location;
  }

  speak() {
    return `Hello my name is ${name}, I am from ${location}!`;
  }
}

/**
 * Instructor
  Now that we have a Person as our base class, we'll build our Instructor class.
  Instructor uses the same attributes that have been set up by Person
  Instructor has the following unique props:
  specialty what the Instructor is good at i.e. 'redux'
  favLanguage i.e. 'JavaScript, Python, Elm etc.'
  catchPhrase i.e. Don't forget the homies
  Instructor has the following methods:
  demo receives a subject string as an argument and logs out the phrase 'Today we are learning about {subject}' where subject is the param passed in.
  grade receives a student object and a subject string as arguments and logs out '{student.name} receives a perfect score on {subject}'
 */

class Instructor extends Person {
  constructor({ specialty, favLanguage, catchPhrase, ...personProps }) {
    super(personProps);
    this.specialty = specialty;
    this.favLanguage = favLanguage;
    this.catchPhrase = catchPhrase;
  }

  demo(subject) {
    console.log(`Today we are learning about ${subject}!`);
  }
  grade(student, subject) {
    console.log(`${student.name} receives a perfect score on ${subject}`);
  }
  enterGrade(student) {
    // Now that our students have a grade
    // build out a method on the Instructor (this will be used by BOTH instructors and PM's)
    // that will randomly add or subtract points to a student's grade. Math.random will help.
    student.grade = Math.floor(Math.random() * 100);
    console.log(
      `${student.name} has had their grade changed to... ${student.grade}`
    );
  }
}

/**
 * Student
  Now we need some students!
  Student uses the same attributes that have been set up by Person
  Student has the following unique props:
  previousBackground i.e. what the Student used to do before Lambda School
  className i.e. CS132
  favSubjects. i.e. an array of the student's favorite subjects ['Html', 'CSS', 'JavaScript']
  Student has the following methods:
  listsSubjects a method that logs out all of the student's favoriteSubjects one by one.
  PRAssignment a method that receives a subject as an argument and logs out that the student.name has submitted a PR for {subject}
  sprintChallenge similar to PRAssignment but logs out student.name has begun sprint challenge on {subject}
 */

class Student extends Person {
  constructor({ previousBackground, className, favSubjects, ...personProps }) {
    super(personProps);
    this.previousBackground = previousBackground;
    this.className = className;
    this.favSubjects = favSubjects;
    // Extend the functionality of the Student by adding a prop called grade and setting it equal to a number between 1-100.
    this.grade = Math.floor(Math.random() * 100);
  }

  listsSubjects() {
    this.favSubjects.forEach(subject => console.log(subject));
  }

  PRAssignment(subject) {
    console.log(`${this.name} has submitted a PR for ${subject}`);
  }
  springChallenge(subject) {
    console.log(`${this.name} has begun sprint challenge on ${subject}`);
  }
  // Add a graduate method to a student.
  // This method, when called, will check the grade of the student and
  // see if they're ready to graduate from Lambda School
  // If the student's grade is above a 70% let them graduate!
  // Otherwise go back to grading their assignments to increase their score.
  graduate() {
    if (this.grade > 70) {
      console.log(`${this.name} graduates! with ${this.grade}`);
      return;
    }
    console.log(
      `Please complete your assignments! You need to get ${71 -
        this.grade} more points to graduate!`
    );
  }
}

/**
 * Project Manager
  Now that we have instructors and students, we'd be nowhere without our PM's
  ProjectManagers are extensions of Instructors
  ProjectManagers have the following unique props:
  gradClassName: i.e. CS1
  favInstructor: i.e. Sean
  ProjectManagers have the following Methods:
  standUp a method that takes in a slack channel and logs `{name} announces to {channel}, @channel standy times!​​​​​
  debugsCode a method that takes in a student object and a subject and logs out {name} debugs {student.name}'s code on {subject}
 */

class ProjectManager extends Instructor {
  constructor({ gradClassName, favInstructor, ...instructorProps }) {
    super(instructorProps);
    this.gradClassName = gradClassName;
    this.favInstructor = favInstructor;
  }

  standUp(channel) {
    console.log(`${this.name} announces to ${channel}, @channel standy times!`);
  }
  debugsCode(student, subject) {
    console.log(`${this.name} debugs ${student.name}'s code on ${subject}!`);
  }
}

const me = new Student({
  name: "Victor",
  age: 24,
  location: "CA",
  previousBackground: "Web Developer",
  className: "WebPT13",
  favSubjects: ["Science", "Computer Science", "Music", "Finance"]
});

me.listsSubjects();
me.graduate();
