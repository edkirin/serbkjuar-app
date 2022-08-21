package db

import (
	"golang-service-template/pkg/cfg"
	"golang-service-template/pkg/logging"
	"strings"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	gormLogger "gorm.io/gorm/logger"
)

const CONNECTION_MAX_IDLE_TIME = time.Minute * 1

var Session *gorm.DB

func InitDB() *gorm.DB {
	var connectionString = strings.Join([]string{
		"postgres://",
		cfg.Config.Database.Username, ":",
		cfg.Config.Database.Password, "@",
		cfg.Config.Database.Host, ":",
		cfg.Config.Database.Port, "/",
		cfg.Config.Database.Name,
		"?sslmode=disable",
	}, "")
	logging.Log.Info("Using database connection string: " + connectionString)

	var logLevel = gormLogger.Silent
	if cfg.Config.Application.DebugSQL {
		logLevel = gormLogger.Info
	}

	var err error
	Session, err = gorm.Open(postgres.Open(connectionString), &gorm.Config{
		Logger: gormLogger.Default.LogMode(logLevel),
	})
	if err != nil {
		logging.Log.Error("Error connecting to database: " + err.Error())
		return nil
	}

	// set connection autodisconnect after idle time
	db, _ := Session.DB()
	db.SetConnMaxIdleTime(CONNECTION_MAX_IDLE_TIME)

	return Session
}
