WITH HolidayOrders AS (
    SELECT 
        u.id,
        SUM(c.prize) * 0.1 AS cashback
    FROM "Offers" AS o
    JOIN "Contests" AS c ON o."contestId" = c.id
    JOIN "Users" AS u ON c."userId" = u.id
    WHERE u.role = 'customer'
      AND c."createdAt" BETWEEN '2024-12-25' AND '2025-01-14'
    GROUP BY u.id
)
UPDATE "Users" 
SET balance = balance + ho.cashback
FROM HolidayOrders AS ho
WHERE "Users".id = ho.id;
