const mysql = require('mysql');
const faker = require('faker');


faker.locale = "ko";

const connection = mysql.createConnection({
    host: 'ip or url',
    user: 'user',
    database: 'db',
    password: 'pwd',
    acquireTimeout: 1000000
});

const query = 'INSERT INTO employees (email, first_name, last_name, birth_date, mobile, gender, zipcode, address, hire_date) VALUES ?';

const repeatCnt = 10;
const rowCnt = 10000;
for (let i = 0; i < repeatCnt; i++){
    const data = [];
    for (let j = 0; j < rowCnt; j++) {

        data.push([
            faker.internet.email(),
            faker.name.findName(),
            faker.name.lastName(),
            faker.date.between('1940-01-01', '1999-01-05'),
            faker.phone.phoneNumber(),
            faker.name.gender(),
            faker.address.zipCode(),
            faker.address.city(),
            faker.date.between('2010-01-01', '2021-01-05')
        ]);
    }

    connection.query(query, [data], function(err, result) {
        console.log(err);
        console.log(result);
    });
}

connection.end();
