CREATE TABLE IF NOT EXISTS Run (
    id INT NOT NULL,
    title VARCHAR(250) NOT NULL,
    started_on TIMESTAMP NOT NULL,
    completed_on TIMESTAMP NULL,
    kilometers INT NOT NULL,
    location VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);
