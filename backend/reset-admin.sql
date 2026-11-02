-- Delete existing admin account
DELETE FROM admins WHERE email = 'tolesatesfaye273@gmail.com';

-- The admin will be recreated automatically on next server restart
-- with the password from ADMIN_PASSWORD environment variable
