package db

type MachineModel struct {
	Id         int
	ExternalId string
}

func (u *MachineModel) TableName() string {
	return "machines"
}
