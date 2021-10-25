// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authGateway: 'http://localhost:8070/',
  clientUrl: 'http://localhost:4200',
  gateway: 'https://fgsc-gateway.herokuapp.com/api/',
  rsocket: 'wss://fgsc-rsocket-broker.herokuapp.com/rs',
  clientMicroservice: 'https://warm-falls-36309.herokuapp.com/',
  congeMicroservice: 'https://conges-microservice.herokuapp.com/',
  employeeMicroservice: 'https://employee-microservices.herokuapp.com/',
  JobMicroservice: 'https://job-microservices.herokuapp.com/',
  projectMicroservice: 'https://projet-microservice.herokuapp.com/',
  departementMicroservice: '  https://depratement.herokuapp.com/departements',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
