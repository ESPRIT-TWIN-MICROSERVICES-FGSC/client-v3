import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '@app/modules/auth/shared/_models/User';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient) {

  }
  public fetchPaginatedUsers(page: number, size: number, name: string): Observable<User[]> {
      return this.httpClient.get<User[]>(`${environment.gateway}auth/users/paginated?page=${page}&size=${size}&name=${name}`);
  }
  getUserById(id: string){
    return this.httpClient.get<User>(`${environment.gateway}auth/users/?id=${id}`);
  }
  count(): Observable<number>{
    return this.httpClient.get<number>(`${environment.gateway}auth/users/count`);
  }
}

//    @GetMapping
//     @ResponseStatus(HttpStatus.OK)
//     Mono<User> GetById(@RequestParam String id);
//     @GetMapping("/paginated")
//     @ResponseStatus(HttpStatus.OK)
//     Flux<User> Paginated(final int page, final int size, final String name);
//     @PostMapping
//     @ResponseStatus(HttpStatus.CREATED)
//     Mono<User> Add(@Validated @RequestBody User user);
//     @PutMapping
//     @ResponseStatus(HttpStatus.ACCEPTED)
//     Mono<User> Update(@Validated @RequestBody User user);
//     @DeleteMapping
//     @ResponseStatus(HttpStatus.ACCEPTED)
//     Mono<Void> Delete(@RequestParam String userId);
