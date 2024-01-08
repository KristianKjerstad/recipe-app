CREATE TABLE recipe (
    id UUID PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    recipe_steps TEXT[] NOT NULL
);

CREATE TABLE ingredient (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    recipe_id UUID REFERENCES recipe(id) ON DELETE SET NULL
);
