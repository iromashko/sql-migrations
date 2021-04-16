/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    create table comments (
      id serial primary key,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      contents VARCHAR(240) NOT NULL
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    drop table comments;
  `);
};
