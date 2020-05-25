import {
  Organization,
  OrganizationJson,
  OrganizationRecord
} from "./organizations.models";
import * as usersHelper from "../users/users.helper";

export function convertJsonToModel(
  organizationJson: OrganizationJson
): Organization {
  return {
    organizationId: organizationJson.organization_id,
    name: organizationJson.name,
    users: usersHelper.convertJsonToModels(organizationJson.users)
  };
}

export function convertModelsToJson(
  organizations: Organization[]
): OrganizationJson[] {
  return organizations.map(convertModelToJson);
}

export function convertModelToJson(
  organization: Organization
): OrganizationJson {
  return {
    organization_id: organization.organizationId,
    name: organization.name,
    users: usersHelper.convertModelsToJson(organization.users)
  };
}

export function convertRowsToModels(
  rows: OrganizationRecord[]
): Organization[] {
  return rows.map(convertRowToModel);
}

export function convertRowToModel(row: OrganizationRecord): Organization {
  return {
    organizationId: row.organization_id,
    name: row.name,
    users: []
  };
}
