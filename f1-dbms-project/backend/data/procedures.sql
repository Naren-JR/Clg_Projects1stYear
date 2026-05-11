DROP PROCEDURE IF EXISTS GetDriverStandings;

DELIMITER //

CREATE PROCEDURE GetDriverStandings(
IN seasonYear YEAR
)

BEGIN

SELECT
d.FirstName,
d.LastName,
SUM(r.Points) AS Points
FROM RESULTS r

JOIN DRIVERS d
ON r.DriverID=d.DriverID

JOIN RACES ra
ON r.RaceID=ra.RaceID

WHERE ra.Season=seasonYear

GROUP BY d.DriverID

ORDER BY Points DESC;

END //

DELIMITER ;