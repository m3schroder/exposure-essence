package data

import (
	"fmt"

	"gorm.io/driver/sqlserver"
	"gorm.io/gorm"

	"app/lib/config"
)

func Db() *gorm.DB {
	dsn := fmt.Sprintf("sqlserver://%s:1433?database=default", config.Get("mssql_conn"))
	db, err := gorm.Open(sqlserver.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
	return db
}
