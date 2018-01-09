// module.exports = {
//   "required": ["first_name", "last_name", "mobile", "email", "password", "user_type"],
//   "properties": {
//     "first_name": {
//       "type": "string",
//       "minLength": 3
//     },
//     "last_name": {
//       "type": "string"
//     },
//     "gender": {
//       "type": "string",
//       "minLength": 1,
//       "maxLength": 1
//     },
//     "dob": { "type": "string", "format": "date" },
//     "profile_photo": { "type": "string" },
//     "mobile": {
//       "type": "object",
//       "properties": {
//         "code": { "type": "string" },
//         "number": {
//           "type": "string",
//           "minLength": 10,
//           "maxLength": 10
//         }
//       },
//       "additionalProperties": false 
//     },
//     "email": {
//       "type": "string",
//       "format": "email"
//     },
//     "password": {
//       "type": "string",
//       "minLength": 8
//     },
//     "user_type": {
//       "type": "string",
//       "minLength": 5,
//       "maxLength": 11
//     },
//     "address": {
//       "type": "object",
//       "required": ["city"],
//       "properties": {
//         "state": {
//           "type": "object",
//           "properties": {
//             "code":  { "type": "number" },
//             "name": { "type": "string" },
//           },
//           "additionalProperties": false
//         },
//         "city": { "type": "string" },
//         "postal_code": { "type": "string" },
//         "address_line1": { "type": "string" },
//         "address_line2": { "type": "string" },
//         "gst_number": { "type": "string" }
//       },
//       "additionalProperties": false
//     },
//     "country": {
//       "type": "object",
//       "properties": {
//         "code": { "type": "number" },
//         "name": { "type": "string" }
//       },
//       "additionalProperties": false
//     },
//     "group_id": { "type": "string" },
//     "company_id": { "type": "string" },
//     "branch_id": {
//       "type": "string",
//       "minLength": 24,
//       "maxLength": 24
//     },
//     "roles": {
//       "type": "array"
//     },
//     "is_verified": {
//       "type": "object",
//       "properties": {
//         "mobile": { "type": "boolean" },
//         "email": { "type": "boolean" },
//       },
//       "additionalProperties": false
//     },
//     "created_by": {
//       "type": "string",
//       "minLength": 24,
//       "maxLength": 24
//     },
//     "active_status": { "type": "string" },
//     "created_at": { "type": "string", "format": "date" },
//     "updated_at":  { "type": "string", "format": "date" }
//   },
//   "additionalProperties": false
// };

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
    "password": {
      "type": "string",
      "minLength": 8
    },
    "user_type": { "enum": ["admin","employee","customer"] },
    "plan_id": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "company_id": { "type": "string" },
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
    "created_at": { "type": "string" },
    "updated_at":  { "type": "string" }
  },
  "additionalProperties": false
};