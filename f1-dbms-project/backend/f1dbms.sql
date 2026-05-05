-- Create DB
CREATE DATABASE IF NOT EXISTS f1DBMS;
USE f1DBMS;

CREATE TABLE IF NOT EXISTS TEAMS (
    TeamID VARCHAR(3) PRIMARY KEY, -- ALP, AMR, WIL, AUD, CAD, FER, HAS, MCL, MER, RB and ORB
    TeamName VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS SEASON_TEAMS (
	TeamID VARCHAR(3),
    Season YEAR NOT NULL,
    DisplayName VARCHAR(50),
    ColorPrimary CHAR(7),
    ColorSecondary CHAR(7),
	PRIMARY KEY (TeamID, Season),
    FOREIGN KEY (TeamID) REFERENCES TEAMS(TeamID)
);

CREATE TABLE IF NOT EXISTS DRIVERS (
    DriverID INT PRIMARY KEY AUTO_INCREMENT, -- HAM85        Abrrev  +  birth year
    Abbrev VARCHAR(3),
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Nationality VARCHAR(50),
    DOB DATE,
    DebutYear INT,
    DriverRole ENUM('Main', 'Reserve', 'Test', 'Retired', 'Test/Reserve') -- Main, Reserve, Test
);

CREATE TABLE IF NOT EXISTS CARS (
    CarID INT PRIMARY KEY AUTO_INCREMENT, 
    TeamID VARCHAR(3),
    Chassis VARCHAR(10), -- RB21
    PowerUnit VARCHAR(20),
    EngineSupplier VARCHAR(30),  -- Mercedes
    Weight INT,
    Season YEAR,
    FOREIGN KEY (TeamID) REFERENCES TEAMS(TeamID)
);

CREATE TABLE IF NOT EXISTS PITWALL (
    StaffID INT PRIMARY KEY AUTO_INCREMENT,
    TeamID VARCHAR(3),
    DriverID INT NULL,
    StaffName VARCHAR(100),
    StaffRole VARCHAR(100),
    Season Year,
    FOREIGN KEY (TeamID) REFERENCES TEAMS(TeamID),
    FOREIGN KEY (DriverID) REFERENCES DRIVERS(DriverID)
);

CREATE TABLE IF NOT EXISTS CIRCUITS (
    CircuitID INT PRIMARY KEY AUTO_INCREMENT,
    CircuitName VARCHAR(30),
    Country VARCHAR(30),
    CircuitLength_km DECIMAL(5,2),
    Turns INT
);

CREATE TABLE IF NOT EXISTS RACES (
    RaceID INT PRIMARY KEY AUTO_INCREMENT,
    CircuitID INT,
    Season YEAR,
    RaceNumber INT,
    RaceName VARCHAR(100), -- Bahrain, Spa...
    RaceDate DATE,
    Laps INT,
    Weather VARCHAR(50),
    FOREIGN KEY (CircuitID) REFERENCES CIRCUITS(CircuitID)
);

CREATE TABLE IF NOT EXISTS RESULTS (
    ResultID INT PRIMARY KEY AUTO_INCREMENT,
    RaceID INT,
    DriverID INT,
    TeamID VARCHAR(3),
    Pos INT NULL,
    Points INT DEFAULT 0,
    Standings ENUM('Finished','DNF','DSQ', 'DNS', 'DNQ', 'NC', 'Retired'), -- Finished, DNF (Did Not Finish), DSQ (Disqualified), DNS (Did Not Start), DNQ (Did Not Qualify), NC (Not Classified), Retired
    LapTime TIME(3) NULL,
    FOREIGN KEY (RaceID) REFERENCES RACES(RaceID),
    FOREIGN KEY (DriverID) REFERENCES DRIVERS(DriverID),
    FOREIGN KEY (TeamID) REFERENCES TEAMS(TeamID)
);

CREATE TABLE IF NOT EXISTS CHAMPIONSHIPS (
    ChampionID VARCHAR(7) PRIMARY KEY, -- MAX2021 or MCL2025
    Season YEAR,
    Category ENUM('Drivers','Constructors'),
    DriverID INT NULL,
    TeamID VARCHAR(3) NULL,
    Points INT,
    Wins INT,
    FOREIGN KEY (DriverID) REFERENCES DRIVERS(DriverID),
    FOREIGN KEY (TeamID) REFERENCES TEAMS(TeamID)
);

CREATE TABLE IF NOT EXISTS VISITS (
    FormID INT PRIMARY KEY AUTO_INCREMENT,

    FullName VARCHAR(100),
    Email VARCHAR(100) CHECK (Email LIKE '%@%.%'),
    Phone CHAR(10) UNIQUE,
    Gender VARCHAR(20),
    DOB DATE,

    Team VARCHAR(50),
    PreferredDate DATE CHECK (PreferredDate >= DATE_ADD(CURRENT_DATE, INTERVAL 2 MONTH)),
    TotalVisitors INT,
    TourDuration ENUM('Half-Day','Full-Day'),
    SpecialRequests VARCHAR(100),

    SubmitTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);	

CREATE TABLE IF NOT EXISTS VISIT_DEPARTMENTS (
    FormID INT,
    Department ENUM('Research','Development','Testing'),
    PRIMARY KEY (FormID, Department),
    FOREIGN KEY (FormID) REFERENCES VISITS(FormID)
);