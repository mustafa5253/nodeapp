module.exports = {
  "required": ["document_name", "document_type"],
  "properties": {
    "document_name": { "type": "string" },
    "document_type": { "enum": ["FIXED", "RECURRING"] },
    "fieldname": { "type": "string" },
    "originalname": { "type": "string" },
    "encoding": { "type": "string" },
    "mimetype": { "type": "string" },
    "destination": { "type": "string" },
    "filename": { "type": "string" },
    "path": { "type": "string" },
    "document_id": { "type": "string" },
    "size": { "type": "number" },
    "created_by": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "created_for": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "created_at": { "type": "string" },
    "updated_at": { "type": "string" },

    "bucket": { "type": "string" },
    "key": { "type": "string" },
    "acl": { "type": "string" },
    "contentType": { "type": "string" },
    "contentDisposition": { "type": ["string", "null"] },
    "storageClass": { "type": "string" },
    "serverSideEncryption": { "type": ["string", "null"] },
    "metadata": { "type": ["string", "null"] },
    "location": { "type": "string" },
    "etag": { "type": "string" },
  },
  "additionalProperties": true
};
