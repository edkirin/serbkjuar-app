package main

import (
	"serbkjuar/pkg/cfg"
	"serbkjuar/pkg/controller"
	"serbkjuar/pkg/db"
	"serbkjuar/pkg/logging"
)

func main() {
	cfg.Init()
	logging.Init()
	db.InitDB()
	controller.Serve()
}
