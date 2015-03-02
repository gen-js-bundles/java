var
  inquirer = require("inquirer"),
  fs = require('fs'),
  path = require('path'),
  gfile = require('gfilesync'),
  yaml = require('js-yaml');

module.exports = {
  do: function(data, callback) {

    var dependenciesChoices = [
      {
        name: "MongoDB - MongoDB Java Driver - http://docs.mongodb.org/ecosystem/drivers/java",
	      value: {
          groupId: "org.mongodb",
          artifactId: "mongo-java-driver",
          version: "2.13.0"
        }
      },{
        name: "MongoDB - Morphia - https://github.com/mongodb/morphia",
        value: {
          groupId: "org.mongodb.morphia",
          artifactId: "morphia",
          version: "0.110"
        }
      },{
        name: "MongoDB - Jongo - http://jongo.org",
        value: {
          groupId: "org.jongo",
          artifactId: "jongo",
          version: "1.1"
        }
      },{
        name: "MongoDB - MongoJack - http://mongojack.org", 
        value: {
          groupId: "org.mongojack",
          artifactId: "mongojack",
          version: "2.3.0"
        }
      },{
        name: "MongoDB - Spring Data MongoDB - http://projects.spring.io/spring-data-mongodb", 
        value: {
          groupId: "org.springframework.data",
          artifactId: "spring-data-mongodb",
          version: "1.6.2.RELEASE"
        }
      }
    ];

    var questions = [
      {
        type: 'list',
        name: 'javaVersion',
        message: 'Which Java version ?',
        choices: [{
          name: '1.8',
          value: '1.8'
        },{
          name: '1.7',
          value: '1.7'
        },{
          name: '1.6',
          value: '1.6'
        },{
          name: '1.5',
          value: '1.5'
        }],
        default: '1.8'
      },
      {
        type: 'list',
        name: 'buildTool',
        message: 'Which build tool ?',
        choices: [{
          name: 'Maven',
          value: 'maven'
        },{
          name: 'Gradle',
          value: 'gradle'
        }],
        default: 'maven'
      },
      {
        type: 'checkbox',
        name: 'dependenciesSelected',
        message: 'Which dependencies ?',
        choices: dependenciesChoices
      }
    ];
    inquirer.prompt(questions, function( answers ) {
      /*
      if(answers.buildTool == 'maven') {
        gfile.copy(
          path.join(__dirname,'../model/config.@maven.yml'),
          path.join(process.cwd(),'model/config.@maven.yml'));
      }
      if(answers.buildTool == 'gradle') {
        gfile.copy(
          path.join(__dirname,'../model/config.@gradle.yml'),
          path.join(process.cwd(),'model/config.@gradle.yml'));
      }
      */

      var data = gfile.loadYaml(path.join(process.cwd(),'Genjsfile.yml'));

      if(data.global == null) {
        data.global = {};
      }
      if(data.global.project == null) {
        data.global.project = {};
      }
      if(data.global.project.name == null) {
        data.global.project.name = 'myapp';
      }
      if(data.global.project.version == null) {
        data.global.project.version = '0.1';
      }
      if(data.global.project.description == null) {
        data.global.project.description = '';
      }

      if(data.global.maven == null) {
        data.global.maven = {};
      }
      if(data.global.maven.groupId == null) {
        data.global.maven.groupId = 'demo';
      }
      if(data.global.maven.artifactId == null) {
        data.global.maven.artifactId = 'myapp';
      }
      if(data.global.maven.packaging == null) {
        data.global.maven.packaging = 'war'
      }

      if(data.global.version == null) {
        data.global.version = {};
      }
      if(data.global.version.java == null) {
        data.global.version.java = '1.8';
      }
      
      if(data.global.build == null) {
        data.global.build = {};
      }
      data.global.build.tool = answers.buildTool;

      gfile.writeYaml(path.join(process.cwd(),'Genjsfile.yml'), data);

      var data = {
        dependencies: answers.dependenciesSelected
      };

      gfile.writeYaml(path.join(process.cwd(),'model','config.@build.yml'), data);

      if(callback) {
        callback();
      }
    });
  }
};
