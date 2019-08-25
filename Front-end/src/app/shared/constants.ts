// SIDEBAR
export const UserSidebarElements = [
    {
        label: "Red voznje",
        route: "red-voznje"
    },
    {
        label: "Mreza linija",
        route: "mreza-linija"
    },
    {
        label: "Trenutna lokacija",
        route: "trenutna-lokacija"
    },
    {
        label: "Cenovnik",
        route: "cenovnik"
    }
];

export const AdminSidebarElements = [
    {
        label: "Uredi red voznje",
        route: "red-voznje"
    },
    {
        label: "Uredi cenovnik",
        route: "cenovnik"
    },
    {
        label: "Uredi linije",
        route: "linije"
    },
    {
        label: "Uredi stanice",
        route: "stanice"
    }
];

export const KontrolerSidebarElements = [
    {
        label: "Validacija karata",
        route: "validiraj-karte"
    },
    {
        label: "Verifikacija putnika",
        route: "verifikuj-putnike"
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
  
