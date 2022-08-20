package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func isError(c *gin.Context, err error) bool {
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"details": err.Error(),
		})
		return true
	}
	return false
}

func raiseError(c *gin.Context, errCode int, message string) {
	c.AbortWithStatusJSON(errCode, gin.H{
		"details": message,
	})
}

func raiseBadRequestError(c *gin.Context, message string) {
	raiseError(c, http.StatusBadRequest, message)
}

func raiseInternalError(c *gin.Context, message string) {
	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
		"details": "Internal server error. We will we will fix it!",
	})
}
