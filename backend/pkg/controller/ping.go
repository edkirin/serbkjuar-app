package controller

import (
	"net/http"
	"serbkjuar/pkg/dto"

	"github.com/gin-gonic/gin"
)

func handlePing(c *gin.Context) {
	c.JSON(
		http.StatusOK,
		dto.PingDto{
			Message: "Pong!",
		},
	)
}
