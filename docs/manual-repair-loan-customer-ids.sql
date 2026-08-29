-- Run this manually against the loan_management database before adding the foreign key.
-- It only repairs loan customer_id values that equal a customer's linked user_id and
-- are not already a valid customers.id value. It does not delete any data.

START TRANSACTION;

-- Review the exact rows that will be changed before running the UPDATE.
SELECT
    BIN_TO_UUID(l.id) AS loan_id,
    BIN_TO_UUID(l.customer_id) AS current_customer_id,
    BIN_TO_UUID(c.id) AS corrected_customer_id,
    c.full_name AS customer_name
FROM loans l
JOIN customers c ON c.user_id = l.customer_id
LEFT JOIN customers existing_customer ON existing_customer.id = l.customer_id
WHERE existing_customer.id IS NULL;

-- Repair only the reviewed rows.
UPDATE loans l
JOIN customers c ON c.user_id = l.customer_id
LEFT JOIN customers existing_customer ON existing_customer.id = l.customer_id
SET l.customer_id = c.id
WHERE existing_customer.id IS NULL;

-- This must return zero rows before adding the foreign key below.
SELECT
    BIN_TO_UUID(l.id) AS loan_id,
    BIN_TO_UUID(l.customer_id) AS unresolved_customer_id
FROM loans l
LEFT JOIN customers c ON c.id = l.customer_id
WHERE c.id IS NULL;

COMMIT;

-- Run only after the unresolved-customer query returns no rows.
-- ALTER TABLE loans
--     ADD CONSTRAINT fk_loans_customer
--     FOREIGN KEY (customer_id) REFERENCES customers (id);
