import {BaseHttpServices} from 'shared/services/base-http-service';
import {IAvailableCountry, IPublicHolidays} from "shared/types/counteries-types";


interface DateApiInterface {
	getAvailableCountry: () => Promise<IAvailableCountry[]>;
	getPublicHolidays: (year: string, countryCode: string) => Promise<IPublicHolidays[]>;
}

export class DateApiService implements DateApiInterface {

	private readonly http: BaseHttpServices;

	constructor(httpService: BaseHttpServices) {
		this.http = httpService;
	}

	getAvailableCountry = async (): Promise<IAvailableCountry[]> => {
		const payload = await this.http.get(`/AvailableCountries`);
		return payload.data;
	}
	getPublicHolidays = async (year, countryCode): Promise<IPublicHolidays[]> => {
		const payload = await this.http.get(`/PublicHolidays/${year}/${countryCode}`);
		return payload.data;
	}
}

export const DateApi = new DateApiService(new BaseHttpServices());
