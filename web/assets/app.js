var app = angular.module('examApp', []);

app.controller('ExamController', ['StudentFactory', 'RESTFactory', function (StudentFactory, RESTFactory) {
        var self = this;

        self.getStudents = function () {
            return StudentFactory.getStudents();
        };

        //REST GET example
        self.getStudentsREST = function () {
            RESTFactory.getStudents()
                    .success(function (studs) {
                        this.students = studs;
                    })
                    .error(function (error) {
                        this.status = 'Unable to load customer data: ' + error.message;
                    });
        };
    }]);

app.factory('RESTFactory', ['$http', function ($http) {
        //maybe use ng-resource instead?
        //http://weblogs.asp.net/dwahlin/using-an-angularjs-factory-to-interact-with-a-restful-service

        var urlBase = 'api/students';

        var getStudents = function () {
            return $http.get(urlBase);
        };

        return {
            getStudents: getStudents
        };
    }]);

app.factory('StudentFactory', function () {
    var studentsInfo = {};
    studentsInfo.allCourses = [
        {courseId: 1000, courseName: "Basic Programming"},
        {courseId: 1001, courseName: "Advanced Programming"},
        {courseId: 1003, courseName: "DataBase Intro"}];

    studentsInfo.students = [];
    studentsInfo.students.push({studentId: 100, name: "Peter Hansen", grades: [{grade: "10"}, {grade: "12"}, {}]});
    studentsInfo.students.push({studentId: 101, name: "Jan Olsen", grades: [{grade: "7"}, {grade: "10"}, {}]});
    studentsInfo.students.push({studentId: 102, name: "Gitte Poulsen", grades: [{grade: "7"}, {grade: "7"}, {}]});
    studentsInfo.students.push({studentId: 103, name: "John McDonald", grades: [{grade: "10"}, {}, {grade: "7"}]});

    var getStudents = function () {
        return studentsInfo.students;
    };

    var getCourses = function () {
        return studentsInfo.allCourses;
    };

    return {
        getStudents: getStudents,
        getCourses: getCourses
    };
});

app.filter('averageGrade', function () {
    return function (person) {
        var sum = 0;
        var count = 0;
        for (var i = 0; i < person.grades.length; i++) {
            if (!isNaN(person.grades[i].grade)) { //if it's a number
                sum += parseFloat(person.grades[i].grade);
                count++;
            }
        }
        return sum / count;
    };
});

app.directive("studentGrades", function () {
    return {
        templateUrl: 'templates/student-grades.html'
    };
});