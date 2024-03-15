
package main

import (
    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
    "github.com/dgrijalva/jwt-go"
    "time"
)

const SecretKey = "your_secret_key"

func Login(c *gin.Context) {
    var user models.User
    if err := c.BindJSON(&user); err != nil {
        c.JSON(400, gin.H{"error": "Invalid request"})
        return
    }

    var existingUser models.User
    if err := db.Where("username = ?", user.Username).First(&existingUser).Error; err != nil {
        c.JSON(401, gin.H{"error": "Invalid credentials"})
        return
    }

    if err := bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(user.Password)); err != nil {
        c.JSON(401, gin.H{"error": "Invalid credentials"})
        return
    }

    token := jwt.New(jwt.SigningMethodHS256)
    claims := token.Claims.(jwt.MapClaims)
    claims["username"] = existingUser.Username
    claims["exp"] = time.Now().Add(time.Hour * 1).Unix()

    signedToken, err := token.SignedString([]byte(SecretKey))
    if err != nil {
        c.JSON(500, gin.H{"error": "Failed to generate token"})
        return
    }

    c.JSON(200, gin.H{"token": signedToken})
}
