// SIDEBAR
export const UserSidebarElements = [
    {
        label: "Timetable",
        route: "timetable"
    },
    {
        label: "Network",
        route: "network"
    },
    {
        label: "Current location",
        route: "current-location"
    },
    {
        label: "Pricelist",
        route: "pricelist"
    },
    {
        label: "Tickets",
        route: "ticket-buy"
    }
];

export const NotLoggedUserSidebarElements = [
    {
        label: "Timetable",
        route: "timetable"
    },
    {
        label: "Network",
        route: "network"
    },
    {
        label: "Current location",
        route: "current-location"
    },
    {
        label: "Pricelist",
        route: "pricelist"
    }
];

export const AdminSidebarElements = [
    {
        label: "Edit timetable",
        route: "edit-timetable"
    },
    {
        label: "Edit pricelist",
        route: "edit-pricelist"
    },
    {
        label: "Edit lines",
        route: "edit-lines"
    },
    {
        label: "Edit stations",
        route: "edit-stations"
    }
];

export const KontrolerSidebarElements = [
    {
        label: "Tickets validation",
        route: "validate-tickets"
    },
    {
        label: "Passengers verification",
        route: "verify-passengers"
    }
];



// HEADER
export const LogedUserHeaderElements = [
    {
        name: "Profile",
        route: "profile"
    },
];

export const NotLogedUserHeaderElements = [
    {
        name: "Sign up",
        route: "register"
    },
    {
        name: "Log in",
        route: "login"
    }
];

export const PassengerType = [ 
    {
        name: "djak",
        value: 0
    },
    {
        name: "penzioner",
        value: 1
    },
    {
        name: "regularni",
        value: 2
    }
];

export const TicketType = [ 
    "vremenska",
    "dnevna",
    "mesecna",
    "godisnja"
];

export const TimetableType = [ 
    "gradski",
    "prigradski"
];

export const DayType = [ 
    "radni",
    "subota",
    "nedelja",
    "praznik"
];

export const TemporarelyLines = [ 
    "15",
    "20",
    "7a",
    "13"
  ];
  
