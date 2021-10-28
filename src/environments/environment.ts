// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  //
  //
  production: false,

  authGateway: "http://localhost:8070/",
  clientUrl: "http://localhost:4200",
  gateway: "https://fgsc-gateway.herokuapp.com/api/",
  rsocket: "wss://fgsc-rsocket-broker.herokuapp.com/rs",
  clientMicroservice: "https://fgsc-gateway.herokuapp.com/api/client",
  congeMicroservice: "https://fgsc-gateway.herokuapp.com/api/conges",
  employeeMicroservice: "https://fgsc-gateway.herokuapp.com/api/employee",
  JobMicroservice: "https://fgsc-gateway.herokuapp.com/api/job",
  projectMicroservice: "https://fgsc-gateway.herokuapp.com/api/projet",
  attendanceMicroservice: "https://fgsc-gateway.herokuapp.com/api/attendance",
  departementMicroservice: "  https://depratement.herokuapp.com/departements",
  todoMicroservice: "http://localhost:5000/todo",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
