/// <reference path="../pb_data/types.d.ts" />

// Idempotent rule repair for the dedicated JulianPhoto admin collection.
migrate((db) => {
  const dao = new Dao(db);
  const admin = '@request.auth.id != "" && @request.auth.collectionName = "site_admins"';
  const published = (field) => field + ' = true || (' + admin + ')';

  [
    ["services", "is_active"],
    ["gallery", "is_published"],
    ["gallery_categories", "is_active"],
  ].forEach(([name, publishedField]) => {
    const collection = dao.findCollectionByNameOrId(name);
    collection.listRule = published(publishedField);
    collection.viewRule = published(publishedField);
    collection.createRule = admin;
    collection.updateRule = admin;
    collection.deleteRule = admin;
    dao.saveCollection(collection);
  });

  const settings = dao.findCollectionByNameOrId("site_settings");
  settings.createRule = admin;
  settings.updateRule = admin;
  settings.deleteRule = admin;
  return dao.saveCollection(settings);
}, (db) => {
  // Rules are data-independent. The reverse migration intentionally keeps the
  // secure defaults rather than weakening permissions during a rollback.
})
