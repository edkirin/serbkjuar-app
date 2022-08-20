import { axiosInstance, ApiBase } from "./Common";

class MachinesApi extends ApiBase {
    getExternalId = async (machineId) => {
        return axiosInstance.get(`/machines/${machineId}/external-id`, {});
    };
}

export const machinesApi = new MachinesApi();
