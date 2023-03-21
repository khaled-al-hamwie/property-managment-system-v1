export interface PropertyCreate {
	owner_id: number;
	city_id: number;
	country_id: number;
	property_type_id: number;
	name: string;
	description?: string;
	images?: string[];

	place: string;
	is_private?: boolean;
	google_map_link?: string;
}
