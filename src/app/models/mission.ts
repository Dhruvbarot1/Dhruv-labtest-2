export interface Mission {
    flight_number: number;
    mission_name: string;
    launch_year: string;
    launch_success: boolean;
    details: string;
    rocket: {
      rocket_name: string;
      rocket_type: string;
      first_stage: {
        cores: {
          land_success: boolean;
        }[];
      };
    };
    launch_site?: {
      site_name_long: string;
    };
    links: {
      mission_patch_small: string;
      wikipedia: string;
    };
  }
  