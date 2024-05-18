-- SQLite

-- Get everything from applications table
SELECT * FROM applications;

-- Create applications table
CREATE TABLE applications(
	application_id	INTEGER,
	user_id	INTEGER NOT NULL DEFAULT -1,
	name    TEXT NOT NULL DEFAULT ' ' CHECK(LENGTH("name") <= 100),
	requested_amount	REAL NOT NULL DEFAULT 0.00 CHECK("requested_amount" >= 0),
	approval_status	TEXT NOT NULL DEFAULT 'Under Review' CHECK("approval_status" IN ('Approved', 'Denied', 'Under Review')),
	PRIMARY KEY(application_id)
)

-- Delete everything in applications table
DELETE FROM applications;

-- Drop the applications table (so you can recreate it)
DROP TABLE applications;