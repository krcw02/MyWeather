# MyWeather – aplikacja pogodowa

## Opis projektu

MyWeather to aplikacja pogodowa napisana w Angularze. Pozwala na szybkie sprawdzenie aktualnej pogody dla wielu miast, umożliwia dodawanie i usuwanie miast z listy oraz prezentuje szczegółowe dane pogodowe pobierane z OpenWeatherMap. Dane o miastach są zapisywane w localStorage, a interfejs jest responsywny i oparty o Bootstrap 5. Projekt powstał jako realizacja zadania na zajęcia.

## Funkcjonalności

- **Wyświetlanie pogody dla wielu miast** – tabela z temperaturą, wiatrem i ikoną pogody.
- **Dodawanie miast** – modal z walidacją istnienia miasta przez API.
- **Usuwanie miast** – usuwanie z listy i localStorage.
- **Szczegóły miasta** – osobna podstrona z rozbudowanymi danymi pogodowymi.
- **Responsywny interfejs** – Bootstrap 5, obsługa desktop/mobile.
- **Trwałość danych** – lista miast zapisywana w localStorage.

## Technologie

- Angular 19
- Bootstrap 5
- OpenWeatherMap API
- localStorage (przeglądarka)

## Struktura projektu

- `src/app/cities` – główna logika, komponenty tabeli, modale, serwisy
- `src/app/cities/services` – serwisy do pobierania pogody i obsługi localStorage
- `src/app/cities/models` – modele danych
- `src/app/about` – karta z opisem działania aplikacji
- `src/app/navbar`, `src/app/navigation` – nawigacja

## Sposób działania

1. Po uruchomieniu aplikacji wyświetlana jest tabela z pogodą dla domyślnych miast.
2. Użytkownik może dodać nowe miasto – aplikacja sprawdza jego istnienie przez API.
3. Usuwanie miasta odbywa się przez kliknięcie ikony kosza.
4. Kliknięcie na miasto przenosi do szczegółów.
5. Lista miast jest zapisywana w localStorage.

## Uruchomienie

1. `npm install`
2. `ng serve`
3. Otwórz [http://localhost:4200](http://localhost:4200)


---
Autor: Kamil Krystowski, 2025
