import { axiosInstance, ApiBase } from "./common";

class MachinesApi extends ApiBase {
    getExternalId = async (machineId: number) => {
        return axiosInstance.get(`/api/machines/${machineId}/external-id`, {});
    };
}

export const machinesApi = new MachinesApi();
