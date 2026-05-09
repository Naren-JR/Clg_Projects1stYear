CREATE USER IF NOT EXISTS 'admin_user'@'localhost'
IDENTIFIED BY 'admin123';

CREATE USER IF NOT EXISTS 'normal_user'@'localhost'
IDENTIFIED BY 'user123';

GRANT SELECT, INSERT, UPDATE
ON f1DBMS.VISITS
TO 'normal_user'@'localhost';

GRANT SELECT
ON f1DBMS.ADMIN_VISIT_OVERVIEW
TO 'normal_user'@'localhost';

REVOKE SELECT
ON f1DBMS.FULL_VISIT_DETAILS
FROM 'normal_user'@'localhost';

GRANT ALL PRIVILEGES
ON f1DBMS.*
TO 'admin_user'@'localhost';

FLUSH PRIVILEGES;