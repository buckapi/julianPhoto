/// <reference path="../pb_data/types.d.ts" />

migrate((db) => {
  const adminId = "jpadmin7q2m5v8c";
  const adminRule = '@request.auth.collectionId = "' + adminId + '"';
  const admins = new Collection({
    id: adminId, name: "site_admins", type: "auth", system: false,
    schema: [{ id: "jpadm001", name: "display_name", type: "text", required: true, presentable: false, unique: false, options: { min: 2, max: 120, pattern: "" } }],
    indexes: [], listRule: null, viewRule: adminRule, createRule: null, updateRule: adminRule, deleteRule: null,
    options: { allowEmailAuth: true, allowOAuth2Auth: false, allowUsernameAuth: true, exceptEmailDomains: null, manageRule: null, minPasswordLength: 12, onlyEmailDomains: null, requireEmail: true }
  });
  const settings = new Collection({
    id: "jpset4n1c7q9v2m", name: "site_settings", type: "base", system: false,
    schema: [
      { id: "jpset001", name: "photographer_name", type: "text", required: true, presentable: false, unique: false, options: { min: 1, max: 120, pattern: "" } },
      { id: "jpset002", name: "contact_email", type: "email", required: false, presentable: false, unique: false, options: { exceptDomains: null, onlyDomains: null } },
      { id: "jpset003", name: "phone", type: "text", required: false, presentable: false, unique: false, options: { min: null, max: 40, pattern: "" } },
      { id: "jpset004", name: "whatsapp", type: "text", required: false, presentable: false, unique: false, options: { min: null, max: 40, pattern: "" } },
      { id: "jpset005", name: "instagram", type: "url", required: false, presentable: false, unique: false, options: { exceptDomains: null, onlyDomains: null } },
      { id: "jpset006", name: "facebook", type: "url", required: false, presentable: false, unique: false, options: { exceptDomains: null, onlyDomains: null } },
      { id: "jpset007", name: "tiktok", type: "url", required: false, presentable: false, unique: false, options: { exceptDomains: null, onlyDomains: null } },
      { id: "jpset008", name: "professional_bio", type: "editor", required: false, presentable: false, unique: false, options: { convertUrls: false } },
      { id: "jpset009", name: "footer_text", type: "text", required: false, presentable: false, unique: false, options: { min: null, max: 250, pattern: "" } }
    ],
    indexes: [], listRule: "", viewRule: "", createRule: adminRule, updateRule: adminRule, deleteRule: adminRule, options: {}
  });
  const dao = new Dao(db);
  const categories = dao.findCollectionByNameOrId("gallery_categories");
  categories.schema.addField(new SchemaField({ id: "jpcat005", name: "description", type: "text", required: false, presentable: false, unique: false, options: { min: null, max: 500, pattern: "" } }));
  categories.schema.addField(new SchemaField({ id: "jpcat006", name: "cover", type: "file", required: false, presentable: false, unique: false, options: { maxSelect: 1, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"], thumbs: ["800x600"], protected: false } }));
  dao.saveCollection(categories);
  dao.saveCollection(admins);
  return dao.saveCollection(settings);
}, (db) => {
  const dao = new Dao(db);
  dao.deleteCollection(dao.findCollectionByNameOrId("jpset4n1c7q9v2m"));
  dao.deleteCollection(dao.findCollectionByNameOrId("jpadmin7q2m5v8c"));
})
