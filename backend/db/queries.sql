-- SQLite

-- Get everything from applications table
SELECT * FROM applications;

-- Create applications table
CREATE TABLE applications(
	application_id	INTEGER,
	user_id	INTEGER NOT NULL DEFAULT -1,
	name    TEXT NOT NULL DEFAULT ' ' CHECK(LENGTH("name") <= 100),
	requested_amount	REAL NOT NULL DEFAULT 0.00 CHECK("requested_amount" >= 0),
	application_status	TEXT NOT NULL DEFAULT 'Waiting Decision' CHECK("application_status" IN ('Approved', 'Denied', 'Waiting Decision')),
	PRIMARY KEY(application_id)
)

-- Delete everything in applications table
DELETE FROM applications;

-- Drop the applications table (so you can recreate it)
DROP TABLE applications;