(function () {
    'use strict';

    function apiService($http) {

        var URL = 'http://localhost:4000/',
            TASK = 'task';

        function addTask(taskObject) {
            // return $http.post(URL + TASK, taskObject);
            return $http.post(URL + TASK);
        }

        function getTask() {
            return $http.get(URL + TASK)
        }

        function updateTask(taskId, status) {
            let dataToUpdate = {
                "status": status
            };

            return $http.put(URL + TASK);
            // return $http.put(URL + TASK + "?searchBy=ObjectId&searchParam=" + taskId, dataToUpdate);
        }

        function deleteTask(taskId) {
            return $http.delete(URL + TASK);
        }

        return {
            addTask: addTask,
            getTask: getTask,
            updateTask: updateTask,
            deleteTask: deleteTask
        };
    }

    var app = angular.module('app'),
        requires = [
            '$http',
            apiService
        ];
    app.factory('apiService', requires);
}());
