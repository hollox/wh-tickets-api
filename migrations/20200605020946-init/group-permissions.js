const constants = require("../utils/constants");
const dbUtils = require("../utils/db");

module.exports.name = "group_permissions";
module.exports.fields = {
  row_id: {
    type: "uuid",
    notNull: true,
    primaryKey: true,
    defaultValue: {
      prep: "public.uuid_generate_v4()"
    }
  },
  group_id: {
    type: "uuid",
    notNull: true,
    foreignKey: dbUtils.createForeignKey("group_permissions", "group_id", "groups", "group_id")
  },
  permission_id: {
    type: "uuid",
    notNull: true,
    foreignKey: dbUtils.createForeignKey("group_permissions", "permission_id", "permissions", "permission_id")
  },
  ...dbUtils.creationMetaFields
};
module.exports.uniqueTupples = [["group_id", "permission_id"]];
module.exports.insert = function(db, groupId, permissionId) {
  return db.insert(
    "group_permissions",
    ["group_id", "permission_id", "creation_date", "creation_user_id"],
    [groupId, permissionId, constants.now, constants.system_user_id]
  );
};