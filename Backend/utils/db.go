
package utils

import (
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/postgres"
)

var DB *gorm.DB

func ConnectDatabase() {
    db, err := gorm.Open("postgres", "host=localhost port=5432 user=your_username dbname=your_database password=your_password sslmode=disable")
    if err != nil {
        panic("Failed to connect to database")
    }
    DB = db
}
