package controller

import (
	"net/http"
	"serbkjuar/pkg/cfg"
	"serbkjuar/pkg/logging"
	"strings"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func corsMiddleware() gin.HandlerFunc {
	allowHeaders := [12]string{
		"Content-Type",
		"Content-Length",
		"Accept-Encoding",
		"X-CSRF-Token",
		"Authorization",
		"accept",
		"origin",
		"Cache-Control",
		"X-Requested-With",
		"x-timezone",
		"Access-Control-Allow-Origin",
		"Access-Control-Max-Age",
	}

	return func(c *gin.Context) {
		var allowOrigin string
		if cfg.Config.Application.IsProduction {
			allowOrigin = cfg.Config.Site.Url
		} else {
			allowOrigin = "*"
		}
		c.Writer.Header().Set("Access-Control-Allow-Origin", allowOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", strings.Join(allowHeaders[:], ", "))
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

func initRouter() *gin.Engine {
	if cfg.Config.Application.IsProduction {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()
	router.Use(corsMiddleware())

	if cfg.Config.Application.StaticPath != nil {
		staticPath := *cfg.Config.Application.StaticPath
		logging.Info(strings.Join([]string{"Using static serve path: ", staticPath}, ""))
		router.Use(static.Serve("/", static.LocalFile(staticPath, true)))
	}

	routes := router.Group("/api")
	{
		routes.GET("/ping", handlePing)
		routes.GET("/machines/:machineId/external-id", handleGetMachineExternalId)
	}

	return router
}

func Serve() {
	serverAddr := strings.Join([]string{cfg.Config.Server.Host, cfg.Config.Server.Port}, ":")
	router := initRouter()

	logging.Info(strings.Join([]string{"Application started on ", serverAddr}, ""))
	router.Run(serverAddr)
}
