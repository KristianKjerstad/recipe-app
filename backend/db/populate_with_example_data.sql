-- Inserting data into the recipe table
INSERT INTO recipe (id, type, name, category, recipe_steps)
VALUES
  ('a1f8f3cb-1a4d-4e51-92ee-430c6ab42d5c', 'cocktail', 'Vodka Redbull', 'Mixed Drinks', ARRAY['Pour 2 oz vodka into a glass', 'Add Redbull', 'Stir well']),
  ('6e22506d-4169-4b1f-9209-cc4e5d558e50', 'cocktail', 'Vodka Screwdriver', 'Mixed Drinks', ARRAY['Pour 2 oz vodka into a glass', 'Add 4 oz orange juice', 'Stir well']),
  ('65e01f95-1ccf-43fe-8c63-8c4e526507c0', 'cocktail', 'Negroni', 'Classic Cocktails', ARRAY['Combine 1 oz gin, 1 oz vermouth, and 1 oz Campari in a glass', 'Stir well', 'Serve over ice']);
-- ('9e503537-5d37-4ef0-a41a-01f328eb0219', 'cocktail', 'Mojito', 'Mixed Drinks', ARRAY['Muddle 8-10 mint leaves and 1 oz lime juice in a glass', 'Add 2 oz rum, 0.75 oz simple syrup, and ice', 'Top with soda water']);

-- Inserting data into the ingredient table
INSERT INTO ingredient (id, name, recipe_id)
VALUES
  ('ea4ef0d2-3b6a-4e7f-8251-ee088477f7bd', 'Vodka', 'a1f8f3cb-1a4d-4e51-92ee-430c6ab42d5c'),
  ('2b893601-437c-4a17-877b-8aa4ed1e4e9e', 'Red bull', 'a1f8f3cb-1a4d-4e51-92ee-430c6ab42d5c'),
  ('77410c58-d293-4ac9-ae1a-e31f77b21442', 'Orange juice', '6e22506d-4169-4b1f-9209-cc4e5d558e50'),
  ('9472b38e-3eee-4afc-8ac9-7bdbf1fd3260', 'Gin', '65e01f95-1ccf-43fe-8c63-8c4e526507c0'),
  ('a655fe69-b385-483d-843b-97a840f410e2', 'Vermouth', '65e01f95-1ccf-43fe-8c63-8c4e526507c0'),
  ('15903e1a-6629-4d70-a7b2-784d7f2d91ed', 'Campari', '65e01f95-1ccf-43fe-8c63-8c4e526507c0');
