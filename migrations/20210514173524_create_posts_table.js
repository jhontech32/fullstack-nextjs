
// Menambahkan tabel
exports.up = function(knex) {
  return knex.schema.createTable('posts', function(table) {
    table.increments()
    table.string('title')
    table.text('content')
    table.timestamps(true, true) //Bolean untuk memberikan isi file secara otomatis //usetimestamp & defaultimestampsToNow
  })
};

// Rollback tabel
exports.down = function(knex) {
  return knex.schema.dropTable('posts')
};
