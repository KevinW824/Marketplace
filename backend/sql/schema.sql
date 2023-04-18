-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);
-- Your database schema goes here --
DROP TABLE IF EXISTS listing;
CREATE TABLE listing(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), category VARCHAR(32), listing jsonb);
-- Category Table Schema
DROP TABLE IF EXISTS category;
CREATE TABLE category(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), categoryName VARCHAR(32), category jsonb);
-- User Table Schema
DROP TABLE IF EXISTS users;
CREATE TABLE users(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),fn VARCHAR(32),ln VARCHAR(32),email VARCHAR(64), phone VARCHAR(32),password VARCHAR(128));