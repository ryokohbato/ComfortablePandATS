import { Settings } from "./types";
import { decodeSettings } from "./decode";
import { fromStorage } from "../storage";
import { SettingsStorage } from "../../constant";
import { getFetchTime } from "../../utils";

export const getStoredSettings = async (hostname: string): Promise<Settings> => {
    const settings = await fromStorage<Settings>(hostname, SettingsStorage, decodeSettings);
    const fetchTime = await getFetchTime(settings.appInfo.hostname);
    settings.setFetchtime(fetchTime);

    return settings;
};
