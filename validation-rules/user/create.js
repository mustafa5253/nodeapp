module.exports = {
  "required": ["first_name", "last_name", "email", "user_type"],
  "properties": {
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
    "updated_at":  { "type": ["null", "string"] },

    "gender": { "type": [ "null", "string" ] },
    "dob": { "type": [ "null", "string" ] },
    "firm_name": { "type": [ "null", "string" ] },
    "gst_number": { "type": [ "null", "string" ] },
    "aadhar_number": { "type": [ "null", "string" ] },
    "tan_number": { "type": [ "null", "string" ] },
    "cin_number": { "type": [ "null", "string" ] },
    "pan_number": { "type": [ "null", "string" ] },
    "address": { "type": [ "null", "string" ] },
    "key_person": { "type": [ "null", "string" ] },
    "status": { "type": [ "null", "string" ] },
  },

  "additionalProperties": false
};