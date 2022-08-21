package controller

import (
	"golang-service-template/pkg/db"
	"golang-service-template/pkg/dto"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func handleGetMachineExternalId(c *gin.Context) {
	machineId, err := strconv.Atoi(c.Param("machineId"))
	if err != nil {
		raiseBadRequestError(c, "Invalid machineId parameter")
		return
	}

	var machine db.MachineModel
	result := db.Session.First(&machine, "id = ?", machineId)
	if result.Error != nil {
		raiseError(c, http.StatusNotFound, strings.Join(
			[]string{"Machine with id ", c.Param("machineId"), " not found"},
			"",
		))
		return
	}

	c.JSON(
		http.StatusOK,
		dto.MachineExternalIdDto{
			MachineId:  machine.Id,
			ExternalId: machine.ExternalId,
		},
	)
}
