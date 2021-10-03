

 * Program to input test data into mysql
 * I found it difficult to handle mysql's unique constraint in the faker npm package.

# MySQL
 * It may fail with packet size setting during execution.
 * In that case, increase my.cnf's max_allowed_packet
```
show variables like '%max_allowed_packet%';
```


# Test Table
```
CREATE TABLE employees (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	email	    VARCHAR(50)     NOT NULL,
    first_name  VARCHAR(14)     NOT NULL,
    last_name   VARCHAR(16)     NOT NULL,
    birth_date  DATE            NOT NULL,
	mobile      VARCHAR(30)     NOT NULL,
    gender      ENUM ('M','F')  NOT NULL,
	zipcode     VARCHAR(15)     NOT NULL,
	address     VARCHAR(200)	NOT NULL,
    hire_date   DATE            NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE INDEX IDX_FIND_ID ON employees 
(email, mobile, zipcode);
```