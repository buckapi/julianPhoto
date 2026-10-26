/// <reference path="../pb_data/types.d.ts" />

// JulianPhoto content model. No records are seeded by this migration.
migrate((db) => {
  const category = new Collection({
    id: "jpctg9v2x4m6q8r",
    name: "gallery_categories",
    type: "base",
    system: false,
    schema: [
      { id: "jpctgname000001", name: "name", type: "text", required: true, presentable: false, unique: true, options: { min: 1, max: 80, pattern: "" } },
      { id: "jpctgslug000002", name: "slug", type: "text", required: true, presentable: false, unique: true, options: { min: 1, max: 96, pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" } },
      { id: "jpctgsort000003", name: "sort_order", type: "number", required: false, presentable: false, unique: false, options: { min: 0, max: null, noDecimal: true } },
      { id: "jpctgactive00004", name: "is_active", type: "bool", required: false, presentable: false, unique: false, options: {} }
    ],
    indexes: ["CREATE INDEX idx_jp_gallery_categories_sort ON gallery_categories (sort_order)"],
    listRule: "is_active = true",
    viewRule: "is_active = true",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    options: {}
  });

  const services = new Collection({
    id: "jpsrv8n4c2q6m9x",
    name: "services",
    type: "base",
    system: false,
    schema: [
      { id: "jpsrvtitle000001", name: "title", type: "text", required: true, presentable: false, unique: false, options: { min: 1, max: 160, pattern: "" } },
      { id: "jpsrvslug0000002", name: "slug", type: "text", required: true, presentable: false, unique: true, options: { min: 1, max: 96, pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" } },
      { id: "jpsrvdesc0000003", name: "description", type: "editor", required: false, presentable: false, unique: false, options: { convertUrls: false } },
      { id: "jpsrvcover000004", name: "cover", type: "file", required: false, presentable: false, unique: false, options: { maxSelect: 1, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"], thumbs: ["1200x800"] } },
      { id: "jpsrvimages00005", name: "images", type: "file", required: false, presentable: false, unique: false, options: { maxSelect: 30, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"], thumbs: ["1200x800"] } },
      { id: "jpsrvprice000006", name: "price_from", type: "number", required: false, presentable: false, unique: false, options: { min: 0, max: null, noDecimal: false } },
      { id: "jpsrvactive000007", name: "is_active", type: "bool", required: false, presentable: false, unique: false, options: {} },
      { id: "jpsrvsort0000008", name: "sort_order", type: "number", required: false, presentable: false, unique: false, options: { min: 0, max: null, noDecimal: true } }
    ],
    indexes: ["CREATE INDEX idx_jp_services_published_sort ON services (is_active, sort_order)"],
    listRule: "is_active = true",
    viewRule: "is_active = true",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    options: {}
  });

  const gallery = new Collection({
    id: "jpgal7m3d5q8v1n",
    name: "gallery",
    type: "base",
    system: false,
    schema: [
      { id: "jpgaltitle000001", name: "title", type: "text", required: true, presentable: false, unique: false, options: { min: 1, max: 160, pattern: "" } },
      { id: "jpgaldesc0000002", name: "description", type: "editor", required: false, presentable: false, unique: false, options: { convertUrls: false } },
      { id: "jpgalimage000003", name: "image", type: "file", required: true, presentable: false, unique: false, options: { maxSelect: 1, maxSize: 10485760, mimeTypes: ["image/jpeg", "image/png", "image/webp"], thumbs: ["1200x800"] } },
      { id: "jpgalcat00000004", name: "category", type: "relation", required: false, presentable: false, unique: false, options: { collectionId: "jpctg9v2x4m6q8r", cascadeDelete: false, minSelect: null, maxSelect: 1, displayFields: ["name"] } },
      { id: "jpgalfeature00005", name: "featured", type: "bool", required: false, presentable: false, unique: false, options: {} },
      { id: "jpgalsort00000006", name: "sort_order", type: "number", required: false, presentable: false, unique: false, options: { min: 0, max: null, noDecimal: true } },
      { id: "jpgalpublished007", name: "is_published", type: "bool", required: false, presentable: false, unique: false, options: {} }
    ],
    indexes: ["CREATE INDEX idx_jp_gallery_published_sort ON gallery (is_published, sort_order)"],
    listRule: "is_published = true",
    viewRule: "is_published = true",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    options: {}
  });

  const messages = new Collection({
    id: "jpmsg6q2n8v4c1r",
    name: "contact_messages",
    type: "base",
    system: false,
    schema: [
      { id: "jpmsgname0000001", name: "name", type: "text", required: true, presentable: false, unique: false, options: { min: 2, max: 120, pattern: "" } },
      { id: "jpmsgemail000002", name: "email", type: "email", required: true, presentable: false, unique: false, options: { exceptDomains: null, onlyDomains: null } },
      { id: "jpmsgbody0000003", name: "message", type: "text", required: true, presentable: false, unique: false, options: { min: 5, max: 4000, pattern: "" } },
      { id: "jpmsgstatus000004", name: "status", type: "select", required: false, presentable: false, unique: false, options: { maxSelect: 1, values: ["new", "read", "archived"] } }
    ],
    indexes: ["CREATE INDEX idx_jp_contact_messages_status_created ON contact_messages (status, created)"],
    listRule: null,
    viewRule: null,
    createRule: "",
    updateRule: null,
    deleteRule: null,
    options: {}
  });

  // PocketBase 0.19's saveCollection returns no value. The remaining
  // collections are intentionally created by the follow-up migration.
  return Dao(db).saveCollection(category);
}, (db) => {
  const dao = new Dao(db);
  ["jpmsg6q2n8v4c1r", "jpgal7m3d5q8v1n", "jpsrv8n4c2q6m9x", "jpctg9v2x4m6q8r"].forEach((id) => {
    dao.deleteCollection(dao.findCollectionByNameOrId(id));
  });
})
