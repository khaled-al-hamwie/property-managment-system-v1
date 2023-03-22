export interface PropertyUpdate {
	property_id: number;
	owner_id: number;
	name: string;
	description?: string;
	images?: string[];
}
