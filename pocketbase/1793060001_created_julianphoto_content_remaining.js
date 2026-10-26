/// <reference path="../pb_data/types.d.ts" />

// Corrective migration for PocketBase 0.19: Dao.saveCollection returns no value.
migrate((db) => {
  const services = new Collection({
    id: "jpsrv8n4c2q6m9x", name: "services", type: "base", system: false,
    schema: [
      { id: "jpsrv001", name: "title", type: "text", required: true, presentable: false, unique: false, options: { min: 1, max: 160, pattern: "" } },
      { id: "jpsrv002", name: "slug", type: "text", required: true, presentable: false, unique: true, options: { min: 1, max: 96, pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" } },
      { id: "jpsrv003", name: "description", type: "editor", required: false, presentable: false, unique: false, options: { convertUrls: false } },
      { id: "jpsrv004", name: "cover", type: "file", required: false, presentable: false, unique: false, options: { maxSelect: 1, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"], thumbs: ["1200x800"] } },
      { id: "jpsrv005", name: "images", type: "file", required: false, presentable: false, unique: false, options: { maxSelect: 30, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"], thumbs: ["1200x800"] } },
      { id: "jpsrv006", name: "price_from", type: "number", required: false, presentable: false, unique: false, options: { min: 0, max: null, noDecimal: false } },
      { id: "jpsrv007", name: "is_active", type: "bool", required: false, presentable: false, unique: false, options: {} },
      { id: "jpsrv008", name: "sort_order", type: "number", required: false, presentable: false, unique: false, options: { min: 0, max: null, noDecimal: true } }
    ],
    indexes: ["CREATE INDEX idx_jp_services_published_sort ON services (is_active, sort_order)"],
    listRule: "is_active = true", viewRule: "is_active = true", createRule: null, updateRule: null, deleteRule: null, options: {}
  });
  const gallery = new Collection({
    id: "jpgal7m3d5q8v1n", name: "gallery", type: "base", system: false,
    schema: [
      { id: "jpgal001", name: "title", type: "text", required: true, presentable: false, unique: false, options: { min: 1, max: 160, pattern: "" } },
      { id: "jpgal002", name: "description", type: "editor", required: false, presentable: false, unique: false, options: { convertUrls: false } },
      { id: "jpgal003", name: "image", type: "file", required: true, presentable: false, unique: false, options: { maxSelect: 1, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"], thumbs: ["1200x800"] } },
      { id: "jpgal004", name: "category", type: "relation", required: false, presentable: false, unique: false, options: { collectionId: "jpctg9v2x4m6q8r", cascadeDelete: false, minSelect: null, maxSelect: 1, displayFields: ["name"] } },
      { id: "jpgal005", name: "featured", type: "bool", required: false, presentable: false, unique: false, options: {} },
      { id: "jpgal006", name: "sort_order", type: "number", required: false, presentable: false, unique: false, options: { min: 0, max: null, noDecimal: true } },
      { id: "jpgal007", name: "is_published", type: "bool", required: false, presentable: false, unique: false, options: {} }
    ],
    indexes: ["CREATE INDEX idx_jp_gallery_published_sort ON gallery (is_published, sort_order)"],
    listRule: "is_published = true", viewRule: "is_published = true", createRule: null, updateRule: null, deleteRule: null, options: {}
  });
  const messages = new Collection({
    id: "jpmsg6q2n8v4c1r", name: "contact_messages", type: "base", system: false,
    schema: [
      { id: "jpmsg001", name: "name", type: "text", required: true, presentable: false, unique: false, options: { min: 2, max: 120, pattern: "" } },
      { id: "jpmsg002", name: "email", type: "email", required: true, presentable: false, unique: false, options: { exceptDomains: null, onlyDomains: null } },
      { id: "jpmsg003", name: "message", type: "text", required: true, presentable: false, unique: false, options: { min: 5, max: 4000, pattern: "" } },
      { id: "jpmsg004", name: "status", type: "select", required: false, presentable: false, unique: false, options: { maxSelect: 1, values: ["new", "read", "archived"] } }
    ],
    indexes: ["CREATE INDEX idx_jp_contact_messages_status_created ON contact_messages (status, created)"],
    listRule: null, viewRule: null, createRule: "", updateRule: null, deleteRule: null, options: {}
  });
  Dao(db).saveCollection(services);
  Dao(db).saveCollection(gallery);
  return Dao(db).saveCollection(messages);
}, (db) => {
  const dao = new Dao(db);
  ["jpmsg6q2n8v4c1r", "jpgal7m3d5q8v1n", "jpsrv8n4c2q6m9x"].forEach((id) => dao.deleteCollection(dao.findCollectionByNameOrId(id)));
})
