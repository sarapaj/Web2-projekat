import { TIP_PUTNIKA } from 'src/app/shared/enums';

export class Korisnik{
    ime: string;
    prezime: string;
    datumRodjenja: Date;
    adresa: string;
    tipPutnika: TIP_PUTNIKA;
    slika: string;
}
