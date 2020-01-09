// SIDEBAR
export const UserSidebarElements = [
    {
        label: "Red voznje",
        route: "timetable"
    },
    {
        label: "Mreza linija",
        route: "network"
    },
    {
        label: "Trenutna lokacija",
        route: "current-location"
    },
    {
        label: "Cenovnik",
        route: "pricelist"
    },
    {
        label: "Karte",
        route: "ticket-buy"
    }
];

export const NotLoggedUserSidebarElements = [
    {
        label: "Red voznje",
        route: "timetable"
    },
    {
        label: "Mreza linija",
        route: "network"
    },
    {
        label: "Trenutna lokacija",
        route: "current-location"
    },
    {
        label: "Cenovnik",
        route: "pricelist"
    }
];

export const AdminSidebarElements = [
    {
        label: "Uredi red voznje",
        route: "edit-timetable"
    },
    {
        label: "Uredi cenovnik",
        route: "edit-pricelist"
    },
    {
        label: "Uredi linije",
        route: "edit-lines"
    },
    {
        label: "Uredi stanice",
        route: "edit-stations"
    }
];

export const KontrolerSidebarElements = [
    {
        label: "Validacija karata",
        route: "validate-tickets"
    },
    {
        label: "Verifikacija putnika",
        route: "verify-passengers"
    }
];



// HEADER
export const LogedUserHeaderElements = [
    {
        name: "Profil",
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


// tipovi
export const validacijaDokumenta = [
    {
        name: "Validan",
        value: 0
    },
    {
        name: "Nevalidan",
        value: 1
    }
];

export const TipPutnika = [ 
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

export const TipKarte = [ 
    "vremenska",
    "dnevna",
    "mesecna",
    "godisnja"
];

export const TipRedaVoznje = [ 
    "gradski",
    "prigradski"
];

export const TipDana = [ 
    "radni",
    "subota",
    "nedelja",
    "praznik"
];

export const LinijePrivremeno = [ 
    "15",
    "20",
    "7a",
    "13"
  ];
  
