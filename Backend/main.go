
package main

import (
    "log"
    "net/http"
    "yourproject/handlers"
    "yourproject/utils"
)

func main() {
    db, err := utils.InitDB()
    if err != nil {
        log.Fatal("Error initializing database:", err)
    }
    defer db.Close()

    http.HandleFunc("/login", handlers.LoginHandler)
    http.HandleFunc("/signup", handlers.SignupHandler)
  
    http.ListenAndServe(":8080", nil)
}
