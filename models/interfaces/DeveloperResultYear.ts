import type { DeveloperData } from "./DeveloperData";

export interface DeveloperResultYear{
    Month: string;
    DeveloperCounts: DeveloperData[];
    DeveloperTimes: DeveloperData[];
}