module.exports = {
  "required": ["_id", "first_name", "last_name", "email", "user_type"],
  "properties": {
    "_id": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "first_name": {
      "type": "string",
      "minLength": 3
    },
    "last_name": {
      "type": "string"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "mobile": {
      "type": "string"
    },
    "password": {
      "type": "string",
      "minLength": 5
    },
    "new_password": {
      "type": "string",
      "minLength": 5
    },
    "user_type": { "enum": ["admin","employee","customer"] },
    "plan_id": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "company_id": { "type": "string" },
    "company_name": { "type": "string" },
    "branch_id": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "roles": {
      "type": "array"
    },
    "created_by": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "active_status": { "type": "string" },
    "created_at": { "type": ["null", "string"] },
    "updated_at":  { "type": ["null", "string"] }
  },
  "additionalProperties": true
};