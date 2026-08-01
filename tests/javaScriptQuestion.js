const students=[{name:'Nilesh',score:37},{name:'Kalpesh',score:40},{name:'santosh',score:20},{name:'Dadu',score:30}];
const passStudent=students.filter(student=>student.score>=35);
console.log(passStudent);

const upperCasePassStudentName=passStudent.map(student=>student.name.toUpperCase());
console.log(upperCasePassStudentName);

const totalScoreOfPassStudent=passStudent.reduce((acc,student)=>acc+student.score,0);
console.log(totalScoreOfPassStudent);

console.log('*****************************')

let employees = [
    { name: "Nilesh", salary: 30000 },
    { name: "Rahul", salary: 25000 }
];

const newEmployeeSalary=employees.map(employee=>({name:employee.name,salary:employee.salary+employee.salary*0.1}));
console.log(newEmployeeSalary);