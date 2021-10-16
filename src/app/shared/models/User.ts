export interface User {
  id: string;
	email: string;
	name: string;
  firstName?: string;
  lastName?: string;
	imageUrl?:string;
  roles: Array<Role>;
	joinDate: Date;
	emailVerified: boolean;
	providerId: string;
	provider: AuthProvider;
}
export class SignUpRequest {
	name: string;
	email: string;
	password: string;
	constructor(name: string,email: string, password: string) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
}
export class LoginRequest{
	email: string;
	password: string;
	constructor(email: string, password: string) {
		this.email = email;
		this.password = password
	}
}
export enum AuthProvider{
	local = "local",
	facebook = "facebook",
	google = "google",
	github = "github"
}
export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export function ROLES(): Role[] {
  return [
    Role.SUPER_ADMIN,
  ];
}
export function containsRole(role: Role, roles: Role[]): boolean{
  return  roles.indexOf(role) !== -1;
}
export function displayRole(role: Role): string{
  switch (role){
    case (Role.SUPER_ADMIN) : return 'Super admin';
    default: return 'undefined role';
  }
}

