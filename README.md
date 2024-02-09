# Kloniranje projekta i neophodne postavke

- Klonirati repozitorijum komandom https://github.com/elab-development/internet-tehnologije-projekat-serbia-travel_2020_0355.git na željenu destinaciju na vašem računaru
- Preuzeti npm sa sledećeg linka https://nodejs.org/en/download
- Pokrenuti MySQL i Apache servere (korišćenjem XAMPP-a)
- U željenom tekstualnom editoru otvoriti klonirani projekat (preporuka VSCode)

# Pokretanje Laravel API-ja

- Pozicionirati se u serbia-travel folder komandom `cd serbia-travel`
- Instalirati composer komandom `composer install`
- Kreirati .env fajl u root-u serbia-travel projekta i podesiti informacije o konekciji sa bazom: DB_PORT, DB_USERNAME, DB_PASSWORD, DB_HOST
- Kreirati šemu baze komandom `php artisan migrate`
- Popuniti bazu podacima komandom `php artisan db:seed`
- Pokrenuti aplikaciju komandom `php artisan serve`

# Pokretanje React aplikacije

- Pozicionirati se u serbia-travel-react folder komandom `cd serbia-travel-react` (Neophodno je prvo pozicionirati se u root direktorijum komandom `cd ..`)
- Komandom `npm install` ( ili `npm i`), instalirati neophodne pakete za pokretanje same aplikacije
- Pokrenuti aplikaciju komandom `npm start`

# Korišćenje aplikacije i funkcionalnosti

- Nakon pokretanja aplikacije moguće je ulogovati se kao admin ili hotel_owner. Ali takođe i registrovanje kao ulogovani korisnik.
- Neulogovani korisnik može da pregleda celu aplikaciju, ali nije moguće da zakaže sobu.
- Prikaz mape sa obeleženom lokacijom agencije i mogućnost promene tipa mape.

## Ulogovan Korisnik

- Pregled svih dostupnih hotela i soba za odabrane kriterijume (Vreme, Broj kreveta i Destinacija)
- Filtriranje po broju zvezdica
- Zakazivanje određene sobe za određeni vremenski period
- Pregled svih zakazanih soba za ulogovanog korisnika

## Vlasnik Hotela

- Pregled svih posedovanih hotela
- Promena informacija o tim hotelima
- Eksportovanje Pdf fajla koji sadrži informacije o svim zakazanim soboma u određenom hotelu

## Admin

- Funkcionalnost dodavanja novih destinacija pritiskom na dugme Add a Destination
