package controller

import (
	"fmt"
	"net/http"
	"serbkjuar/pkg/db"
	"serbkjuar/pkg/dto"
	"serbkjuar/pkg/logging"
	"strconv"

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
		message := fmt.Sprintf("Machine with id %d not found", machineId)
		logging.Error(message)
		raiseError(c, http.StatusNotFound, message)
		return
	} else {
		message := fmt.Sprintf("Found external_id %s for machine_id %d", machine.ExternalId, machine.Id)
		logging.Info(message)
	}

	c.JSON(
		http.StatusOK,
		dto.MachineExternalIdDto{
			MachineId:  machine.Id,
			ExternalId: machine.ExternalId,
		},
	)
}
