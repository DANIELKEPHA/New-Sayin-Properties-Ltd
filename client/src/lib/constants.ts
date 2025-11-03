import {
    Wifi,
    Waves,
    Dumbbell,
    Car,
    PawPrint,
    Tv,
    Thermometer,
    Cigarette,
    Cable,
    Maximize,
    Bath,
    Phone,
    Sprout,
    Hammer,
    Bus,
    Mountain,
    VolumeX,
    Home,
    Warehouse,
    Building,
    Castle,
    Trees,
    Zap,
    Droplets,
    Route,
    Network,
    Lightbulb,
    Fence as FenceIcon,
    LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                 AMENITIES                                  */
/* -------------------------------------------------------------------------- */
export enum AmenityEnum {
    WasherDryer = "WasherDryer",
    AirConditioning = "AirConditioning",
    Dishwasher = "Dishwasher",
    HighSpeedInternet = "HighSpeedInternet",
    HardwoodFloors = "HardwoodFloors",
    WalkInClosets = "WalkInClosets",
    Microwave = "Microwave",
    Refrigerator = "Refrigerator",
    Pool = "Pool",
    Gym = "Gym",
    Parking = "Parking",
    PetsAllowed = "PetsAllowed",
    WiFi = "WiFi",
}

export const AmenityIcons: Record<AmenityEnum, LucideIcon> = {
    WasherDryer: Waves,
    AirConditioning: Thermometer,
    Dishwasher: Waves,
    HighSpeedInternet: Wifi,
    HardwoodFloors: Home,
    WalkInClosets: Maximize,
    Microwave: Tv,
    Refrigerator: Thermometer,
    Pool: Waves,
    Gym: Dumbbell,
    Parking: Car,
    PetsAllowed: PawPrint,
    WiFi: Wifi,
};

/* -------------------------------------------------------------------------- */
/*                                 HIGHLIGHTS                                 */
/* -------------------------------------------------------------------------- */
export enum HighlightEnum {
    HighSpeedInternetAccess = "HighSpeedInternetAccess",
    WasherDryer = "WasherDryer",
    AirConditioning = "AirConditioning",
    Heating = "Heating",
    SmokeFree = "SmokeFree",
    CableReady = "CableReady",
    SatelliteTV = "SatelliteTV",
    DoubleVanities = "DoubleVanities",
    TubShower = "TubShower",
    Intercom = "Intercom",
    SprinklerSystem = "SprinklerSystem",
    RecentlyRenovated = "RecentlyRenovated",
    CloseToTransit = "CloseToTransit",
    GreatView = "GreatView",
    QuietNeighborhood = "QuietNeighborhood",
}

export const HighlightIcons: Record<HighlightEnum, LucideIcon> = {
    HighSpeedInternetAccess: Wifi,
    WasherDryer: Waves,
    AirConditioning: Thermometer,
    Heating: Thermometer,
    SmokeFree: Cigarette,
    CableReady: Cable,
    SatelliteTV: Tv,
    DoubleVanities: Maximize,
    TubShower: Bath,
    Intercom: Phone,
    SprinklerSystem: Sprout,
    RecentlyRenovated: Hammer,
    CloseToTransit: Bus,
    GreatView: Mountain,
    QuietNeighborhood: VolumeX,
};

/* -------------------------------------------------------------------------- */
/*                              PROPERTY TYPES                                */
/* -------------------------------------------------------------------------- */
export enum PropertyTypeEnum {
    Rooms = "Rooms",
    Tinyhouse = "Tinyhouse",
    Apartment = "Apartment",
    Villa = "Villa",
    Townhouse = "Townhouse",
    Cottage = "Cottage",
}

export const PropertyTypeIcons: Record<PropertyTypeEnum, LucideIcon> = {
    Rooms: Home,
    Tinyhouse: Warehouse,
    Apartment: Building,
    Villa: Castle,
    Townhouse: Home,
    Cottage: Trees,
};

/* -------------------------------------------------------------------------- */
/*                               NEW ENUMS (LAND)                             */
/* -------------------------------------------------------------------------- */

export enum InfrastructureEnum {
    Water = "Water",
    Electricity = "Electricity",
    RoadAccess = "RoadAccess",
    Sewerage = "Sewerage",
    Internet = "Internet",
    StreetLighting = "StreetLighting",
    Fence = "Fence",
}

export enum ListingStatusEnum {
    AVAILABLE = "AVAILABLE",
    SOLD = "SOLD",
    RENTED = "RENTED",
    PENDING = "PENDING",
}

export enum PropertyCategoryEnum {
    RESIDENTIAL = "RESIDENTIAL",
    COMMERCIAL = "COMMERCIAL",
    LAND = "LAND",
}

export const InfrastructureIcons: Record<InfrastructureEnum, LucideIcon> = {
    Water: Droplets,
    Electricity: Zap,
    RoadAccess: Route,
    Sewerage: Droplets,
    Internet: Wifi,
    StreetLighting: Lightbulb,
    Fence: FenceIcon,
};

export enum SizeUnitEnum {
    SQM = "SQM",
    ACRES = "ACRES",
    HECTARES = "HECTARES",
}

export enum PriceUnitEnum {
    PER_MONTH = "PER_MONTH",
    PER_YEAR = "PER_YEAR",
    PER_SQM = "PER_SQM",
    PER_ACRE = "PER_ACRE",
    TOTAL = "TOTAL",
}

export enum PaymentPlanEnum {
    FULL_PAYMENT = "FULL_PAYMENT",
    INSTALLMENTS = "INSTALLMENTS",
    FLEXIBLE = "FLEXIBLE",
}

/* -------------------------------------------------------------------------- */
/*                                 REGIONS                                    */
/* -------------------------------------------------------------------------- */
export enum RegionEnum {
    MOMBASA = "Mombasa",
    KWALE = "Kwale",
    KILIFI = "Kilifi",
    TANA_RIVER = "Tana River",
    LAMU = "Lamu",
    TAITA_TAVETA = "Taita Taveta",
    GARISSA = "Garissa",
    WAJIR = "Wajir",
    MANDERA = "Mandera",
    MARSABIT = "Marsabit",
    ISIOLO = "Isiolo",
    MERU = "Meru",
    THARAKA_NITHI = "Tharaka-Nithi",
    EMBU = "Embu",
    KITUI = "Kitui",
    MACHAKOS = "Machakos",
    MAKUENI = "Makueni",
    NYANDARUA = "Nyandarua",
    NYERI = "Nyeri",
    KIRINYAGA = "Kirinyaga",
    MURANG_A = "Murang'a",
    KIAMBU = "Kiambu",
    TURKANA = "Turkana",
    WEST_POKOT = "West Pokot",
    SAMBURU = "Samburu",
    TRANS_NZOIA = "Trans Nzoia",
    UASIN_GISHU = "Uasin Gishu",
    ELGEYO_MARAKWET = "Elgeyo-Marakwet",
    NANDI = "Nandi",
    BARINGO = "Baringo",
    LAIKIPIA = "Laikipia",
    NAKURU = "Nakuru",
    NAROK = "Narok",
    KAJIADO = "Kajiado",
    KERICHO = "Kericho",
    BOMET = "Bomet",
    KAKAMEGA = "Kakamega",
    VIHIGA = "Vihiga",
    BUNGOMA = "Bungoma",
    BUSIA = "Busia",
    SIAYA = "Siaya",
    KISUMU = "Kisumu",
    HOMA_BAY = "Homa Bay",
    MIGORI = "Migori",
    KISII = "Kisii",
    NYAMIRA = "Nyamira",
    NAIROBI = "Nairobi",
}

/* -------------------------------------------------------------------------- */
/*                                 UI CONSTANTS                               */
/* -------------------------------------------------------------------------- */
export const NAVBAR_HEIGHT = 54;
export const TOPBAR_HEIGHT = 40;
export const TOTAL_NAV_HEIGHT = NAVBAR_HEIGHT + TOPBAR_HEIGHT;

/* -------------------------------------------------------------------------- */
/*                                TEST USERS                                  */
/* -------------------------------------------------------------------------- */
export const testUsers = {
    tenant: {
        username: "Carol White",
        userId: "us-east-2:76543210-90ab-cdef-1234-567890abcdef",
        signInDetails: {
            loginId: "carol.white@example.com",
            authFlowType: "USER_SRP_AUTH",
        },
    },
    tenantRole: "tenant",
    manager: {
        username: "John Smith",
        userId: "us-east-2:12345678-90ab-cdef-1234-567890abcdef",
        signInDetails: {
            loginId: "john.smith@example.com",
            authFlowType: "USER_SRP_AUTH",
        },
    },
    managerRole: "manager",
};