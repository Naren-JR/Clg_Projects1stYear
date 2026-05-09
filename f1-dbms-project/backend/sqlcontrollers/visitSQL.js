import db from "../db.js";

export const submitVisit = async (req, res) => {

    try {

        const {

            fullName,
            email,
            phone,
            gender,
            dob,

            team,
            preferredDate,
            totalVisitors,
            tourDuration,
            specialRequests,

            departments

        } = req.body;

        // CHECK ACTIVE VISIT

        const [existing] = await db.query(
            `
            SELECT *
            FROM VISITS
            WHERE Email = ?
            AND VisitStatus IN (
                'Pending',
                'Approved'
            )
            `,
            [email]
        );

        if (existing.length > 0) {

            return res.status(400).json({
                error:
                    "Active reservation already exists"
            });

        }

        // INSERT VISIT

        const [visitResult] = await db.query(
            `
            INSERT INTO VISITS
            (
                FullName,
                Email,
                Phone,
                Gender,
                DOB,

                Team,
                PreferredDate,
                TotalVisitors,
                TourDuration,
                SpecialRequests,

                VisitStatus
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                fullName,
                email,
                phone,
                gender,
                dob,

                team,
                preferredDate,
                totalVisitors,
                tourDuration,
                specialRequests,

                "Pending"
            ]
        );

        const formID =
            visitResult.insertId;

        // INSERT DEPARTMENTS

        if (
            departments &&
            departments.length > 0
        ) {

            for (const dept of departments) {

                await db.query(
                    `
                    INSERT INTO VISIT_DEPARTMENTS
                    (
                        FormID,
                        Department
                    )
                    VALUES (?, ?)
                    `,
                    [formID, dept]
                );

            }

        }

        // AUTO USER ACCOUNT

        const username =
            email.split("@")[0];

        const password =
            phone;

        await db.query(
            `
            INSERT INTO USERS
            (
                FormID,
                Username,
                Email,
                UserPassword,
                Role
            )
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                formID,
                username,
                email,
                password,
                "user"
            ]
        );

        res.json({

            success: true,

            message:
                "Visit submitted successfully",

            username,
            password

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

};