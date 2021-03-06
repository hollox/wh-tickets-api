import { User } from "../entities/users.models";
import * as usersRepository from "../repository/users/users.repository";
import * as permissionsService from "./permissions.service";

export async function getByOrganizationId(organizationId: string): Promise<User[]> {
  return usersRepository.getByOrganizationId(organizationId);
}

export async function save(user: User): Promise<User> {
  return usersRepository.save(user);
}

export async function getByAuthenticationId(authenticationId: string, authenticatorId: string): Promise<User | null> {
  const user = await usersRepository.getByAuthenticationId(authenticationId, authenticatorId);

  if (user) {
    user.permissions = await permissionsService.getByUserId(user.userId);
  }

  return user;
}
