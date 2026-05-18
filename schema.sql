CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  usuario TEXT NOT NULL UNIQUE,
  clave TEXT NOT NULL
);

INSERT INTO usuarios (usuario, clave) VALUES ('alien', 'marte123');
