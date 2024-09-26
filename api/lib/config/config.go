package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// Config func to get env value
func Get(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println(err)
	}
	val := os.Getenv(key)
	return val
}
