CREATE TABLE IF NOT EXISTS tournament_players (
  id SERIAL PRIMARY KEY,
  real_name VARCHAR(100) NOT NULL,
  nickname VARCHAR(100) NOT NULL,
  steam_account VARCHAR(100) NOT NULL,
  registered_at TIMESTAMP DEFAULT NOW()
);